class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error

  PHYSICIANS = [
    "Bowman",
    "Friedman",
    "Mah",
    "Le",
    "Surratt",
    "Moy",
    "Horvath",
    "Pham",
    "Melillo",
    "Galle",
    "Dehqanzada",
    "Beach",
    "Lockhart",
    "Nicholes",
    "Bunka"
  ]

  def index
    puts "Rendering index action..."
    render json: "Northwest Extremity Specialists " * 1000
  end

  def pull_google_places_cache
    puts "Pulling and filtering Google Places cache..."
    log_daily_visits
    csrf_token = form_authenticity_token
    reviews_json = GooglePlacesCached.cached_google_places_reviews
    reviews = JSON.parse(reviews_json)

    if reviews.blank?
      OfficeMailer.alert_no_reviews_email.deliver_later
    else
      formatted_reviews = format_reviews(reviews)
      puts formatted_reviews.join("\n-------------------------\n")
    end

    render json: { reviews: reviews, csrf_token: csrf_token }
  end

  private

  def format_reviews(reviews)
    reviews.filter_map do |review|
      author_last_name = review['author_name'].gsub(/Dr\.?\s*/, '').split.last # Remove "Dr." and "Dr" prefixes and get the last name
      next unless PHYSICIANS.include?(author_last_name)

      "Name: #{review['author_name']}\nRating: #{review['rating']}\nText: #{review['text']}"
    end
  end

  def log_daily_visits
    today = Date.today
    visits_key = "daily_visits_#{today}"
    redis = Redis.new(url: ENV['REDIS_URL'], ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_PEER })
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
