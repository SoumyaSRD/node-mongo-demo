// Load environment variables

const mongoose = require("mongoose"); // Import mongoose
const { MONGO_URI } = require("./keys");

/* ** Mongodb connection using mongoose package ** */
const start = async () => {
  if (!MONGO_URI) throw new Error("MONGO_URI required");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Database connection error");
  }
};

module.exports = start; // Correct export syntax

/* ** Mongodb connection using mongodb package ** */
/* 
const { MongoClient } = require("mongodb");
console.log("env", MONGO_URI);
const client = new MongoClient(MONGO_URI);

client
  .connect()
  .then(() => console.log(`db connected successfully`))
  .catch((err) => console.log(err));

const DB = client.db("school");
const student = DB.collection("students"); */
