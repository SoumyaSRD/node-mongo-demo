const pino = require("pino");

const colorizeOptions = {
  levelFirst: true,
  colorize: true,
  translateTime: true,
  ignore: "pid,hostname",
  customColors: "err:red, warn:yellow, info:green",
};

const logger = pino({
  level: "info",
  prettyPrint: { colorize: true },
  transport: {
    target: "pino-pretty",
    options: { destination: "./logs/app.log", colorizeOptions },
  },
});

const loggerMiddleware = (req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);

  res.on("finish", () => {
    if (res.statusCode >= 400) {
      logger.error(`Response with status code: ${res.statusCode}`);
    } else {
      logger.info(`Response with status code: ${res.statusCode}`);
    }
  });

  res.on("error", (err) => {
    logger.error(`Error: ${err.message}`);
  });

  next();
};

module.exports = loggerMiddleware;
