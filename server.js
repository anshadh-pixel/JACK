// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // ellavarkkum connect cheyyan allow cheyyum
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Root route (test)
app.get("/", (req, res) => {
  res.send("✅ Secret Chat Server Running...");
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("chatMessage", (msg) => {
    console.log("💬 Message:", msg);
    io.emit("chatMessage", msg); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});