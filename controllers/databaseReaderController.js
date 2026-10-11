const express = require("express");
const crudConstroller = require("./crudController");

exports.databaseReaderIndexGet = crudConstroller.crudIndexGet;