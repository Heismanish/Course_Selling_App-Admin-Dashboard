import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail.ts";

function HomePage() {
	const navigate = useNavigate();
	const userEmail = useRecoilValue(userEmailState);

	return (
		<div className=" grid mt-12 md:mt-44 grid-cols-1 md:grid-cols-2 md:gap-x-24 lg:gap-x-64 mx-8 md:mx-12 lg:mx-auto lg:px-8 max-w-screen-xl     ">
			<main className=" my-auto flex flex-col gap-4">
				<h1 className="text-5xl drop-shadow-lg shadow-white font-bold mb-2 text-gray-50">
					Welcome to Coursezod
				</h1>
				<p className="font-semibold text-gray-200 drop-shadow-md shadow-white   mb-4">
					Your gateway to a world of learning and growth. Our mission is to
					empower individuals with knowledge and skills that pave the way for
					success. Whether you're a curious beginner or an experienced
					professional, Coursezod offers a diverse range of courses tailored to
					your interests and goals.
				</p>
				{userEmail ? (
					<div className="flex gap-2">
						<Button variant="contained" onClick={() => navigate("/courses")}>
							Courses
						</Button>
						<Button variant="outlined" onClick={() => navigate("/addcourse")}>
							Add Courses
						</Button>
					</div>
				) : (
					<div className="flex gap-2">
						<Button variant="contained" onClick={() => navigate("/signin")}>
							SignIn
						</Button>
						<Button variant="outlined" onClick={() => navigate("/signup")}>
							Signup
						</Button>
					</div>
				)}
			</main>
			<div>
				<img
					className="w-full"
					loading="lazy"
					src="https://octodex.github.com/images/Professortocat_v2.png"
					alt="Landing Page"
				/>
			</div>
		</div>
	);
}

export default HomePage;
