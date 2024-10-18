const http = require(`http`);

const app = require("./src/app/app");

const { PORT } = require("./src/config/keys");

const cluster = require("cluster");

const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart the worker
  });
} else {
  const server = http.createServer(app);

  server.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}`)
  );
}
