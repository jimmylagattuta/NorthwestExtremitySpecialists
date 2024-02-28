# az webapp log tail --name NorthwestExtremitySpecialsts --resource-group Northwest_Extremity_Specialsts_Resource_Group
# docker build -t northwest-extremity-specialists .
# docker tag default-company:latest jimmylagattuta/northwest-extremity-specialists:latest
# docker push jimmylagattuta/northwest-extremity-specialists:latest

# myapp-postgres-server
# postgres
# long usual password

# iphone 14 dimensions 393x852 smallest still in use 320x480 and 240x320(but do you need it?)

# Stage 1: Build the React client
FROM node:18.17.0 as client-builder
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build
# Stage 2: Build the Rails app
FROM ruby:3.2.2
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
RUN bundle install
# Run the database migration
RUN bundle exec rails db:create RAILS_ENV=production
RUN bundle exec rails db:migrate RAILS_ENV=production
# Install Node.js
RUN apt-get update && apt-get install -y nodejs
# Install Node.js using nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN /bin/bash -c "source ~/.nvm/nvm.sh && nvm install 18.17.0"
COPY . .
# Copy the built React app from the client-builder stage
COPY --from=client-builder /usr/src/app/client/build /usr/src/app/public
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
