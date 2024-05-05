require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.
  config.middleware.insert_before ActionDispatch::Static, Rack::Deflater

  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both threaded web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.serve_static_assets = true
  config.assets.digest = true
  config.action_controller.perform_caching = true
  # Ensures that a master key has been made available in either ENV["RAILS_MASTER_KEY"]
  # or in config/master.key. This key is used to decrypt credentials (and other encrypted files).
  # config.require_master_key = true

  # Disable serving static files from the `/public` folder by default since
  # Apache or NGINX already handles this.
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?
  config.public_file_server.headers = {
    'Cache-Control' => 'public, max-age=31536000'
  }
  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  config.asset_host = "http://defaultcompany.com"
  config.assets.compile = false

  # Specifies the header that your server uses for sending files.
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for Apache
  # config.action_dispatch.x_sendfile_header = "X-Accel-Redirect" # for NGINX
  config.active_storage.service = :local

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = true

  # Include generic and useful information about system operation, but avoid logging too much
  # information to avoid inadvertent exposure of personally identifiable information (PII).
  config.log_level = :info

  # Prepend all log lines with the following tags.
  config.log_tags = [ :request_id ]

  # Use a different cache store in production.
  config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'], expires_in: 30.days }
  config.active_job.queue_adapter = :sidekiq

  Sidekiq.configure_server do |config|
    config.redis = { url: ENV['REDIS_URL'] }
  end
# ["ChIJT8nUWmzlBIgRnZluSKvaU7o", "ChIJy6GIldiP4okR-sQZEghTDSg", "ChIJt1CU6gxK0IkR4wEmOq3hYr4", "ChIJK3II3q_utYkR4B1voXTzigI", "ChIJPYnEYuIZxokROs5cvHzUe_A", "ChIJG5iRHpBhOIgRpqxsWqCW45o", "ChIJwS4aJMNCZIgRCnJm1UIi1DM", "ChIJK7-aC0Mg9ocRFQNYRxTTq9g", "ChIJUf1pNYumBIgRvqA-5r5JhWY", "ChIJkfcs-vB7ZIgRPIXGzSE94sQ", "ChIJQ9SZk5oM3okRZhhzh4KmqV0", "ChIJf6kf46N1F4gRCtuy1-sFiFE", "ChIJVTlYQ-BlI4gRMV2h89pFfkQ", "ChIJKTOyIqC6ZIgRm_6vgwqt1C0", "ChIJGZ25WBunFIgRm6ZubZRqd-A", "ChIJd6eSQJOZ9YgRdhGy82PWczE", "ChIJYxOlnZFhOIgRczEcMz8HIvw", "ChIJRwQnvhGFSk0RIN3V7ZxohCU", "ChIJZdP8j6G6ZIgRS0MV7drU2IE", "ChIJZdP8j6G6ZIgRLowFu2-Fdco"]
# ["ChIJf07ARPkJlVQRJCA-9wte444", "ChIJi3RsjPEMlVQRt1cOeU3_g48", "ChIJSRSts-CglVQRfXCyBEPzHNg", "ChIJ_TJXrMl3lVQRl1nLczjqvcc", "ChIJ66ucReMMlVQRPG1PJKZeebY", "ChIJIZy0a0N1lVQRChk-thmw9UQ", "ChIJwYKIh1MJlVQRIXzFZskUtFY", "ChIJG0RqfGJzlVQR-lIHvq9lq3M", "ChIJvWKjfLwPlVQRq0OjxUpuQDs", "ChIJs-vDeEZBlVQR9ssRDsT6Ds4", "ChIJKd5scTVtlVQRniUVJVvA8o0", "ChIJ4UF7HIxzlVQRUle-xIsEK18", "ChIJhbrgCv5rlVQRpzA6YfChxx4", "ChIJDYTghvFulVQRA21iSpDiBxA", "ChIJ_2wPhoOflVQRtfSw-4BiUwc", "ChIJ99Ey1j2hlVQRVTo0viIRIoA"]
Sidekiq.configure_client do |config|
    config.redis = { url: ENV['REDIS_URL'] }
  end

  # config.cache_store = :mem_cache_store

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation cannot be found).
  config.i18n.fallbacks = true

  # Don't log any deprecations.
  config.active_support.report_deprecations = false

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Use a different logger for distributed setups.
  # require "syslog/logger"
  # config.logger = ActiveSupport::TaggedLogging.new(Syslog::Logger.new "app-name")
  config.action_mailer.asset_host = "localhost:3001"

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: 'gmail.com',
    user_name: 'unitymskwebsites@gmail.com',
    password: ENV["REACT_APP_GMAIL_PASSWORD"],
    authentication: 'plain',
    enable_starttls_auto: true
  }
  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false
end
