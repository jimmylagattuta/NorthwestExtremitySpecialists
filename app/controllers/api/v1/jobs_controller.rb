require 'uri'
require 'net/http'
require 'json'
require 'redis'

class MonthlyJob
  include Sidekiq::Worker

  def perform
    places = ["ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJf07ARPkJlVQRJCA-9wte444", "ChIJSRSts-CglVQRfXCyBEPzHNg", "ChIJwYKIh1MJlVQRIXzFZskUtFY", "ChIJ_TJXrMl3lVQRl1nLczjqvcc", "ChIJIZy0a0N1lVQRChk-thmw9UQ", "ChIJG0RqfGJzlVQR-lIHvq9lq3M", "ChIJvWKjfLwPlVQRq0OjxUpuQDs", "ChIJKd5scTVtlVQRniUVJVvA8o0", "ChIJ_2wPhoOflVQRtfSw-4BiUwc", "ChIJs-vDeEZBlVQR9ssRDsT6Ds4", "ChIJhbrgCv5rlVQRpzA6YfChxx4", "ChIJ66ucReMMlVQRPG1PJKZeebY", "ChIJ99Ey1j2hlVQRVTo0viIRIoA", "ChIJDYTghvFulVQRA21iSpDiBxA", "ChIJ4UF7HIxzlVQRUle-xIsEK18"]
    reviews = []

    places.each do |place_id|
      # Make a request to the Yelp API to get reviews for the business
      reviews_url = "https://api.yelp.com/v3/businesses/#{place_id}/reviews"

      uri = URI(reviews_url)
      req = Net::HTTP::Get.new(uri)
      req['Authorization'] = "Bearer #{ENV['REACT_APP_YELP_API_KEY']}"

      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
        http.request(req)
      end

      if res.is_a?(Net::HTTPSuccess)
        reviews_data = JSON.parse(res.body)
        reviews.concat(reviews_data["reviews"])
      else
        puts "Failed to retrieve reviews for place ID: #{place_id}"
      end
    end

    # Filter and process the reviews as needed
    filtered_reviews = []
    reviews.each do |review|
      # Apply any filtering or processing logic here
      if review['rating'] == 5 && review['user'] && review['user']['name'] != 'Pdub ..'
        filtered_reviews << review
      end
    end

    # Cache the filtered reviews
    redis = Redis.new(url: ENV['REDIS_URL'])

    if redis.exists('cached_yelp_reviews')
      redis.del('cached_yelp_reviews')
    end

    redis.set('cached_yelp_reviews', JSON.generate(filtered_reviews))
    redis.expire('cached_yelp_reviews', 30.days.to_i)
  rescue StandardError => e
    puts "Error in MonthlyJob: #{e.message}"
  end
end
