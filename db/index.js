const mongoose = require("mongoose");

// Schemas:
const adminSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
});
const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	coursePurchased: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});
const courseSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	imageLink: String,
	published: Boolean,
});

// Defining Model:
const Admin = mongoose.model("Admin", adminSchema);
const Courses = mongoose.model("Courses", courseSchema);
const Users = mongoose.model("Users", userSchema);

module.exports = {
	Users,
	Admin,
	Courses,
};
