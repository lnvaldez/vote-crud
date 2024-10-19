const express = require("express");
const dotenv = require("dotenv");
const themeRoutes = require("./routes/themeRoutes");
const linkRoutes = require("./routes/linkRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.use("/themes", themeRoutes);
app.use("/links", linkRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Running app on port ${PORT}`);
});
