const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);  // Attach Express to HTTP server
const port = 4000;
const cors = require('cors');
const socketIo = require('socket.io');
const messageModel = require('./models/LeadChats');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("uploads"));
app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      credentials: true,
    })
  );
  
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins a room based on their startupid from cookies
  socket.on('joinRoom', (startupid) => {
      socket.join(startupid); // Join the room with startupid
      console.log(`User ${socket.id} joined room ${startupid}`);
  });

  // Listen for messages from users in the room
  socket.on('sendMessage', async ({ roomId, messageData }) => {
      console.log("Message received from user in room:", roomId, messageData);
      try {
          io.to(roomId).emit('receiveMessage', messageData);
          console.log(`Message sent to room ${roomId}:`, messageData);
      } catch (error) {
          console.error('Error sending message:', error);
      }
      
              try {
          // Find or create the message document for the specific startup
          const existingMessages = await messageModel.findOne({ userid: roomId });
          if (existingMessages) {
             console.log(existingMessages.startup_id, );
              // If messages already exist, push the new message to the messages array
              existingMessages.messsages[existingMessages.messsages.length]={
                  message: messageData.message,
                  sender: messageData.sender,
                  created_at: new Date(),
              };
              await existingMessages.save(); // Save the updated document
          } else {
              // If no messages exist, create a new document
              const newMessage = new messageModel({
                  startup_id: roomId,
                  messages: [{
                      message: messageData.message,
                      sender: messageData.sender,
                      created_at: new Date(),
                  }],
              });
              await newMessage.save(); // Save the new document
          }
          console.log("Message saved to database.");
      } catch (error) {
          console.error("Error saving message to database:", error);
      }
  });
  socket.on('BroadcastMessage', async ({ messageData }) => {
      console.log("Broadcasting message:", messageData);
      try {
          // Emit the broadcast message to all connected clients
          io.emit('receiveMessage', messageData);
          console.log("Broadcast message sent to all clients:", messageData);
      } catch (error) {
          console.error('Error broadcasting message:', error);
      }
  
      try {
          // Fetch all startups from the database (assuming you have a Startup model)
          const allStartups = await startupModel.find();  // Adjust this to match your database query
          if (allStartups && allStartups.length > 0) {
              for (let startup of allStartups) {
                  const roomId = startup._id;  // Assuming _id is the unique identifier for the startup
                  // Find or create the message document for each startup
                  const existingMessages = await messageModel.findOne({ startup_id: roomId });
                  if (existingMessages) {
                      // If messages already exist, push the new message to the messages array
                      existingMessages.messsages.push({
                          message: messageData.message,
                          sender: messageData.sender,
                          created_at: new Date(),
                      });
                      await existingMessages.save();  // Save the updated document
                  } else {
                      // If no messages exist, create a new document
                      const newMessage = new messageModel({
                          startup_id: roomId,
                          messages: [{
                              message: messageData.message,
                              sender: messageData.sender,
                              created_at: new Date(),
                          }],
                      });
                      await newMessage.save();  // Save the new document
                  }
  
                  console.log(`Message saved to database for startup ${roomId}.`);
              }
          } else {
              console.log("No startups found.");
          }
      } catch (error) {
          console.error("Error saving broadcast message to database:", error);
      }
  });
  

  // Handle user disconnect
  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});

app.get('/' , function (req, res) {res.send("hi");})
app.use("/user" , require("./routes/user/user"))
app.use("/games" , require("./routes/games/games"))
app.use("/teamleads" , require("./routes/team-leads/team"))
app.use("/judge" , require("./routes/judge/judge"))
app.use("/admin" , require("./routes/admin/admin"))
app.use("/advertisement" , require("./routes/advertisement/advertisement"))
app.get('/messages/:id', async (req, res) => {
    try {
      // Fetch all startups and only the required fields
      const messages = await messageModel.findOne({startup_id: req.params.id});
      // Format the data for the response
      // Send the formatted data
      if (!messages) {
        return
      }
      res.status(200).send(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});
      