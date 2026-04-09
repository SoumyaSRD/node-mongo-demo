import http from "http";
import cluster from "cluster";
import os from "os";

import app from "./app/app.js";
import { PORT } from "./config/keys.js";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // eslint-disable-next-line no-console
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    // eslint-disable-next-line no-console
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const server = http.createServer(app);
  const port = PORT ? Number(PORT) : 5000;

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port: ${port}`);
  });
}

