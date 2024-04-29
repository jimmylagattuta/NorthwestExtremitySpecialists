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
      puts "Business ID: #{business_id}" # Logging the business ID

      # Make a request to the Yelp API to get reviews for the business
      reviews_url = "https://api.yelp.com/v3/businesses/#{business_id}/reviews"
      puts "Reviews URL: #{reviews_url}" # Logging the reviews URL

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
        puts "Response Body: #{res_reviews.body}" if res_reviews.body.present?
        render json: { error: "Failed to retrieve reviews. HTTP Status: #{res_reviews.code}" }, status: :unprocessable_entity
      end
    else
      puts "Business not found"
      render json: { error: "Business not found in Yelp search results" }, status: :not_found
    end
  else
    puts "Failed to retrieve business: #{res.code}"
    puts "Response Body: #{res.body}" if res.body.present?
    render json: { error: "Failed to retrieve business. HTTP Status: #{res.code}" }, status: :unprocessable_entity
  end
end
