import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateForm from "./UpdateForm.tsx";
import UpdatedCard from "./UpdatedCard.tsx";
import { CircularProgress } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import { courseTitle, isCourseLoading } from "../store/selectors/course";

function Course() {
	const { courseId } = useParams();

	const setCourse = useSetRecoilState(courseState);
	const isLoading = useRecoilValue(isCourseLoading);
	const title = useRecoilValue(courseTitle);

	async function getCourses() {
		try {
			const response = await fetch(
				`http://localhost:3000/admin/courses/${courseId}`,
				{
					method: "GET",
					headers: {
						"content-type": "application/json",
						authorization: `Bearer ` + localStorage.getItem("token"),
					},
				}
			);

			const data = await response.json();

			const courses = data.course;

			if (courses) {
				setCourse({ isLoading: false, course: { ...courses } });
			} else {
				console.log("not found");
			}
		} catch (error) {
			setCourse({ isLoading: false, course: null });
			if (error instanceof Error) {
				// Now TypeScript knows 'error' is of type 'Error'
				console.error(error.message);
			}
		}
	}

	useEffect(() => {
		getCourses();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center mt-32">
				<CircularProgress />;
			</div>
		);
	}

	return (
		<>
			<header className="bg-gray-800 text-gray-200 justify-center flex items-center text-4xl font-semibold h-52  top-0">
				{title}
			</header>
			<main className="flex  flex-col-reverse lg:flex-row items-center  lg:justify-around gap-24 lg:gap-12 flex-auto mx-auto mb-8">
				<UpdateForm />
				<UpdatedCard />
			</main>
		</>
	);
}

export default Course;
