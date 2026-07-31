# Development Workflow Guide

This document provides comprehensive development guidelines for the History.com project, including setup instructions, coding standards, and workflow best practices.

## Overview

Welcome to History.com - a full-stack historical content management application. This project demonstrates professional development skills with React frontend and Express.js backend, featuring TypeScript, REST APIs, and enterprise-grade architecture.

## Project Architecture

### Directory Structure

```
history-dot-com-json-server/
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Application pages
│   │   ├── types/             # TypeScript definitions
│   │   └── styles/            # Component styles
│   ├── README.md              # Frontend documentation
│   ├── package.json          # Frontend dependencies
│   └── .env.example          # Environment variables template
│
├── backend/
│   ├── src/
│   │   ├── server/            # Express.js application
│   │   │   ├── server.ts      # Main application file
│   │   │   └── routes/        # API routes
│   │   └── types/             # TypeScript definitions
│   ├── README.md              # Backend documentation
│   ├── package.json          # Backend dependencies
│   └── .env.example          # Environment variables template
│
├── .gitignore                # Git ignore rules
├── README.md                 # Main project documentation
├── package.json              # Root project configuration
├── CONTRIBUTING.md           # Contribution guidelines
├── DEVELOPMENT.md            # This file
├── development-log.md        # Development journey
└── LICENSE                   # Project license
```

## Quick Start Guide

### Prerequisites

- Node.js (>= 18.x) or Bun (recommended)
- Git (>= 2.3.x)
- Modern web browser

### Initial Setup

```bash
# Clone the repository
git clone [https://github.com/mvdevelop/history-dot-com-json-server.git](https://github.com/mvdevelop/history-dot-com-json-server.git)
cd history-dot-com-json-server

# Install root-level dependencies (concurrently, cross-env)
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies  
cd ../backend
npm install
```

### Development Environment

```bash
# Start both frontend and backend servers (one terminal)
npm run start

# Or start individually
# Terminal 1
npm run dev:frontend
# Terminal 2  
npm run dev:backend

# Access the application
http://localhost:5173
```

### Development Scripts

#### Frontend Development
- **`npm run dev`** - Start Vite development server
- **`npm run dev:host`** - Start with host binding (for mobile testing)
- **`npm run dev:with-inspector`** - Start with inspector (for debugging)

#### Backend Development
- **`cd backend && npm run dev`** - Start Express.js server
- **`cd backend && npm run dev:with-inspector`** - Start with debug inspector

#### Building
- **`npm run build`** - Build both frontend and backend
- **`npm run build:frontend`** - Build only frontend
- **`npm run build:backend`** - Build only backend

#### Testing
- **`cd frontend && npm run test`** - Run frontend tests with Vitest
- **`cd backend && npm run test`** - Run backend tests with Jest
- **`npm run test:coverage`** - Generate coverage reports

#### Quality Assurance
- **`npm run lint:frontend`** - Lint frontend code
- **`npm run lint:backend`** - Lint backend code
- **`npm run type-check`** - TypeScript type checking

## Development Guidelines

### Code Quality

#### TypeScript Standards
```typescript
// Use strict mode
tsconfig.json: { "compilerOptions": { "strict": true } }

// Interface-based development
interface Content {
  id: number;
  title: string;
  description: string;
  img: string;
}

// Generic types for API responses
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  statusCode: number;
}
```

#### Naming Conventions
- **Files**: kebab-case (.env.example)
- **Components**: PascalCase (Header, Content)
- **Functions**: camelCase (handleSubmit, onChange)
- **Variables**: camelCase (apiUrl, userData)
- **Constants**: UPPER_SNAKE_CASE (API_ENDPOINTS)

#### Code Structure
```tsx
// Components
components/
  ├── Header.tsx        // Header component
  │   └── styles/        // Component-specific styles
  ├── Footer.tsx        // Footer component
  │   └── styles/
  └── Navigation.tsx    // Navigation component
  │   └── styles/

// Pages
pages/
  ├── HomePage.tsx      // Home page component
  ├── ContentPage.tsx   // Content listing page
  └── AddContentPage.tsx // Form component
  │   └── styles/        // Form styles

// Shared
shared/
  ├── api/              // API utilities
  ├── hooks/            // Custom hooks
  └── utils/            // Helper functions
```

### Frontend Development

#### React Component Patterns
```tsx
// Functional components with TypeScript
const Header: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/content">Content</Link>
    </nav>
  );
};

// Custom hooks
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

#### API Integration
```tsx
// Frontend API calls
const fetchContent = async (): Promise<Content[]> => {
  const response = await fetch('http://localhost:3001/api/content');
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }
  return response.json();
};

// Form handling with validation
const AddContentPage: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Content>>({
    img: '',
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add content');
      }

      const newContent = await response.json();
      // Handle success...
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Backend Development

#### Express.js Server Setup
```typescript
// src/server/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(compression());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;
```

#### API Route Patterns
```typescript
// src/server/routes/content.routes.ts
import express from 'express';
import { Request, Response, Router } from 'express';
import { Content } from '../types/content.types';

const router = Router();

// GET all content
router.get('/', async (req: Request, res: Response) => {
  try {
    const content = await getAllContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// GET content by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await getContentById(parseInt(id));
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// POST new content
router.post('/', async (req: Request, res: Response) => {
  try {
    const contentData: Partial<Content> = req.body;
    
    if (!validateContentData(contentData)) {
      return res.status(400).json({ error: 'Invalid content data' });
    }

    const newContent = await createContent(contentData);
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content' });
  }
});

export default router;
```

## Testing Strategy

### Frontend Testing
```bash
# Install testing dependencies
cd frontend
npm install -D @testing-library/react @testing-library/user-event vitest @vitest/ui

# Create test file
test/
  ├── Content.test.tsx          # Component tests
  ├── AddContentPage.test.tsx   # Form tests
  └── utils/                    # Test utilities

# Run tests
npm run test          # Run all tests
npm run test:ui      # Run with UI
npm run test:coverage # Generate coverage report
```

### Backend Testing
```bash
# Install testing dependencies
cd backend
npm install -D jest @types/jest jest-transform-stub

# Create test file
tests/
  ├── content.test.ts         # API route tests
  ├── user.test.ts            # User API tests
  └── utils/                  # Test utilities

# Run tests
npm run test          # Run all tests
npm run test:watch    # Run with watch mode
npm run test:coverage # Generate coverage report
```

## Deployment Guide

### Local Deployment
```bash
# Frontend deployment (Vercel, Netlify, etc.)
# Backend deployment (Heroku, AWS, DigitalOcean)

# Environment variables
# Frontend .env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_NODE_ENV=production

# Backend .env
PORT=3001
NODE_ENV=production
DATABASE_URL=your-database-url
```

### Docker Deployment
```yaml
# docker-compose.yml
dversion: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - '5173:5173'
    environment:
      - VITE_API_BASE_URL=http://backend:3001/api

  backend:
    build: ./backend
    ports:
      - '3001:3001'
    environment:
      - NODE_ENV=production
      - CORS_ORIGIN=https://localhost:5173
    depends_on:
      - database

  database:
    image: postgres:13
    environment:
      - POSTGRES_DB=historydb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Documentation

### API Documentation
All API endpoints follow RESTful conventions:

#### Content Endpoints
- **GET /api/content** - List all content items
- **GET /api/content/:id** - Get specific content item
- **POST /api/content** - Create new content item
- **PUT /api/content/:id** - Update content item
- **DELETE /api/content/:id** - Delete content item

#### User Endpoints
- **GET /api/users** - List all users
- **GET /api/users/:id** - Get specific user
- **POST /api/users** - Create new user
- **PUT /api/users/:id** - Update user
- **DELETE /api/users/:id** - Delete user

### Code Documentation Standards

#### JSDoc Comments
```typescript
/**
 * Fetches content from the API
 * @param {string} url - The API endpoint URL
 * @returns {Promise<Content[]>} Promise that resolves to an array of content items
 * @throws {Error} If the request fails
 */
async function fetchContent(url: string): Promise<Content[]> {
  // Implementation
}
```

#### README Files
Each component and module includes comprehensive README files with:
- Component/function description
- Props/interfaces
- Usage examples
- Dependencies
- Testing instructions

## Version Control

### Git Branch Strategy

- **main**: Production-ready code
- **development**: Current development version
- **feature/**: Feature branches (e.g., `feature/user-management`)
- **bugfix/**: Bug fix branches (e.g., `bugfix/add-api-validation`)

### Commit Message Guidelines

```
<type>(<scope>): <subject>

[body]

[footer]

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc.)
- refactor: Code refactoring
- perf: Performance improvements
- test: Adding tests
- build: Build system changes
- ci: CI/CD changes
- chore: Other changes

Scope: Component, page, route, utility, etc.

Example:
feat(content): add form validation for new content
```

## Contributing Guidelines

### Pull Request Process

1. **Create feature branch** from development
2. **Commit changes** with descriptive messages
3. **Push branch** to remote repository
4. **Create Pull Request** with detailed description
5. **Code Review** process
6. **Merge** into development branch

### Code Review Checklist

- [ ] Code follows TypeScript strict mode
- [ ] All tests passing
- [ ] Code linting passed
- [ ] Type checking passed
- [ ] Documentation updated
- [ ] Responsive design tested
- [ ] Performance optimized

## Project Modernization Roadmap

### Phase 1: Foundation (Completed)
- [x] TypeScript implementation
- [x] React + TypeScript integration
- [x] REST API backend
- [x] Basic CRUD operations
- [x] Professional documentation

### Phase 2: Enhancement (Next 30 days)
- [ ] Comprehensive testing suite
- [ ] Authentication & authorization
- [ ] Advanced API features
- [ ] Performance optimization
- [ ] Docker deployment

### Phase 3: Advanced Features (Next 90 days)
- [ ] Real-time updates
- [ ] Advanced filtering & search
- [ ] Admin dashboard
- [ ] Analytics & monitoring
- [ ] Cloud deployment

## Support & Community

### Getting Help
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Community questions and discussions
- **Stack Overflow**: Technical questions with `react typescript express` tags

### Contributing
- **Pull Requests**: Feature contributions and improvements
- **Code Reviews**: Peer review and quality assurance
- **Documentation**: Help improve documentation

### Acknowledgements
- Open source contributors
- Development tools and libraries
- Community members
- Mentors and supporters

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Quick Commands Summary

### Development
```bash
# Start all services
npm run start

# Build for production
npm run build

# Test and lint
npm run test
npm run lint
npm run type-check

# Clean and rebuild
npm run clean
npm run build
```

### API Testing
```bash
# Test content API
curl http://localhost:3001/api/content

# Test user API
curl http://localhost:3001/api/users

# Add new content
curl -X POST http://localhost:3001/api/content \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test content"}'
```

## 🚀 Happy Coding!

This project serves as a professional foundation for full-stack development with modern web technologies. Continuously evolving to demonstrate best practices and industry standards.

**Ready to build something amazing together?** 🚀