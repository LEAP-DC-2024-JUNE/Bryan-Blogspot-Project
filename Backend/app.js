const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./configs/MongoDbConfig");
const authRouter = require("./routers/authRouter");
const blogRouter = require("./routers/blogRouter");
const dotenv = require("dotenv");
dotenv.config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Started listening on port: ${PORT}`));
