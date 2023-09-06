import express, { Request, Response } from "express";
import { Users, Courses, Admin } from "../db";
import { userTokenGenerator } from "../middleware/auth";
import { jwtUserAuthentication } from "../middleware/auth";

const router = express.Router();
// interface course {
// 	title?: string | undefined;
// 	description?: string | undefined;
// 	price?: number | undefined;
// 	imageLink?: string | undefined;
// 	published?: boolean | undefined;
// }

// User routes
router.get(
	"/me",
	jwtUserAuthentication,
	async (req: Request, res: Response) => {
		// logic to check if admin is logged in
		// console.log(req.user.username);
		const username = { username: req.headers.username };
		res.json(username);
	}
);
router.post("/signup", async (req: Request, res: Response) => {
	// logic to sign up user
	// - req.body
	const { username, password } = req.body;
	const existingUser = await Users.findOne({ username });
	if (existingUser) {
		res.json({ message: "user alreay exists" });
	} else {
		const user = new Users({ username, password });
		await user.save();
		res.json({
			message: "User created successfully",
			token: userTokenGenerator(username),
		});
	}
});

router.post("/login", async (req: Request, res: Response) => {
	// logic to log in user
	const { username, password } = req.headers;
	const existingUser = await Users.findOne({ username, password });
	if (existingUser) {
		res.json({
			message: "Logged in successfully",
			token: userTokenGenerator(username),
		});
	} else {
		res.json({ message: "user alreay exists" });
	}
});

router.get(
	"/courses",
	jwtUserAuthentication,
	async (req: Request, res: Response) => {
		// logic to list all courses
		const courses = await Courses.find({ published: true });
		res.json({ courses });
	}
);

router.post(
	"/courses/:courseId",
	jwtUserAuthentication,
	async (req: Request, res: Response) => {
		// logic to purchase a course
		try {
			console.log("Debug: Attempting to purchase course");
			const courseId = req.params.courseId;
			console.log("Debug: Course ID:", courseId);

			const user = await Users.findOne({ username: req.headers.username });
			console.log("Debug: Retrieved user:", user);

			if (user) {
				// Assuming Courses is properly defined and courseId is valid
				const course = await Courses.findById(courseId);
				console.log("Debug: Retrieved course:", course);
				// const courseToPush = { ...course };

				if (course) {
					user.coursePurchased.push(course.toObject());
					await user.save();
					console.log("Debug: Course purchased");
					res.json({ message: "course purchased" });
				} else {
					console.log("Debug: Course not found");
					res.json({ message: "course doesn't exist" });
				}
			} else {
				console.log("Debug: User not found");
				res.status(403).json({ message: "User not found" });
			}
		} catch (error) {
			console.error("Error:", error);
			res.status(500).json({ message: "An error occurred" });
		}
	}
);

router.get(
	"/purchasedCourses",
	jwtUserAuthentication,
	async (req: Request, res: Response) => {
		const user = await Users.findOne({
			username: req.headers.username,
		}).populate("coursePurchased");
		if (user) {
			res.json({ coursePurchased: user.coursePurchased || [] });
		} else {
			res.status(403).json({ message: "User not found" });
		}
	}
);

export default router;
