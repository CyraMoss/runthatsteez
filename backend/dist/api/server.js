"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const db_1 = __importDefault(require("../db"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Create HTTP server
const server = http_1.default.createServer(app);
// Create WebSocket server
const wsServer = new ws_1.WebSocketServer({ server });
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
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
(0, db_1.default)()
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});
app.get('/', (req, res) => {
    res.send('this is the backend server getting all ya info from the database');
});
app.use('/', routes_1.default);
// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
