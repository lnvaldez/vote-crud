const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const themeRoutes = require("./routes/themeRoutes");
const linkRoutes = require("./routes/linkRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const xss = require("xss-clean");
const csrf = require("csurf");
const { auth } = require("./middleware/auth");
const { checkRole } = require("./middleware/role");
const cronTasks = require("./utils/cron/scheduledTasks");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

const csrfProtection = csrf({ cookie: true });

app.set("view engine", "ejs");
// app.use(expressLayouts);
// app.set("layout", "./layouts/layout");

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(csrfProtection);

app.use(auth);
app.use(checkRole);

app.use("/themes", themeRoutes);
app.use("/links", linkRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Running app on port ${PORT}`);
});
