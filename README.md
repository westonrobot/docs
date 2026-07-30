# Weston Robot Public Documentation

This repository contains source files for generating documentation using [Docusaurus](https://docusaurus.io/).

The site is published to <https://docs.westonrobot.com> by the `Deploy Docusaurus site to GitHub Pages` workflow on every push to `main`.

## Develop with Docker

Make sure you have docker and docker compose set up properly. You can refer to the instructions [here](https://docs.docker.com/engine/install/ubuntu/). Then you can build and run the app:

```bash
docker compose up
```

You should be able to access the site at: http://localhost:3000

Dependencies are installed into the image, not into your working tree, so run `docker compose build` again after changing `package.json`.

## Develop in the host

### Set Up Environment

Docusaurus requires Node.js 20.0 or higher. The version this project targets is pinned in `.nvmrc`, and CI reads that same file, so `nvm use` gives you exactly what CI runs.

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Install the version pinned in .nvmrc (run from the repository root):
nvm install
nvm use

# Verify:
node -v
npm -v
```

`nvm` ships its own `npm`, so there is no need to `apt install npm`.

### Run the local server

Install dependencies from the lockfile, then start the dev server with hot reload:

```bash
cd <this-repository>
npm ci
npm run start
```

### Check before opening a pull request

CI runs both of these, and `npm run build` is what catches broken links and
anchors, which the dev server does not:

```bash
npm run typecheck
npm run build
```

## Repository layout

Documentation is split into six independent Docusaurus docs plugin instances, each with its own sidebar file:

| Section | Content directory | Sidebar |
| --- | --- | --- |
| `/general` | `general/` | `sidebars-general.ts` |
| `/robot` | `robot/` | `sidebars-robot.ts` |
| `/peripheral` | `peripheral/` | `sidebars-peripheral.ts` |
| `/system` | `system/` | `sidebars-system.ts` |
| `/software` | `software/` | `sidebars-software.ts` |
| `/tutorial` | `tutorial/` | `sidebars-tutorial.ts` |

The landing page is `src/pages/index.tsx`.
