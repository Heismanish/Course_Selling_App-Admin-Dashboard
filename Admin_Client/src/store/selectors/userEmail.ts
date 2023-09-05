import { userState } from "../atoms/user";
import { selector } from "recoil";

export const userEmailState = selector({
	key: "userEmailState", // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const state = get(userState);

		return state.userEmail;
	},
});
