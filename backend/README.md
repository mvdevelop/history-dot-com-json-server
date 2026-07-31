# History.com - Backend

This directory contains the Express.js backend server for History.com.

## Overview

This is a simple REST API server that provides endpoints for:
- Historical content management
- User data management
- Cross-origin resource sharing (CORS)

## API Endpoints

### Content Endpoints
- `GET /api/content` - Get all historical content
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Add new content
- `PUT /api/content/:id` - Update existing content
- `DELETE /api/content/:id` - Delete content

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Add new user
- `PUT /api/users/:id` - Update existing user
- `DELETE /api/users/:id` - Delete user

## Database

The backend uses `db.json` to store data. This file contains:
- Historical content with images, titles, and descriptions
- User information with images, names, and occupations

## Development Scripts

```bash
# Start the server in development mode
npm run dev

# Build for production
npm run build

# Start the built server
npm start
```

## Technologies

- Node.js
- Express.js
- TypeScript
- CORS middleware
- File-based database

## CORS

CORS is enabled to allow the frontend to communicate with this backend regardless of origin.

## Deployment

For production deployment:
1. Build the server: `npm run build`
2. Start the server: `npm start`
3. Ensure `db.json` is in the project root

## Testing

You can test the API endpoints using:
- curl commands
- Postman
- Any HTTP client

Example using curl:
```bash
curl http://localhost:3001/api/content
```