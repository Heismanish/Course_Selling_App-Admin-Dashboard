import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user";

function Navbar() {
	const userLoading = useRecoilValue(isUserLoading);
	const userEmail = useRecoilValue(userEmailState);
	const setUser = useSetRecoilState(userState);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.setItem("token", "");
		setUser({ isUserLoading: false, userEmail: null });
		navigate("/");
	};

	if (userLoading) {
		return <CircularProgress />;
	}

	return (
		<div className="flex justify-between px-4 py-3 bg-gray-900 shadow-sm shadow-slate-700 w-screen">
			<Link to="/">
				{" "}
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKVCtYxUWtU_FazjFTzJZbNdGZVcZkduRAVSD4e2jG&s"
					alt="icon"
					loading="lazy"
					className="w-8 md:hidden"
				/>
				<h1 className="text-3xl text-gray-200 font-semibold hidden md:block">
					Coursezod
				</h1>
			</Link>

			{userEmail ? (
				<div className="flex gap-4">
					{/* <p>{username}</p> */}
					<Button variant="outlined" onClick={() => navigate("/addcourse")}>
						Add Courses
					</Button>
					<Button variant="outlined" onClick={() => navigate("/courses")}>
						Courses
					</Button>
					<Button variant="contained" onClick={handleLogout}>
						Logout
					</Button>
				</div>
			) : (
				<div className="flex gap-4">
					<Button
						variant="contained"
						onClick={() => {
							navigate("/SignIn");
						}}
					>
						SignIn
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							navigate("/SignUp");
						}}
					>
						SignUp
					</Button>
				</div>
			)}
		</div>
	);
}

export default Navbar;
