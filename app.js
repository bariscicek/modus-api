"use strict";

const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");

const router = require("./lib/router");

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use("/vehicles", router);

const PORT = parseInt(process.env.PORT) || 8888;

app.listen(PORT, "localhost", err => {
  if (err) {
    console.warn(err);
    return;
  }
  console.log(`Listening on port ${PORT}...`);
}); // app.listen
