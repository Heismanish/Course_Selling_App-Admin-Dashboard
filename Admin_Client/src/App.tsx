import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage.tsx";
import Signup from "./Components/Signup.tsx";
import SignIn from "./Components/SignIn.tsx";
import Navbar from "./Components/Navbar.tsx";
import Courses from "./Components/Courses.tsx";
import Course from "./Components/Course.tsx";
import AddCourses from "./Components/AddCourses.tsx";
import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import InitUser from "./Components/InitUser.tsx";
import { userEmailState } from "./store/selectors/userEmail.ts";


function App() {
	const userEmail = useRecoilValue(userEmailState);
	console.log(userEmail);
	return (
			<Router>
				<Navbar></Navbar>
				<InitUser />
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/SignUp" Component={Signup}></Route>
					<Route path="/SignIn" Component={SignIn}></Route>
					<Route path="/addcourse" Component={userEmail?AddCourses:HomePage}></Route>
					<Route path="/courses" Component={userEmail?Courses:HomePage}></Route>
					<Route path="/courses/:courseId" Component={userEmail?Course:HomePage}></Route>
				</Routes>
			</Router>
	);
}

export default App;
