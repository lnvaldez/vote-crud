const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const themeRoutes = require("./routes/themeRoutes");
const linkRoutes = require("./routes/linkRoutes");
const userRoutes = require("./routes/userRoutes");
const { auth } = require("./middleware/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.set("view engine", "ejs");
// app.use(expressLayouts);
// app.set("layout", "./layouts/layout");

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(xss());

app.use(auth);

app.use("/themes", themeRoutes);
app.use("/links", linkRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Running app on port ${PORT}`);
});
