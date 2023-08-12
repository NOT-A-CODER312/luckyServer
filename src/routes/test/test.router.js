const express = require("express");

const testListener = express.Router();

const {httpGetTest} = require("./test.controller");

testListener.get("/", httpGetTest);

module.exports = testListener;