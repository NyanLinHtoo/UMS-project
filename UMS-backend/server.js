const express = require("express");
const cors = require("cors");
const users_route = require("./routes/userRoutes");
const auth_route = require("./routes/authRoutes");
const connectDb = require("./config/dbConnection");

const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/auth", auth_route);
app.use("/api/users", users_route);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
