class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error

  def index
    puts "Rendering index action..."
    render json: "Default Company " * 1000
  end

  def pull_google_places_cache
    puts "Initiating Google Places cache retrieval..."
    log_daily_visits
    csrf_token = form_authenticity_token
    puts "CSRF token fetched: #{csrf_token}"

    reviews_json = GooglePlacesCached.cached_google_places_reviews
    reviews = JSON.parse(reviews_json) rescue []

    if reviews.blank?
      puts "No reviews found, alerting via email..."
      OfficeMailer.alert_no_reviews_email.deliver_later
    else
      reviews.each do |review|
        puts "Review by #{review['author_name']} with rating #{review['rating']}"
      end
    end

    render json: { reviews: reviews, csrf_token: csrf_token }
  end
  
  private

  def log_daily_visits
    today = Date.today
    visits_key = "daily_visits_#{today}"
    redis = Redis.new(url: ENV['REDIS_URL'])
    current_visits = redis.incr(visits_key)
    puts "Daily visits count for #{today}: #{current_visits}"
  end

  def handle_unexpected_error(error)
    OfficeMailer.error_email("Unexpected Error", error.message).deliver_later
    render json: { error: "An unexpected error occurred: #{error.message}" }, status: :internal_server_error
  end

  def handle_json_parsing_error(error)
    error_message = "Failed to parse JSON: #{error.message}"
    OfficeMailer.error_email("JSON Parsing Error", error_message).deliver_later
    render json: { error: error_message }, status: :unprocessable_entity
  end
end


class GooglePlacesCached
  require 'redis'
  require 'json'
  require 'uri'
  require 'net/http'

  def self.remove_user_by_name(users, name)
    users.reject! { |user| user['user'] && user['user']['name'] == name }
  end

  def self.cached_google_places_reviews
    redis = Redis.new(url: ENV['REDIS_URL'])
    cached_data = redis.get('cached_google_places_reviews')
    
    if cached_data.present?
      puts "Parsing cached Google Places reviews..."
      users = JSON.parse(cached_data)
      remove_user_by_name(users, 'Pdub ..')
      users = users.select { |review| review['rating'] == 5 }
      
      updated_reviews = JSON.generate(users)
      return updated_reviews
    else
      puts "No cached data found, retrieving new data..."
      fetch_and_cache_google_places(redis)
    end
  end

  private

  def self.fetch_and_cache_google_places(redis)
    place_ids = ["ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJf07ARPkJlVQRJCA-9wte444", "ChIJSRSts-CglVQRfXCyBEPzHNg", "ChIJwYKIh1MJlVQRIXzFZskUtFY", "ChIJ_TJXrMl3lVQRl1nLczjqvcc", "ChIJIZy0a0N1lVQRChk-thmw9UQ", "ChIJG0RqfGJzlVQR-lIHvq9lq3M", "ChIJvWKjfLwPlVQRq0OjxUpuQDs", "ChIJKd5scTVtlVQRniUVJVvA8o0", "ChIJ_2wPhoOflVQRtfSw-4BiUwc", "ChIJs-vDeEZBlVQR9ssRDsT6Ds4", "ChIJhbrgCv5rlVQRpzA6YfChxx4", "ChIJ66ucReMMlVQRPG1PJKZeebY", "ChIJ99Ey1j2hlVQRVTo0viIRIoA", "ChIJDYTghvFulVQRA21iSpDiBxA", "ChIJ4UF7HIxzlVQRUle-xIsEK18"]
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    reviews = []

    place_ids.each do |place_id|
      puts "Fetching details for place ID: #{place_id}"
      url = build_place_details_url(place_id)
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      body = response.read_body
      parsed_response = JSON.parse(body)

      if parsed_response['status'] == 'OK'
        reviews.concat(parsed_response['result']['reviews'] || [])
      else
        puts "Failed to retrieve details for place ID: #{place_id}"
      end
    end

    cache_reviews(redis, reviews)
  end

  def self.build_place_details_url(place_id)
    encoded_place_id = URI.encode_www_form_component(place_id)
    URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
  end

  def self.cache_reviews(redis, reviews)
    puts "Caching Google Places reviews..."
    redis.set("cached_google_places_reviews", JSON.generate(reviews))
    redis.expire("cached_google_places_reviews", 30.days.to_i)
    puts "Reviews cached successfully."
  end
end
