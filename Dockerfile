FROM node:20-slim

WORKDIR /app

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Docusaurus dependencies without mounting the repo yet
COPY package*.json ./
RUN npm install

# Install mermaid theme
RUN npm install @docusaurus/theme-mermaid --save

# Expose the port Docusaurus uses
EXPOSE 3000

# Set environment variable to allow host connections
ENV HOST=0.0.0.0
ENV DOCUSAURUS_BASE_URL=/docs-next/

# Command to run when container starts - will be overridden by docker-compose
CMD ["npm", "start", "--", "--host", "0.0.0.0"] 