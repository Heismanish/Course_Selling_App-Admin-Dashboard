import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { FormShape } from "./Signup";

function SignIn() {
	const [formData, setFormData] = useState<FormShape>({
		username: "",
		password: "",
	});
	const [adminNotFound, setAdminNotFound] = useState(false);
	const setUser = useSetRecoilState(userState);
	const navigate = useNavigate();

	async function handleSignIn() {
		const { username, password } = formData;

		if (!username || !password) {
			alert("Please enter both an email and password.");
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/admin/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
					username,
					password,
				},
			});

			const data = await response.json();
			const token: string = data.token;
			localStorage.setItem("token", token);
			if (response.ok) {
				setUser({ isUserLoading: false, userEmail: username });
				navigate("/");
			} else {
				setAdminNotFound(!adminNotFound);
				console.log(data.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
		// window.location = "/";
	}

	return (
		<div className="mx-auto  ">
			<main className="flex flex-col justify-center items-center mt-44">
				<div>
					<h2 className="text-4xl text-gray-200 font-semibold mb-6">
						Welcome Back
					</h2>
					<h1 className="text-3xl  text-gray-200 font-medium text-center">
						SignIn below...{" "}
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
					<Button variant="contained" onClick={handleSignIn}>
						SignIn
					</Button>
				</Card>

				{adminNotFound && (
					<p className="text-red-200 font-medium text-xl text-center mt-2 uppercase">
						Admin not found
					</p>
				)}
			</main>
		</div>
	);
}

export default SignIn;
