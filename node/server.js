var http = require("http").Server();
var io = require("socket.io")(http);
var redis = require("redis");

var redisClient = redis.createClient(); // name used in docker file
// 6379, "redis"

// when client sends a socket,
// subscribe to channel and send to client a message
// with event name (result) and redis message
io.on("connection", function(socket) {
  console.log("A user has connected...");

  // Subscribe redis client to channel
  socket.on("subscribe", function(celeryTaskId) {
    redisClient.subscribe(celeryTaskId);
  });

  redisClient.on("message", function(channel, message) {
    socket.emit("result", message);
  });
});

http.listen(3000, function() {
  console.log("Listening on port 3000...");
});
