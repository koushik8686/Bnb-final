const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);  // Attach Express to HTTP server
const port = 4000;
const cors = require('cors');
// const messageModel = require('./models/messagemodel');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("uploads"));

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.IO on the same server as Express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    //   console.log('A user connected:', socket.id);
    
      // User joins a room based on their startupid from cookies
      socket.on('joinRoom', (roomid) => {
        socket.join(roomid); // Join the room with startupid
        console.log(`User ${socket.id} joined room ${roomid}`);
      });
      
      socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
      });
    })

app.get('/' , function (req, res) {res.send("hi");})
app.use("/user" , require("./routes/user/user"))
app.use("/games" , require("./routes/games/games"))
app.use("/teamleads" , require("./routes/team-leads/team"))
app.use("/judge" , require("./routes/judge/judge"))
app.use("/admin" , require("./routes/admin/admin"))

server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      