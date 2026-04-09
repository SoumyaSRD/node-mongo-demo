import type { Request, Response } from "express";
import { Worker } from "worker_threads";
import path from "path";

function resolveExcelWorkerPath() {
  const isTsDev = Boolean(process.env.TS_NODE_DEV);
  return path.join(
    __dirname,
    "../../app/workers",
    isTsDev ? "excelWorker.ts" : "excelWorker.js"
  );
}

function workerExecArgv() {
  const isTsDev = Boolean(process.env.TS_NODE_DEV);
  return isTsDev ? ["-r", "ts-node/register"] : [];
}

export async function sseEvents(_req: Request, res: Response) {
  const filePath = path.join(
    __dirname,
    "../../../uploads/Inventory-Records-Sample-Data.xlsx"
  );

  const workerPath = resolveExcelWorkerPath();
  const worker = new Worker(workerPath, {
    workerData: { filePath },
    execArgv: workerExecArgv(),
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  worker.on("message", (data: any) => {
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
}

