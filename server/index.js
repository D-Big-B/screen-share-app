const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/view", (req, res) => {
  res.sendFile(__dirname + "/display.html");
});

io.on("connection", (socket) => {
  socket.on("join-message", (roomId) => {
    socket.join(roomId);
    console.log("User joined in a room : ", roomId);

    socket.on("screen-data", (data) => {
      data = JSON.parse(data);
      const room = data.room;
      const imgStr = data.image;
      socket.broadcast.to(room).emit("screen-data", imgStr);
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on Port : ", PORT);
});
