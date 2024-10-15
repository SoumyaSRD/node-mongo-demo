const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const start = require("../config/db.config");
const setupSwaggerDocs = require("../middlewares/swagger/swagger.middleware");

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cookieParser());

setupSwaggerDocs(app);

start();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/student", async (req, res) => {
  console.log(res);
  try {
    let data = await student.insertOne(req.body);

    res.json({
      statusCode: 200,
      message: "Successfully inserted",
      data,
    });
  } catch (error) {
    res.json({
      statusCode: 400,
      message: "Error during insert",
      error,
    });
  }
});

module.exports = app;

/* const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // Set a token cookie with an expiry time
  const token = 'your-token-value';
  const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  res.cookie('token', token, { 
    path: '/', 
    httpOnly: true, 
    secure: true, 
    maxAge: expiryTime 
  });

  // Set another cookie with different options
  res.cookie('anotherCookie', 'anotherValue', { 
    path: '/', 
    httpOnly: true, 
    maxAge: expiryTime 
  });

  res.send('Cookies with token and expiry time set');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
 */
