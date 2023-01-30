require("dotenv").config();

const config = require("./config");

const debug = {
  log: (msg) => {
    if (config.debug) console.log(msg);
  },
  error: (msg) => {
    if (config.debug) console.error(msg);
  },
};

const exp = {
  debug,
  port: parseInt(process.env.PORT || 3000),
  url: process.env.URL || `http://localhost:${process.env.PORT || 3000}`,
};

module.exports = exp;
