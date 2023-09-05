import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";

function UpdateForm() {
	const [courseDetails, setCourse] = useRecoilState(courseState);

	const course = courseDetails.course || {
		title: "",
		description: "",
		price: null,
		imageLink: "",
		published: true,
		_id: "",
	};

	const [title, setTitle] = useState(course.title);
	const [description, setDescription] = useState(course.description);
	const [imageLink, setImageLink] = useState(course.imageLink);
	const [price, setPrice] = useState(course.price);
	const [published, setPublished] = useState(course.published);

	useEffect(() => {
		setTitle(course.title);
		setDescription(course.description);
		setImageLink(course.imageLink);
		setPrice(course.price);
		setPublished(course.published);
	}, [courseDetails]);

	const handlePublishedToggle = () => {
		setPublished(!published);
	};

	const handleCourseUpdation = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/admin/courses/${course._id}`,
				{
					method: "PUT",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						_id: course._id,
						title,
						description,
						imageLink,
						price,
						published,
					}),
				}
			);

			// const data = await response.json();

			if (response.status === 200) {
				const updatedCourse = {
					_id: course._id,
					title,
					description,
					imageLink,
					price,
					published,
				};
				setCourse({ isLoading: false, course: updatedCourse });
				// console.log(data.message);
			} else {
				console.log(response);
			}
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return (
		<div>
			<main>
				<Card
					variant="outlined"
					className="flex flex-col gap-8  lg:-mt-6  lg:w-[560px]   p-6"
				>
					<h2 className="text-4xl font-semibold mb-6 text-gray-700">
						Update Course Details
					</h2>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Title"
						variant="outlined"
						type="text"
						required
						value={title}
						onChange={(e) => {
							console.log(title);
							setTitle(e.target.value);
						}}
						fullWidth={true}
					/>{" "}
					<TextField
						InputLabelProps={{ shrink: true }}
						// id="outlined-controlled"
						label="Image"
						variant="outlined"
						type="text"
						required
						value={imageLink}
						fullWidth={true}
						onChange={(e) => setImageLink(e.target.value)}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						// id="outlined-controlled"
						label="Price"
						variant="outlined"
						type="text"
						required
						value={price}
						fullWidth={true}
						onChange={(e) => setPrice(parseInt(e.target.value))}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Description"
						variant="outlined"
						type="text"
						required
						value={description}
						fullWidth={true}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div>
						<Checkbox onChange={handlePublishedToggle} checked={published} />{" "}
						<span>Published</span>
					</div>
					<button
						type="button"
						onClick={handleCourseUpdation}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Update Course
					</button>
				</Card>
			</main>
		</div>
	);
}

export default UpdateForm;
