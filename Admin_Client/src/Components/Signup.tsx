import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

export interface FormShape {
	username: string;
	password: string;
}

function Signup() {
	const [formData, setFormData] = useState<FormShape>({
		username: "",
		password: "",
	});
	const [existingUser, setExistingUser] = useState<boolean>(false);
	const setUser = useSetRecoilState(userState);

	const navigate = useNavigate();

	async function handleSignUp() {
		const { username, password } = formData;

		if (!username || !password) {
			alert("Please enter both an email and password.");
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/admin/signup", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (response.status === 200) {
				setUser({ isUserLoading: false, userEmail: username });
				navigate("/");
			} else {
				setExistingUser(!existingUser);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="mx-auto  ">
			<main className="flex flex-col justify-center items-center mt-44">
				<div>
					<h2 className="text-4xl text-gray-200 font-semibold mb-6">
						Welcome to CourseVilla
					</h2>
					<h1 className="text-3xl text-gray-200 font-medium text-center">
						Sign up{" "}
					</h1>
				</div>
				<Card
					variant="outlined"
					className="flex flex-col mx-auto gap-8 p-6 w-96 mt-4"
				>
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						type="email"
						required
						onChange={(e) =>
							setFormData({ ...formData, username: e.target.value })
						}
					/>
					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						type="password"
						required
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
					/>
					<Button variant="contained" onClick={handleSignUp}>
						SignUp
					</Button>
				</Card>
				{existingUser && (
					<>
						<p className="text-red-400 font-medium text-xl text-center mt-2 uppercase mb-4">
							User already exists
						</p>

						<Button variant="outlined">
							<Link to="/signin">Try Signing In</Link>
						</Button>
					</>
				)}
			</main>
		</div>
	);
}

export default Signup;
