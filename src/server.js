const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
