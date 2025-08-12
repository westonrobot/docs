# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus v3 documentation site for Weston Robot products, built with TypeScript and React. The site serves as comprehensive documentation for robot platforms, peripherals, systems, software, and tutorials.

## Common Development Commands

### Development
```bash
# Install dependencies
npm install

# Start development server (available at http://localhost:3000)
npm run start

# Build for production
npm run build

# Type checking
npm run typecheck

# Serve production build locally
npm run serve

# Clear Docusaurus cache
npm run clear
```

### Docker Development
```bash
# Run with Docker Compose
docker compose up

# Or use the convenience script
./run_docs.sh
```

## High-Level Architecture

### Documentation Structure
The site uses Docusaurus's multi-instance documentation pattern with six separate documentation sections, each with its own routing and sidebar configuration:

- **General** (`/general/*`) - Operational safety and maintenance guides - configured in `sidebars-general.ts`
- **Robot** (`/robot/*`) - Documentation for UGVs, quadrupeds, humanoids, and manipulators - configured in `sidebars-robot.ts`
- **Peripheral** (`/peripheral/*`) - Power regulators, network equipment, computers - configured in `sidebars-peripheral.ts`
- **System** (`/system/*`) - Integrated systems like UGV development kits - configured in `sidebars-system.ts`
- **Software** (`/software/*`) - SDKs, toolboxes, and installation guides - configured in `sidebars-software.ts`
- **Tutorial** (`/tutorial/*`) - Step-by-step guides and how-tos - configured in `sidebars-tutorial.ts`

Each section is configured as a separate plugin instance in `docusaurus.config.ts` with its own path, route base, and sidebar configuration.

### Key Configuration Files
- `docusaurus.config.ts` - Main configuration defining plugins, themes, navbar, and multi-docs setup
- `sidebars-*.ts` - Individual sidebar configurations for each documentation section
- `src/pages/index.tsx` - Custom landing page with interactive decision tree navigation using React hooks

### Content Organization
- Documentation content is written in Markdown/MDX files in respective directories
- Each section has an `intro.md` entry point
- Images are stored in `img/` subdirectories within each section
- Category metadata is managed through `_category_.json` files

### Search & Navigation
- Uses `docusaurus-lunr-search` plugin for client-side search functionality
- Custom interactive decision tree on the homepage guides users to appropriate documentation sections
- Navbar provides direct access to all major documentation categories

### Styling & Theming
- Custom CSS in `src/css/custom.css`
- Supports Mermaid diagrams through `@docusaurus/theme-mermaid`
- Uses Prism for syntax highlighting with GitHub light and Dracula dark themes