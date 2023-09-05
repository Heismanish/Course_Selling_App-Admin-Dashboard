import { atom } from "recoil";
// atom is like state... change in an atom triggers a rerender.
// userState is like useState.
interface userState {
	isUserLoading: boolean;
	userEmail: string | null;
}

export const userState = atom<userState>({
	key: "userState",
	default: { isUserLoading: true, userEmail: null },
});
