import { atom } from "recoil";

export interface Course {
	title: string;
	description: string;
	price: number | null;
	imageLink: string;
	published: boolean;
	_id: string;
}

interface CourseState {
	course: Course | null;
	isLoading: boolean;
}

export const courseState = atom<CourseState>({
	key: "courseState",
	default: { isLoading: true, course: null },
});
