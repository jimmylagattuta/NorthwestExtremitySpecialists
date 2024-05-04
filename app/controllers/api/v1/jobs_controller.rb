class Api::V1::JobsController < ApplicationController
  rescue_from StandardError, with: :handle_unexpected_error
  rescue_from JSON::ParserError, with: :handle_json_parsing_error

  physicians = [
    "Dr. Ron Bowman",
    "Dr. Alex Friedman",
    "Dr. Clifford D. Mah",
    "Dr. Denny Le",
    "Dr. Jason Surratt",
    "Dr. Manny Moy",
    "Dr. Mia Horvath",
    "Dr. Peter Pham",
    "Dr. Thomas Melillo",
    "Dr. Todd Galle",
    "Dr. Yama Dehqanzada",
    "Dr. Cara Beach",
    "Dr. Lacey Beth Lockhart",
    "Dr. Melinda Nicholes",
    "Dr. Taylor Bunka"
  ]

  def index
    puts "Rendering index action..."
    render json: "Northwest Extremity Specialists " * 1000
  end

  def pull_google_places_cache
    log_daily_visits
    csrf_token = form_authenticity_token

    reviews_json = GooglePlacesCached.cached_google_places_reviews
    reviews = JSON.parse(reviews_json)

    if reviews.blank?
      OfficeMailer.alert_no_reviews_email.deliver_later
    else
      reviews.each do |review|
        # Check if the review is from one of the specified physicians
        next unless physicians.include?(review['author_name'])
        
        # You can access filtered reviews here
        puts "Name: #{review['author_name']}"
        puts "Rating: #{review['rating']}"
        puts "Text: #{review['text']}"
        puts "-------------------------"
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
