import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// interface CustomRequest extends Request {
// 	headers: {
// 		authorization?: string;
// 	};
// }

// Authentication:
export const adminSecret = "Naruto";
export const userSecret = "Sasuke";

export function adminTokenGenerator(username: any) {
	return jwt.sign({ username, role: "admin" }, adminSecret, {
		expiresIn: "2h",
	});
}
export function userTokenGenerator(username: any) {
	return jwt.sign({ username, role: "user" }, userSecret, { expiresIn: "2h" });
}

export function jwtAdminAuthentication(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, adminSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			if (!user) {
				return res.sendStatus(403);
			}
			if (typeof user === "string") {
				return res.sendStatus(403);
			}
			req.headers.user = user.id;
			next();
		});
	} else {
		res.sendStatus(401);
	}
}

export function jwtUserAuthentication(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, userSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			if (typeof user === "string") {
				return res.sendStatus(403);
			}
			if (user) {
				req.headers.user = user.id;
				next();
			}
		});
	} else {
		res.sendStatus(401);
	}
}

// export default {
// 	jwtAdminAuthentication,
// 	jwtUserAuthentication,
// 	adminTokenGenerator,
// 	userTokenGenerator,
// 	adminSecret,
// 	userSecret,
// };
