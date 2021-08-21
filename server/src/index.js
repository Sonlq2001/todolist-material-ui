import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import db from "./config/db/connectDb.js";
import rootRouter from "./routes/index.js";
const app = express();

// connect db;
db.connect();

// middleware
// app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// routes
app.use("/api", rootRouter.authRouter);
app.use("/api", rootRouter.noteRouter);

app.listen(PORT, () => {
	console.log("Sever is running on", PORT);
});
