const app = require("./app");
const http = require("http");

const PORT = process.env.PORT || 4000;

const { initSocket } = require("./socket/socket");

const server = http.createServer(app);

// 🔥 initialize socket
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
