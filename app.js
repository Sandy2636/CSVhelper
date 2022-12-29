const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("Error:", err));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/user/", userRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
