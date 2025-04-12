const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4321;

const Server = express();

Server.listen(() => {
  console.log(`Server is running on port ${PORT}`);
});
