# Weston Robot Public Documentation

This repository contains source files for generating documentation using [Docusaurus](https://docusaurus.io/).

## Develop with Docker

Make sure you have docker and docker compose set up properly. You can refer to the instructions [here](https://docs.docker.com/engine/install/ubuntu/). Then you can build and run the app:

```bash
docker compose up
```

You should be able to access the site at: http://localhost:3000

## Develop in the host

### Set Up Environment

1. Follow instructions on [this page](https://nodejs.org/en/download/) to install Node.js and npm. Docusaurus requires Node.js version 18.0 or higher.

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.15.0".
nvm current # Should print "v22.15.0".
```

```bash
# Install npm
sudo apt install npm

# Verify npm version:
npm -v 
```

### Run the local server

Set up the development repository and install dependencies.

```bash
cd <this-repository>
npm install 
npm run build
```

Then you can build and serve the documentation locally.

```bash
npm run start
```