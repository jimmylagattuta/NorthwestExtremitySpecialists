class MonthlyJob
  include Sidekiq::Worker

  def perform
    clear_and_refresh_reviews_cache
  end

  private

  def clear_and_refresh_reviews_cache
    redis = Redis.new(url: ENV['REDIS_URL'], ssl: true, ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE })
    cache_key = "google_places_reviews"
    
    redis.del(cache_key) # Clear the cache

    reviews = GooglePlacesCached.fetch_five_star_reviews_for_companies

    redis.setex(cache_key, 7.days.to_i, reviews.to_json) # Refresh the cache
    puts "Successfully refreshed reviews cache"
  end
end
