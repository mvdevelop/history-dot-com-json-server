import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Content } from '../types/content.types';
import { User } from '../types/user.types';
import contentRoutes from './routes/content.routes';
import userRoutes from './routes/user.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);

// Serve static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));

// Default route
app.get('/', (req, res) => {
  res.send('History.com API is running');
});

app.listen(PORT, () => {
  console.log(`History.com API server running on port ${PORT}`);
});