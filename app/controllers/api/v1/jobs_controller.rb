class JobsController < ApplicationController
  require 'net/http'
  require 'json'

  # Method to fetch place IDs using a search term and API key
  def fetch_place_ids(search_term, api_key)
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    url = URI("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=#{search_term}&inputtype=textquery&fields=place_id&key=#{api_key}")
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    data = JSON.parse(response.body)

    if data['status'] == 'OK'
      candidates = data['candidates'] || []
      place_ids = candidates.map { |c| c['place_id'] }
      return place_ids
    else
      Rails.logger.error("Error fetching place IDs for search term #{search_term}: #{data['status']}")
      return []
    end
  end

  # Method to fetch reviews for a specific place ID
  def fetch_place_reviews(place_id, api_key)
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&fields=reviews&key=#{api_key}")
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    data = JSON.parse(response.body)

    if data['status'] == 'OK'
      reviews = data['result']['reviews'] || []
      five_star_reviews = reviews.select { |review| review['rating'] == 5 }
      return five_star_reviews
    else
      Rails.logger.error("Error fetching reviews for Place ID #{place_id}: #{data['status']}")
      return []
    end
  end

  # Method to display reviews for a list of place IDs
  def display_reviews_for_place_ids(place_ids, api_key)
    place_ids.each do |place_id|
      reviews = fetch_place_reviews(place_id, api_key)
      puts "Reviews for Place ID #{place_id}:"
      puts "--------------------------------------"

      reviews.each_with_index do |review, index|
        puts "Review ##{index + 1}:"
        puts "Author: #{review['author_name']}"
        puts "Rating: #{review['rating']}"
        puts "Time: #{Time.at(review['time'])}"
        puts "Review Text: #{review['text']}"
        puts "--------------------------------------"
      end
    end
  end

  # Method to display reviews for Creekside Physical Therapy and Northwest Extremity Specialists
  def get_reviews
    place_ids_set_1 = ["ChIJT8nUWmzlBIgRnZluSKvaU7o", "ChIJy6GIldiP4okR-sQZEghTDSg", "ChIJt1CU6gxK0IkR4wEmOq3hYr4", 
                       "ChIJK3II3q_utYkR4B1voXTzigI", "ChIJPYnEYuIZxokROs5cvHzUe_A", "ChIJG5iRHpBhOIgRpqxsWqCW45o", 
                       "ChIJwS4aJMNCZIgRCnJm1UIi1DM", "ChIJK7-aC0Mg9ocRFQNYRxTTq9g", "ChIJUf1pNYumBIgRvqA-5r5JhWY", 
                       "ChIJkfcs-vB7ZIgRPIXGzSE94sQ", "ChIJQ9SZk5oM3okRZhhzh4KmqV0", "ChIJf6kf46N1F4gRCtuy1-sFiFE", 
                       "ChIJVTlYQ-BlI4gRMV2h89pFfkQ", "ChIJKTOyIqC6ZIgRm_6vgwqt1C0", "ChIJGZ25WBunFIgRm6ZubZRqd-A", 
                       "ChIJd6eSQJOZ9YgRdhGy82PWczE", "ChIJYxOlnZFhOIgRczEcMz8HIvw", "ChIJRwQnvhGFSk0RIN3V7ZxohCU", 
                       "ChIJZdP8j6G6ZIgRS0MV7drU2IE", "ChIJZdP8j6G6ZIgRLowFu2-Fdco"]

    place_ids_set_2 = ["ChIJf07ARPkJlVQRJCA-9wte444", "ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJSRSts-CglVQRfXCyBEPzHNg", 
                       "ChIJ_TJXrMl3lVQRl1nLczjqvcc", "ChIJ66ucReMMlVQRPG1PJKZeebY", "ChIJIZy0a0N1lVQRChk-thmw9UQ", 
                       "ChIJwYKIh1MJlVQRIXzFZskUtFY", "ChIJG0RqfGJzlVQR-lIHvq9lq3M", "ChIJvWKjfLwPlVQRq0OjxUpuQDs", 
                       "ChIJs-vDeEZBlVQR9ssRDsT6Ds4", "ChIJKd5scTVtlVQRniUVJVvA8o0", "ChIJ4UF7HIxzlVQRUle-xIsEK18", 
                       "ChIJhbrgCv5rlVQRpzA6YfChxx4", "ChIJDYTghvFulVQRA21iSpDiBxA", "ChIJ_2wPhoOflVQRtfSw-4BiUwc", 
                       "ChIJ99Ey1j2hlVQRVTo0viIRIoA"]

    api_key = ENV['REACT_APP_GOOGLE_PLACES_API_KEY']

    puts "Displaying reviews for Creekside Physical Therapy:"
    display_reviews_for_place_ids(place_ids_set_1, api_key)

    puts "Displaying reviews for Northwest Extremity Specialists:"
    display_reviews_for_place_ids(place_ids_set_2, api_key)
  end
end
