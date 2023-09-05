const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const usersRouter = require("./routes/users");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => res.json({ msg: "Hello world after the class" }));

// establishing connection!!
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
