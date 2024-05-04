class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error
  
  # rails console id finder
  # require 'net/http'
  # require 'json'
  # require 'uri'

  # def fetch_place_ids(search_term, api_key)
  #   encoded_search_term = URI.encode_www_form_component(search_term)
  #   url = URI("https://maps.googleapis.com/maps/api/place/textsearch/json?query=#{encoded_search_term}&key=#{api_key}")

  #   http = Net::HTTP.new(url.host, url.port)
  #   http.use_ssl = true

  #   request = Net::HTTP::Get.new(url)
  #   response = http.request(request)
  #   body = response.read_body
  #   data = JSON.parse(body)

  #   if data['status'] == 'OK'
  #     place_ids = data['results'].map { |result| result['place_id'] }
  #     return place_ids
  #   else
  #     puts "Error: #{data['status']}"
  #     return []
  #   end
  # end

  # search_term = 'Northwest Extremity Specialists'


  # api_key = ENV['REACT_APP_GOOGLE_PLACES_API_KEY']

  # place_ids = fetch_place_ids(search_term, api_key)
  # puts "Place IDs for '#{search_term}':"
  # puts place_ids.inspect


  # other for id's company's name

  # def fetch_place_data(search_term, api_key)
  #   encoded_search_term = URI.encode_www_form_component(search_term)
  #   url = URI("https://maps.googleapis.com/maps/api/place/textsearch/json?query=#{encoded_search_term}&key=#{api_key}")
  
  #   http = Net::HTTP.new(url.host, url.port)
  #   http.use_ssl = true
  
  #   request = Net::HTTP::Get.new(url)
  #   response = http.request(request)
  #   body = response.read_body
  #   data = JSON.parse(body)
  
  #   if data['status'] == 'OK' && !data['results'].empty?
  #     result = data['results'].find { |result| result['formatted_address']&.include?('Oregon') }
  #     if result
  #       { 'name' => search_term, 'place_id' => result['place_id'], 'formatted_address' => result['formatted_address'], 'rating' => result['rating'] }
  #     else
  #       puts "No results found in Oregon for #{search_term}"
  #       nil
  #     end
  #   else
  #     puts "Error: #{data['status']}"
  #     nil
  #   end
  # end
  
  # companies = [
  #   { name: 'Creekside Physical Therapy' }
  # ]
  
  # api_key = ENV['REACT_APP_GOOGLE_PLACES_API_KEY']
  # place_data = []
  
  # companies.each do |company|
  #   place_data << fetch_place_data(company[:name], api_key)
  # end
  
  # place_data.compact.each do |data|
  #   puts "Company: #{data['name']}"
  #   puts "Place ID: #{data['place_id']}"
  #   puts "Address: #{data['formatted_address']}"
  #   puts "Rating: #{data['rating']}"
  #   puts
  # end
  
 
  def index
    puts "Rendering index action..."
    render json: "Default Company " * 1000
  end

  def pull_google_places_cache
    log_daily_visits
    # puts "Fetching CSRF token..."
    csrf_token = form_authenticity_token
    # puts "CSRF token fetched: #{csrf_token}"
    # puts "Fetching cached Google Places reviews..."
    
    # Parse the reviews string into an array of hashes
    reviews_json = GooglePlacesCached.cached_google_places_reviews
    reviews = JSON.parse(reviews_json)
    
    # puts "Cached Google Places reviews fetched"
    if reviews.blank?
      # puts "No reviews found, sending alert email..."
      OfficeMailer.alert_no_reviews_email.deliver_later
    else
      reviews.each do |review|
        # puts "Name: #{review['author_name']}"
        # puts "Rating: #{review['rating']}"
        # puts "Text: #{review['text']}"
        # puts "-------------------------"
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

class GooglePlacesCached
  require 'redis'
  require 'json'
  require 'uri'
  require 'net/http'
  
  def self.remove_user_by_name(users, name)
    users.reject! { |user| user['user'] && user['user']['name'] == name }
  end

  def self.cached_google_places_reviews
    # puts "Initializing Redis connection..."
    redis = Redis.new(url: ENV['REDIS_URL'])
    # puts "Redis connection established"

    # puts "Fetching cached data..."
    cached_data = redis.get('cached_google_places_reviews')
    reviews = JSON.parse(cached_data) if cached_data

    if cached_data.present?
      # puts "Cached data found. Parsing..."
      # Parse the JSON data into an array of hashes
      users = JSON.parse(cached_data)

      # puts "Removing user with name 'Pdub ..'"
      # Call the class method to remove the user with name "Pdub .."
      remove_user_by_name(users, 'Pdub ..')
      filtered_reviews = users.select { |review| review['rating'] == 5 }

      # Convert the updated data back to a JSON string
      updated_reviews = JSON.generate(filtered_reviews)
      return updated_reviews
    end

    # puts "No cached data found."
    # puts "Fetching place IDs..."
    place_ids = ["ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJf07ARPkJlVQRJCA-9wte444", "ChIJSRSts-CglVQRfXCyBEPzHNg", "ChIJwYKIh1MJlVQRIXzFZskUtFY", "ChIJ_TJXrMl3lVQRl1nLczjqvcc", "ChIJIZy0a0N1lVQRChk-thmw9UQ", "ChIJG0RqfGJzlVQR-lIHvq9lq3M", "ChIJvWKjfLwPlVQRq0OjxUpuQDs", "ChIJKd5scTVtlVQRniUVJVvA8o0", "ChIJ_2wPhoOflVQRtfSw-4BiUwc", "ChIJs-vDeEZBlVQR9ssRDsT6Ds4", "ChIJhbrgCv5rlVQRpzA6YfChxx4", "ChIJ66ucReMMlVQRPG1PJKZeebY", "ChIJ99Ey1j2hlVQRVTo0viIRIoA", "ChIJDYTghvFulVQRA21iSpDiBxA", "ChIJ4UF7HIxzlVQRUle-xIsEK18"]
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    reviews = []
    place_ids.each do |place_id|
      puts "Fetching Google Places! Details for place ID: #{place_id}"
      encoded_place_id = URI.encode_www_form_component(place_id)
      url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      body = response.read_body
      parsed_response = JSON.parse(body)

      if parsed_response['status'] == 'OK'
        # puts "Place details retrieved successfully"
        place_details = parsed_response['result']
        place_reviews = place_details.present? ? place_details['reviews'] || [] : []
        reviews.concat(place_reviews)
      else
        puts "Failed to retrieve place details for place ID: #{place_id}"
      end
    end

    # puts "Setting cached Google Places reviews..."
    redis.set("cached_google_places_reviews", JSON.generate(reviews))
    redis.expire("cached_google_places_reviews", 30.days.to_i)
    cached_reviews = redis.get("cached_google_places_reviews")
    reviews = JSON.parse(cached_reviews) if cached_reviews

    if cached_reviews.present?
      # puts "Cached reviews found. Parsing..."
      # Parse the JSON data into an array of hashes
      users = JSON.parse(cached_reviews)

      # puts "Removing user with name 'Pdub ..'"
      # Call the class method to remove the user with name "Pdub .."
      remove_user_by_name(users, 'Pdub ..')

      # Convert the updated data back to a JSON string
      updated_reviews = JSON.generate(users)
      return updated_reviews
    end

    puts "No cached reviews found."
    return { reviews: "No cached reviews" }
  end

end