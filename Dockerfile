FROM node:22-slim

WORKDIR /app

# git is needed by Docusaurus to read last-updated timestamps from history
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Drop to the image's built-in unprivileged "node" user (uid 1000) before
# installing anything, so no file in the image ends up root-owned. The compose
# service bind-mounts the repository, so a root-owned artifact here becomes a
# root-owned artifact in the developer's working tree that then breaks
# host-side `npm run build` with EACCES.
RUN chown node:node /app
USER node

# Install from the lockfile (npm ci, not npm install) so the container resolves
# exactly what CI resolves. Copied before the source so the layer stays cached
# until package.json/package-lock.json change.
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "3000"]
