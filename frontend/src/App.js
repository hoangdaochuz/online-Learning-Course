import "./App.css";
import { GlobalStyles } from "./GlobalStyles";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Course from "./components/pages/courses/Course";
import About from "./components/pages/about/About";
import Team from "./components/pages/team/Team";
import Journal from "./components/pages/journal/Journal";
import Contact from "./components/pages/contact/Contact";

import SignIn from "./components/pages/signin/SignIn";
import SignUp from "./components/pages/signup/SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import Teacher from "./components/pages/teacher/Teacher";

function App() {
  return (
    <div>
      <GlobalStyles />
      {/* <Header/>
      <Hero/> */}
      <div className="wrapper">
        <Routes>
          <Route element={<Layout hideheaderPaths={["/login", "/signup"]} />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/courses" element={<Course />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/journal" element={<Journal />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/teachers" element={<Teacher />}></Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
