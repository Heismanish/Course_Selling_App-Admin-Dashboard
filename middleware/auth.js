const jwt = require("jsonwebtoken");

// Authentication:
const adminSecret = "Naruto";
const userSecret = "Sasuke";

function adminTokenGenerator(username) {
	return jwt.sign({ username, role: "admin" }, adminSecret, {
		expiresIn: "2h",
	});
}
function userTokenGenerator(username) {
	return jwt.sign({ username, role: "user" }, userSecret, { expiresIn: "2h" });
}

function jwtAdminAuthentication(req, res, next) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, adminSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			} else {
				req.user = user;
				next();
			}
		});
	} else {
		res.sendStatus(401);
	}
}

function jwtUserAuthentication(req, res, next) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, userSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			} else {
				req.user = user;

				next();
			}
		});
	} else {
		res.sendStatus(401);
	}
}

module.exports = {
	jwtAdminAuthentication,
	jwtUserAuthentication,
	adminTokenGenerator,
	userTokenGenerator,
	adminSecret,
	userSecret,
};
