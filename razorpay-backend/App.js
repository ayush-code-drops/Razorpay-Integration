const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoute = require("./paymentRoute");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

mongoose
  .connect("mongodb://localhost:27017/paymentorder", {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("FAILED TO CONNET WITH DB"));

app.use(bodyParser.json());
app.use(cors());

app.use("/api", paymentRoute);

app.listen(5000, () => {
  console.log(`App is running at 5000 port`);
});
