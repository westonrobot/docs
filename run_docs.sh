#!/bin/bash

echo "Starting Docusaurus development server in Docker..."
echo "The site will be available at http://localhost:3000"

# Build and start the Docker container
docker compose up --build

# To stop the server, press Ctrl+C 