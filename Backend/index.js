const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/Db");
const router = require("./src/route/vedioRoute");

dotenv.config();
const port = 4000;
const app = express();
connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/vedios", router);

app.listen(4000, (error) => {
  if (error) {
    console.log("something is wrong");
  }

  console.log(`server is running on port ${port}`);
});
