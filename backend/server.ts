import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { WebSocketServer } from 'ws';
import connectToDatabase from './db';
import routes from './routes';

const app = express();
const port = 3000;

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wsServer = new WebSocketServer({ server });

app.use(cors());
app.use(bodyParser.json());

wsServer.on('connection', (ws) => {
  console.log('Client connected');

  // Send updates to clients every 5 seconds
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ message: 'Update from server' }));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval); // Clear interval when client disconnects
  });
});

wsServer.on('error', (error) => {
  console.error('WebSocket error:', error);
});

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

app.get('/', (req, res) => {
  res.send('this is the backend server getting all ya info from the database');
});

app.use('/', routes);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
