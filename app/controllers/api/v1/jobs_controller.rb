class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error

  def index
    # puts "Rendering index action..."
    render json: "Northwest Extremity Specialists " * 1000
  end

  def pull_google_places_cache
    # puts "Entering pull_google_places_cache method..."
    redis_url = ENV['REDIS_URL']
    # puts "Redis URL: #{redis_url}"

    begin
      redis = Redis.new(url: ENV['REDIS_URL'])

      cache_key = "google_places_reviews"
      
      # puts "Attempting to get cached reviews from Redis"
      cached_reviews = redis.get(cache_key)
      # puts "Cached reviews: #{cached_reviews.nil? ? 'none' : 'found'}"
    rescue Redis::CannotConnectError => e
      # puts "Cannot connect to Redis: #{e.message}"
      raise
    rescue Redis::TimeoutError => e
      # puts "Redis connection timed out: #{e.message}"
      raise
    rescue Redis::ConnectionError => e
      # puts "Redis connection error: #{e.message}"
      raise
    rescue => e
      # puts "General error fetching from Redis: #{e.message}"
      raise
    end

    if cached_reviews
      # puts "Using cached reviews"
      reviews = JSON.parse(cached_reviews)
    else
      # puts "Fetching fresh reviews from Google Places API"
      reviews = GooglePlacesCached.fetch_five_star_reviews_for_companies
      # puts "Storing fetched reviews in Redis for 30 days"
      redis.setex(cache_key, 30.days.to_i, reviews.to_json)
    end

    creekside_reviews = reviews["Creekside Physical Therapy"] || []
    northwest_reviews = reviews["Northwest Extremity Specialists"] || []

    # puts "Successfully fetched reviews for Creekside and Northwest"
    csrf_token = form_authenticity_token
    puts "csrf_token"
    puts csrf_token.inspect
    render json: { creekside_reviews: creekside_reviews, northwest_reviews: northwest_reviews, csrf_token: csrf_token }
  end

  

  private

  def handle_unexpected_error(error)
    # puts "Handling unexpected error: #{error.message}"
    OfficeMailer.error_email("Unexpected Error", error.message).deliver_later
    render json: { error: "An unexpected error occurred: #{error.message}" }, status: :internal_server_error
  end

  def handle_json_parsing_error(error)
    # puts "Handling JSON parsing error: #{error.message}"
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
  require 'openssl'

  def self.fetch_five_star_reviews_for_companies
    # puts "Entering fetch_five_star_reviews_for_companies method..."
    companies = {
      "Creekside Physical Therapy" => ["ChIJT8nUWmzlBIgRnZluSKvaU7o", "ChIJy6GIldiP4okR-sQZEghTDSg", "ChIJt1CU6gxK0IkR4wEmOq3hYr4"],
      "Northwest Extremity Specialists" => ["ChIJf07ARPkJlVQRJCA-9wte444", "ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJSRSts-CglVQRfXCyBEPzHNg"]
    }

    api_key = ENV['REACT_APP_GOOGLE_PLACES_API_KEY']
    # puts "Google Places API Key: #{api_key}"

    reviews = {}

    redis = Redis.new(url: ENV['REDIS_URL'])

    cache_key = "google_places_reviews"

    begin
      # puts "Attempting to get cached reviews from Redis"
      cached_reviews = redis.get(cache_key)
      # puts "Cached reviews: #{cached_reviews.nil? ? 'none' : 'found'}"
    rescue => e
      # puts "Error fetching from Redis: #{e.message}"
      raise
    end

    if cached_reviews
      # puts "Using cached reviews in fetch_five_star_reviews_for_companies"
      reviews = JSON.parse(cached_reviews)
    else
      # puts "Fetching fresh reviews from Google Places API in fetch_five_star_reviews_for_companies"
      reviews = fetch_reviews_from_google(companies, api_key)
      # puts "Storing fetched reviews in Redis"
      redis.setex(cache_key, 30.days.to_i, reviews.to_json)
    end

    reviews
  end

  def self.fetch_reviews_from_google(companies, api_key)
    # puts "Entering fetch_reviews_from_google method..."
    reviews = {}

    companies.each do |company, place_ids|
      # puts "Fetching reviews for company: #{company}"
      reviews[company] = place_ids.flat_map do |place_id|
        # puts "Fetching reviews for place ID: #{place_id}"
        fetch_five_star_reviews_for_place_id(place_id, api_key)
      end
      # puts "Successfully fetched reviews for company: #{company}"
    end

    # puts "Finished fetching reviews for all companies"
    reviews
  end

  private

  def self.fetch_five_star_reviews_for_place_id(place_id, api_key)
    # puts "Fetching five-star reviews for place ID: #{place_id}"
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&fields=reviews&key=#{api_key}")
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    data = JSON.parse(response.body)

    if data['status'] == 'OK'
      # puts "Successfully fetched reviews for place ID: #{place_id}"
      reviews = data['result']['reviews'] || []
      reviews.select { |review| review['rating'] == 5 }.each do |review|
        # puts " - #{review['author_name']}: #{review['text']}"
      end
      reviews.select { |review| review['rating'] == 5 }
    else
      # puts "Error fetching reviews for Place ID #{place_id}: #{data['status']}"
      Rails.logger.error("Error fetching reviews for Place ID #{place_id}: #{data['status']}")
      []
    end
  end
end
