# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is **Resufolio**, a personal portfolio and resume website built with Fresh
(Deno's web framework). The site showcases Joel Cuthriell's work as a UX/UI
designer and developer, featuring an interactive portfolio with dynamic cards,
resume viewing, and custom analytics tracking.

## Technology Stack

- **Runtime**: Deno (not Node.js)
- **Framework**: Fresh (Deno's web framework with SSR and islands architecture)
- **Frontend**: Preact with TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **Analytics**: Custom file-based analytics system (JSON persistence)

## Development Commands

- `deno task start` - Start development server with hot reloading
- `deno task build` - Build the application for production
- `deno task preview` - Preview production build locally
- `deno task check` - Run linting, formatting, and type checking
- `deno task manifest` - Update the Fresh manifest (routes/islands)
- `deno task update` - Update Fresh to latest version

**Important**: The server is typically already running (`deno task start`).
Check the Cursor rules which indicate it's always running.

## Architecture

### Fresh Islands Architecture

- **Routes** (`routes/`): Server-side rendered pages and API endpoints
- **Islands** (`islands/`): Client-side interactive components (hydrated on the
  client)
- **Components** (`components/`): Static server-rendered components

### Key Islands (Interactive Components)

- `Header.tsx` - Animated header that collapses on scroll with dynamic sizing
- `PortfolioCards.tsx` - Main portfolio content with alternating layout and
  lightbox functionality
- `ResumeViewer.tsx` - PDF resume viewer integration
- `AnalyticsTracker.tsx` - Client-side analytics event tracking
- `WoodcutIllustrations.tsx` - Custom SVG illustrations for portfolio cards

### Analytics System

Custom analytics implementation at `utils/analytics.ts`:

- File-based persistence (`analytics_data.json`)
- Tracks page views and user actions
- Excludes `/admin` routes from tracking
- Debounced writes to prevent excessive file I/O
- Admin dashboard at `/admin/analytics`

### Styling Architecture

- Tailwind CSS with custom config
- Custom CSS classes for gradients, animations, and noise textures
- Consistent color palette: `#E7DECA` (cream), `#1a1a1a`/`#232323` (dark grays),
  `#54ac9b`/`#32564f` (teal accents)
- Responsive design with mobile-first approach

## File Structure Highlights

- `/routes/_app.tsx` - Root app component with CSP configuration and global
  analytics
- `/routes/index.tsx` - Homepage with portfolio cards
- `/routes/resume.tsx` - Resume viewer page
- `/routes/api/analytics.ts` - Analytics collection endpoint
- `/static/` - Static assets including PDFs, images, and custom CSS
- `/docs/gogirlgala/` - Documentation for a specific project/client

## Development Notes

- Uses Preact instead of React (smaller bundle size)
- JSX configured with React JSX transform
- TypeScript throughout with strict type checking
- Custom gradient animations and visual effects
- PDF.js integration for resume viewing
- Responsive header that transforms on scroll
- Lightbox functionality for image viewing

## Import Map Structure

The project uses Deno's import map in `deno.json` for dependencies:

- Fresh framework from `deno.land/x/fresh`
- Preact from `esm.sh`
- Tailwind CSS from npm
- Standard library from `deno.land/std`

## Deployment Configuration

- Production builds generate static assets to `_fresh/` directory
- Uses unstable CJS detection flag for compatibility
- Configured for server-side rendering with client-side hydration
