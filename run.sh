#!/bin/bash

# Function to set up environment variables based on the mode (dev or prod)
set_env() {
  if [ "$1" = "dev" ]; then
    echo "Setting up dev environment..."
    cp .env.dev .env
    docker-compose -f docker-compose.yml up --build
  elif [ "$1" = "prod" ]; then
    echo "Setting up prod environment..."
    cp .env.prod .env
    docker-compose -f docker-compose.prod.yml up --build
  else
    echo "Invalid mode! Use 'dev' or 'prod'."
    exit 1
  fi
}

# Check the first argument passed to the script (dev or prod)
MODE=$1

# Run the appropriate environment setup based on the mode
set_env $MODE