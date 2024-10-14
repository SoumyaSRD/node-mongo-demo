const express = require("express");
const loggerMiddleware = require("../middlewares/logger/custom.logger");
const setupSwaggerDocs = require("../middlewares/swagger/swagger.middleware");

const app = express();

app.use(loggerMiddleware);
setupSwaggerDocs(app);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3010, () => {
  console.log("Server is running on port 3010");
});
