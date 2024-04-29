require 'net/http'
require 'json'

class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error

  def index
    puts "Rendering index action..."
    render json: "Default Company " * 1000
  end

  def pull_yelp_reviews
    log_daily_visits
    csrf_token = form_authenticity_token

    # Make a request to the Yelp API to search for the business
    business_search_url = "https://api.yelp.com/v3/businesses/search"
    term = "Creekside Physical Therapy"
    location = "Portland, Oregon" # or any other location
    limit = 10

    uri = URI(business_search_url)
    params = {
      term: term,
      location: location,
      limit: limit
    }
    uri.query = URI.encode_www_form(params)

    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{ENV['REACT_APP_YELP_API_KEY']}"

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(req)
    end

    if res.is_a?(Net::HTTPSuccess)
      data = JSON.parse(res.body)
      if data["businesses"]
        business_id = data["businesses"][0]["id"]

        # Make a request to the Yelp API to get reviews for the business
        reviews_url = "https://api.yelp.com/v3/businesses/#{business_id}/reviews"

        req_reviews = Net::HTTP::Get.new(reviews_url)
        req_reviews['Authorization'] = "Bearer #{ENV['REACT_APP_YELP_API_KEY']}"

        res_reviews = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(req_reviews)
        end

        if res_reviews.is_a?(Net::HTTPSuccess)
          reviews_data = JSON.parse(res_reviews.body)
          reviews = reviews_data["reviews"]

          # Process and display the reviews
          reviews.each do |review|
            puts "Review ID: #{review['id']}"
            puts "Text: #{review['text']}"
            puts "Rating: #{review['rating']}"
            puts "Time Created: #{review['time_created']}"
            puts "User ID: #{review['user']['id']}"
            puts "User Profile URL: #{review['user']['profile_url']}"
            puts "User Image URL: #{review['user']['image_url']}"
            puts "User Name: #{review['user']['name']}"
            puts "-------------------------"
          end

          render json: { reviews: reviews, csrf_token: csrf_token }
        else
          puts "Failed to retrieve reviews: #{res_reviews.code}"
          render json: { error: "Failed to retrieve reviews" }, status: :unprocessable_entity
        end
      else
        puts "Business not found"
        render json: { error: "Business not found" }, status: :not_found
      end
    else
      puts "Failed to retrieve business: #{res.code}"
      render json: { error: "Failed to retrieve business" }, status: :unprocessable_entity
    end
  end
  
  private

  def log_daily_visits
    today = Date.today
    visits_key = "daily_visits_#{today}"
    redis = Redis.new(url: ENV['REDIS_URL'])
    current_visits = redis.incr(visits_key)
    puts "*" * 100
    puts "Daily visits on #{today}: #{current_visits}"
    puts "*" * 100
  end

  def handle_unexpected_error(error)
    OfficeMailer.error_email("Unexpected Error", error.message).deliver_later
    render json: { error: "An unexpected error occurred." }, status: :internal_server_error
  end

  def handle_json_parsing_error(error)
    error_message = "Failed to parse JSON data: #{error.message}"
    OfficeMailer.error_email("JSON Parsing Error", error_message).deliver_later
    render json: { error: error_message }, status: :unprocessable_entity
  end
end
