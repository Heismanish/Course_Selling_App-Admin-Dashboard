import { useState } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

interface formShape {
	title: string;
	description: string;
	price: number | null;
	imageLink: string;
	published: boolean;
}

function AddCourses() {
	const [formData, setFormData] = useState<formShape>({
		title: "",
		description: "",
		price: null,
		imageLink: "",
		published: true,
	});

	const [courseCreated, setCourseCreated] = useState<boolean>(false);
	// const [courseId, setCourseId] = useState("");

	const { published } = formData;
	const handlePublishedToggle = () => {
		setFormData({ ...formData, published: !published });
	};

	async function handleCourseCreation() {
		// console.log(formData);
		const { title, description } = formData;

		if (!title || !description) {
			alert("Please enter both an email and description.");
			return;
		}

		const response = await fetch("http://localhost:3000/admin/courses", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ` + localStorage.getItem("token"),
			},
			body: JSON.stringify({ ...formData }),
		});

		// const data = await response.json();
		// setCourseId(data.courseId);

		if (response.status === 200) {
			setCourseCreated(!courseCreated);
			setFormData({
				title: "",
				description: "",
				price: null,
				imageLink: "",
				published: true,
			});
		} else {
			alert("error aagya bhai");
		}
	}

	return (
		<div className="mx-auto  ">
			<main className="flex flex-col justify-center items-center mt-44">
				<div>
					<h2 className="text-4xl font-semibold mb-6 text-gray-200">
						Add Course{" "}
					</h2>
				</div>
				<Card
					variant="outlined"
					className="flex flex-col mx-auto gap-4 p-6 w-96 mt-4"
				>
					<TextField
						id="outlined-basic"
						label="Title"
						variant="outlined"
						type="text"
						required
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<TextField
						id="outlined-basic"
						label="Image Link"
						variant="outlined"
						type="text"
						required
						onChange={(e) =>
							setFormData({ ...formData, imageLink: e.target.value })
						}
					/>
					<TextField
						id="outlined-basic"
						label="Price (₹)"
						variant="outlined"
						type="text"
						required
						onChange={(e) =>
							setFormData({ ...formData, price: parseInt(e.target.value) })
						}
					/>
					<TextField
						id="outlined-multiline-static"
						multiline
						rows={4}
						required
						label="Description"
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
					/>
					<div>
						<Checkbox onChange={handlePublishedToggle} defaultChecked />{" "}
						<span>Published</span>
					</div>

					<Button variant="contained" onClick={handleCourseCreation}>
						Create Course
					</Button>
				</Card>
			</main>

			{courseCreated ? (
				<p className="text-green-600 font-medium text-xl text-center mt-2">
					Course created Successfully!!{" "}
				</p>
			) : (
				""
			)}
		</div>
	);
}

export default AddCourses;
