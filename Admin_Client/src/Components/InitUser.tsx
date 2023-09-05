import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

//  This component's only purpose is to inform if the user is logged in or not and set a boolean value in an atom.
function InitUser() {
	// setUser is a function
	const setUser = useSetRecoilState(userState);
	const getLoginInfo = async () => {
		try {
			const response = await fetch("http://localhost:3000/admin/me", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ` + localStorage.getItem("token"),
				},
			});
			const data = await response.json();
			if (data.username) {
				setUser({ isUserLoading: false, userEmail: data.username });
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				setUser({ isUserLoading: false, userEmail: null });
			}
		}
	};

	useEffect(() => {
		getLoginInfo();
	}, []);

	return <></>;
}

export default InitUser;
