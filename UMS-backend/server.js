const express = require("express");
const users_route = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");

const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT;

app.use("/api/users", users_route);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
