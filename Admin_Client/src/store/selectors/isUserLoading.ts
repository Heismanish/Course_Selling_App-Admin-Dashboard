import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLoading = selector({
	key: "isUserloading", // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const state = get(userState);

		return state.isUserLoading;
	},
});
