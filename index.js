require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoutes = require("./routes/user");

const URL = require("./models/url");
const path = require("path");
const { connectToMongoDb } = require("./connect");

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Connected to MongoDB"));
// connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
//   console.log("MongoDb Connected!")
// );
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //TO USE FORM IN HTML/EJS FILES
app.use(cookieParser());
app.use(checkForAuthentication);

//routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/", staticRouter);
app.use("/user", userRoutes);

//UI
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => console.log(`Server Started @ Port : ${PORT}`));
