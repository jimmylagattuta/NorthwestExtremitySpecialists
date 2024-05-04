class MonthlyJob
  include Sidekiq::Worker

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

  def perform
    require 'uri'
    require 'net/http'
    require 'json'
    require 'redis'

    places = ["ChIJT8nUWmzlBIgRnZluSKvaU7o", "ChIJy6GIldiP4okR-sQZEghTDSg", "ChIJt1CU6gxK0IkR4wEmOq3hYr4", "ChIJG5iRHpBhOIgRpqxsWqCW45o", "ChIJG4IRFhlSa4gRVOkjjz85dqE", "ChIJwS4aJMNCZIgRCnJm1UIi1DM", "ChIJf6kf46N1F4gRCtuy1-sFiFE", "ChIJPYnEYuIZxokROs5cvHzUe_A", "ChIJK3II3q_utYkR4B1voXTzigI", "ChIJkfcs-vB7ZIgRPIXGzSE94sQ", "ChIJKTOyIqC6ZIgRm_6vgwqt1C0", "ChIJUf1pNYumBIgRvqA-5r5JhWY", "ChIJ6UrV6tWpQYgRkhDQkPSseF4", "ChIJQ9SZk5oM3okRZhhzh4KmqV0", "ChIJccwssNidF4gRYkrpX72fqTA", "ChIJd6eSQJOZ9YgRdhGy82PWczE", "ChIJRwQnvhGFSk0RIN3V7ZxohCU", "ChIJZdP8j6G6ZIgRLowFu2-Fdco", "ChIJTfWBLxLSFogRjG83U7kxIpE", "ChIJZdP8j6G6ZIgRS0MV7drU2IE"]
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    reviews = []

    puts "Fetching and filtering reviews..."

    places.each do |place|
      place_id = place

      encoded_place_id = URI.encode_www_form_component(place_id)
      url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      body = response.read_body
      parsed_response = JSON.parse(body)

      if parsed_response['status'] == 'OK'
        place_details = parsed_response['result']
        address = place_details['formatted_address']

        if address.include?('Oregon')
          place_reviews = place_details.present? ? place_details['reviews'] || [] : []
          reviews.concat(place_reviews)
        else
          puts "Skipping place #{place_id} as it is not in Oregon."
        end
      else
        puts "Failed to fetch details for place #{place_id}: #{parsed_response['status']}"
      end
    end

    puts "Finished fetching and filtering reviews."
  end
end
