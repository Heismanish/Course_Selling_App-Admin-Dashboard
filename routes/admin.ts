import express, { Response, Request } from "express";
import { Users, Courses, Admin } from "../db";
import {
	adminTokenGenerator,
	jwtAdminAuthentication,
} from "../middleware/auth";
// import jwtAdminAuthentication from "../middleware/auth";

const router = express.Router();

// Admin routes
router.get(
	"/me",
	jwtAdminAuthentication,
	async (req: Request, res: Response) => {
		// logic to check if admin is logged in
		// console.log(req.user.username);

		// if (!req.headers.user) {
		// 	return res.sendStatus(403);
		// }
		// if (typeof req.headers.user === "string") {
		// 	return res.sendStatus(403);
		// }
		const username = req.headers.username;
		res.json(username);
	}
);

router.post("/signup", async (req: Request, res: Response) => {
	// logic to sign up admin
	const { username, password } = req.body;
	const admin = await Admin.findOne({ username });
	if (admin) {
		res.status(403).json({ message: "admin already present" });
	} else {
		const newAdmin = new Admin({ username, password });
		await newAdmin.save();
		console.log(adminTokenGenerator(username || null));
		res.json({
			message: "Admin created successfully",
			token: adminTokenGenerator(username),
		});
	}
});

router.post("/login", async (req: Request, res: Response) => {
	// logic to log in admin
	console.log("reached 54");
	const { username, password } = req.headers;
	const admin = await Admin.findOne({ username, password });
	if (typeof username === "undefined") {
		return res.sendStatus(403);
	}
	if (admin) {
		res.status(200).json({
			message: "Logged in successfully",
			token: adminTokenGenerator(username),
		});
	} else {
		res.status(404).json({ message: "admin not found" });
	}
});

router.post(
	"/courses",
	jwtAdminAuthentication,
	async (req: Request, res: Response) => {
		// logic to create a course
		const newCourse = new Courses(req.body);
		await newCourse.save();
		res.json({
			message: "Course created successfully",
			courseId: newCourse.id,
		});
	}
);

router.put(
	"/courses/:courseId",
	jwtAdminAuthentication,
	async (req: Request, res: Response) => {
		// logic to edit a course
		const course = await Courses.findByIdAndUpdate(
			req.params.courseId,
			req.body,
			{ new: true }
		);
		if (course) {
			res.json({ message: "Course updated successfully" });
		} else {
			res.json({ message: "Course not found" });
		}
	}
);

router.get(
	"/courses",
	jwtAdminAuthentication,
	async (req: Request, res: Response) => {
		// logic to get all courses
		const courses = await Courses.find({});
		res.json({ courses });
	}
);

router.get(
	"/courses/:courseId",
	jwtAdminAuthentication,
	async (req: Request, res: Response) => {
		const courseId = req.params.courseId;
		const course = await Courses.findById(courseId);
		res.status(200).json({ course });
	}
);

// module.exports = router;
export default router;
