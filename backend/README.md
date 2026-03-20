# Siraa Health - Backend

This is the backend service for **Siraa Health**, powered by [Strapi](https://strapi.io/) Headless CMS.

## Tech Stack

- **Framework:** Strapi 5
- **Database:** PostgreSQL
- **Environment:** Node.js (v20+)

## Getting Started

### Prerequisites

- Node.js (>= 20.0.0 and <= 24.x.x)
- npm (>= 6.0.0)
- PostgreSQL database

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure you have your environment variables set up properly (e.g., database connection credentials in your `.env` file).

### Running the Development Server

Start the Strapi backend with auto-reload enabled:

```bash
npm run develop
```

### Build and Production

To build your Strapi application for production (e.g., rendering the Admin UI):

```bash
npm run build
```

To start your Strapi application with auto-reload disabled:

```bash
npm run start
```

## Scripts

- `npm run develop`: Start your Strapi application in development mode with auto-reload.
- `npm run start`: Start your Strapi application without auto-reload (production mode).
- `npm run build`: Build your admin panel.

## Additional Resources

- [Strapi Documentation](https://docs.strapi.io)

trigger2
