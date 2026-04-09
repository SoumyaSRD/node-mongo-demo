const { Worker } = require("worker_threads");
const path = require("path");

module.exports.sseEvents = async (req, res) => {
  const filePath = path.join(
    __dirname,
    "../../../uploads/Inventory-Records-Sample-Data.xlsx"
  );

  const workerPath = path.join(__dirname, "../../app/workers/excelWorker.js");
  const worker = new Worker(workerPath, {
    workerData: { filePath },
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  worker.on("message", (data) => {
    if (data.action === "read") {
      res.write(`data: ${JSON.stringify(data.data)}\n\n`);
    } else if (data.action === "write") {
      res.write(`data: ${JSON.stringify({ status: "success" })}\n\n`);
    } else if (data.action === "error") {
      res.write(`data: ${JSON.stringify({ error: data.error })}\n\n`);
    }
  });

  worker.on("error", (error) => {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      res.write(
        `data: ${JSON.stringify({
          error: `Worker stopped with exit code ${code}`,
        })}\n\n`
      );
    }
    res.end();
  });

  worker.postMessage({ action: "read" });
};
