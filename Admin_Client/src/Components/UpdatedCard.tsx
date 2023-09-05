import CardMedia from "@mui/material/CardMedia";
import { useRecoilValue } from "recoil";
import {
	courseDesc,
	// courseDetails,
	courseImage,
	coursePrice,
	courseTitle,
} from "../store/selectors/course";

function UpdatedCard() {
	const title = useRecoilValue(courseTitle);
	const image = useRecoilValue(courseImage);
	const description = useRecoilValue(courseDesc);
	// const course = useRecoilValue(courseDetails);

	return (
		<>
			<div className="max-w-xs  bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700  -mt-16 lg:-mt-48">
				<CardMedia
					component="img"
					alt="green iguana"
					height="90"
					image={image}
					className="rounded-t-2xl"
				/>

				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{title}
					</h5>

					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{description}
					</p>

					<Price />
				</div>
			</div>
		</>
	);
}

export default UpdatedCard;

function Price() {
	const price = useRecoilValue(coursePrice);

	return (
		<>
			<p className="mb-1 font-semibold text-gray-700 dark:text-gray-400">
				Price
			</p>
			<p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Rs {price}
			</p>
		</>
	);
}
