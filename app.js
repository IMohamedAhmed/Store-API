require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notFoundMiddeleware = require("./middleware/not-found");
const errorMiddeleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productRouter);

app.use(notFoundMiddeleware);
app.use(errorMiddeleware);

const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}.....`));
  } catch (error) {
    console.log(error);
  }
};

start();
