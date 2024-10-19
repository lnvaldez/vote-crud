const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Running app on port ${PORT}`);
});
