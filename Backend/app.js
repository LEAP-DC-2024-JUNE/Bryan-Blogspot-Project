const express = require("express");
const morgan = require("morgan");
const connectDb = require("./configs/MongoDbConfig");
const authRouter = require("./routers/authRouter");
const dotenv = require("dotenv");
dotenv.config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Started listening on port: ${PORT}`));
