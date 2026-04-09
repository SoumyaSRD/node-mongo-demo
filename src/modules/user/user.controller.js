const { Worker } = require("worker_threads");
const path = require("path");

const UserService = require("./user.service");
const IUser = require("./user.interface");

module.exports.findAllUser = async (req, res, next) => {
  try {
    const data = await UserService.findAllUser();
    return res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {
    const data = await UserService.findUserById(req.params.id);
    return res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = new IUser(req.body);
    const data = await UserService.updateUser(user);
    return res.status(200).json({
      data,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = await UserService.deleteUser(_id);

    return res.status(200).json({
      data,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.upload = async (req, res, next) => {
  try {
    const workerPath = path.join(__dirname, "../../app/workers/excelWorker.js");
    const worker = new Worker(workerPath, {
      workerData: { filePath: req.file?.path },
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
  } catch (error) {
    next(error);
  }
};

module.exports.filterUser = async (req, res, next) => {
  try {
    const { page, limit, ...filterData } = req.body;

    const data = await UserService.filterUser(filterData, page, limit);
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
    next(error);
  }
};
