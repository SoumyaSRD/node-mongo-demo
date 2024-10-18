const { Worker } = require("worker_threads");

module.exports.sseEvents = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  worker.on("error", (error) => {
    console.error(error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  });

  req.on("close", () => {
    worker.terminate();
    console.log("Client disconnected");
  });
};
