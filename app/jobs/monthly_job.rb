class MonthlyJob
  include Sidekiq::Worker

  def perform
    require 'uri'
    require 'net/http'
    require 'json'
    require 'redis'
    # Define your list of place IDs and locations
    puts "sidekiq running!!!!!!!!"
    puts "monlthy job last user"
    user = User.last
    puts user.inspect
    user = User.create(email: "monthlyjob@test.com", password: "1234test", password_confirmation: "1234test")
  #   places = [
  #     'ChIJ6wjoflfGwoARIQ4pYyXJCN8',
  #     'ChIJo34riQ3GwoARLZD9o-uqI8Y',
  #     'ChIJfc-vNJTTwoARtN9DZQQNDRc',
  #     'ChIJ1e1EWx7RwoAReCY-TXXbhT4',
  #     'ChIJm2ksPQiZwoARG_JhTUiR0pI',
  #     'ChIJj3JTtm7BwoARcku_Ur8WuDE',
  #     'ChIJsT3iMBWHwoARLfqsCmNi-C0'
  #   ]
  #   http = Net::HTTP.new("maps.googleapis.com", 443)
  #   http.use_ssl = true
  #   reviews = []

  #   places.each do |place|
  #     place_id = place


  #     # Fetch place details from Google Places API
  #     encoded_place_id = URI.encode_www_form_component(place_id)
  #     url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
  #     request = Net::HTTP::Get.new(url)
  #     response = http.request(request)
  #     body = response.read_body
  #     parsed_response = JSON.parse(body)
  #     if parsed_response['status'] == 'OK'
  #       place_details = parsed_response['result']
  #       place_reviews = place_details.present? ? place_details['reviews'] || [] : []
  #       reviews.concat(place_reviews)
  #     else
  #       puts "Failed to retrieve place details for place ID: #{place_id}"
  #     end
  #   end

  #   # Filter and process the reviews as needed
  #   filtered_reviews = []
  #   reviews.each do |review|
  #     # You can apply filtering or processing logic here
  #     if review['rating'] == 5 && review['author_name'] != 'Pdub ..'
  #       filtered_reviews << review
  #     end
  #   end
  #   redis = Redis.new(url: ENV['REDIS_URL'])
  #   if redis.exists('cached_google_places_reviews')
  #     redis.del('cached_google_places_reviews')
  #   end
  #   redis.set('cached_google_places_reviews', JSON.generate(filtered_reviews))
  #   redis.expire('cached_google_places_reviews', 30.days.to_i)
  rescue StandardError => e
    puts "Error in monthly_job fetch_google_places_reviews: #{e.message}"
  end
end
