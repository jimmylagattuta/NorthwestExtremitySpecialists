class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error

  def index
    puts "Rendering index action..."
    render json: "Default Company " * 1000
  end

  def fetch_five_star_reviews
    puts "Fetching five-star reviews..."
    reviews = GooglePlacesCached.fetch_five_star_reviews_for_companies
    csrf_token = form_authenticity_token
    render json: { reviews: reviews, csrf_token: csrf_token }
  end
  
  private

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

  def self.fetch_five_star_reviews_for_companies
    companies = {
      "Creekside Physical Therapy" => ["ChIJT8nUWmzlBIgRnZluSKvaU7o", "ChIJy6GIldiP4okR-sQZEghTDSg", "ChIJt1CU6gxK0IkR4wEmOq3hYr4"],
      "Northwest Extremity Specialists" => ["ChIJf07ARPkJlVQRJCA-9wte444", "ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJSRSts-CglVQRfXCyBEPzHNg"]
    }
    api_key = ENV['REACT_APP_GOOGLE_PLACES_API_KEY']
    reviews = {}

    companies.each do |company, place_ids|
      reviews[company] = place_ids.flat_map do |place_id|
        fetch_five_star_reviews_for_place_id(place_id, api_key)
      end
    end

    reviews
  end

  private

  def self.fetch_five_star_reviews_for_place_id(place_id, api_key)
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&fields=reviews&key=#{api_key}")
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    data = JSON.parse(response.body)

    if data['status'] == 'OK'
      reviews = data['result']['reviews'] || []
      reviews.select { |review| review['rating'] == 5 }
    else
      Rails.logger.error("Error fetching reviews for Place ID #{place_id}: #{data['status']}")
      []
    end
  end
end
