import type { NextFunction, Request, Response } from "express";
import path from "path";
import { Worker } from "worker_threads";

import { IUser } from "./user.interface.js";
import * as UserUsecase from "./user.usecase.js";

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

export async function findAllUser(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserUsecase.findAllUser();
    return res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function findUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserUsecase.findUserById(String((req.params as any).id));
    return res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = new IUser(req.body);
    const data = await UserUsecase.updateUser(user);
    return res.status(200).json({
      data,
      message: "User updated successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = String((req.params as any).id);
    const data = await UserUsecase.deleteUser(_id);

    return res.status(200).json({
      data,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    const workerPath = resolveExcelWorkerPath();
    const worker = new Worker(workerPath, {
      workerData: { filePath: (req as any).file?.path },
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
  } catch (error) {
    return next(error);
  }
}

export async function filterUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, ...filterData } = req.body as any;

    const data = await UserUsecase.filterUser(filterData, page, limit);
    if (data) {
      return res.status(200).json({
        data,
        message: "User filtered successfully",
      });
    }
    return res.status(404).json({
      data,
      message: "User does not exist",
    });
  } catch (error) {
    return next(error);
  }
}

