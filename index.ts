import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/admin";
import usersRouter from "./routes/users";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => res.json({ msg: "Hello world after the class" }));

// establishing connection!!
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/", {});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
