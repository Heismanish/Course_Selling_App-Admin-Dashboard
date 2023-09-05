import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage.tsx";
import Signup from "./Components/Signup.tsx";
import SignIn from "./Components/SignIn.tsx";
import Navbar from "./Components/Navbar.tsx";
import Courses from "./Components/Courses.tsx";
import Course from "./Components/Course.tsx";
import AddCourses from "./Components/AddCourses.tsx";
import { RecoilRoot } from "recoil";
import "./App.css";
import InitUser from "./Components/InitUser.tsx";

function App() {
	return (
		<RecoilRoot>
			<Router>
				<Navbar></Navbar>
				<InitUser />
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/SignUp" Component={Signup}></Route>
					<Route path="/SignIn" Component={SignIn}></Route>
					<Route path="/addcourse" Component={AddCourses}></Route>
					<Route path="/courses" Component={Courses}></Route>
					<Route path="/courses/:courseId" Component={Course}></Route>
					{/* <Signup></Signup> */}
				</Routes>
			</Router>
		</RecoilRoot>
	);
}

export default App;
