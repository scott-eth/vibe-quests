import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/data', (req, res) => {
  const sampleData = [
    { id: 1, name: 'Item 1', description: 'First sample item' },
    { id: 2, name: 'Item 2', description: 'Second sample item' },
    { id: 3, name: 'Item 3', description: 'Third sample item' },
  ];
  
  res.json({ data: sampleData });
});

app.post('/api/data', (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  
  const newItem = {
    id: Math.floor(Math.random() * 1000),
    name,
    description,
    created: new Date().toISOString()
  };
  
  res.status(201).json({ message: 'Item created successfully', item: newItem });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/data`);
});