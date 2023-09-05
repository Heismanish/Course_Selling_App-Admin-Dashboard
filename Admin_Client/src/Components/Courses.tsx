import { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { Course } from "../store/atoms/course.ts";

function Courses() {
	const [courseData, setCourseData] = useState<Course[]>([]);
	const navigate = useNavigate();

	const handleUpdate = (courseId: string) => {
		navigate(`/courses/${courseId}`);
	};

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch("http://localhost:3000/admin/courses", {
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ` + localStorage.getItem("token"),
					},
				});
				const data = await response.json();
				const courses = data.courses;
				setCourseData(courses);
			} catch (error) {
				console.error("Error fetching course data:", error);
			}
		};

		fetchCourseData();
	}, []);

	return (
		<div>
			<h1 className=" bg-gray-800 h-44 flex justify-center items-center top-0 text-center text-4xl text-gray-100 font-bold">
				Courses
			</h1>
			<main className="flex flex-wrap justify-center gap-8 flex-grow -mt-8">
				{courseData.map((t) => (
					<div
						key={t._id}
						className="max-w-xs  bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 "
					>
						<CardMedia
							component="img"
							alt={t.title}
							height="90"
							image={t.imageLink}
							className="rounded-t-2xl"
						/>

						<div className="p-5">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{t.title}
							</h5>

							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{t.description}
							</p>
						</div>
						<button
							type="button"
							onClick={() => {
								handleUpdate(t._id);
							}}
							className="text-white bg-blue-700 ml-4 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Update{" "}
						</button>
					</div>
				))}
			</main>
		</div>
	);
}

export default Courses;
