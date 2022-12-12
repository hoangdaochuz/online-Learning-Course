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
import Me from "./components/pages/me/Me";
import Lessons from "./components/pages/lesson/Lessons";
import ManageTeaching from "./components/pages/ManageTeaching/ManageTeaching";
import TeacherManageDetailCourse from "./components/pages/ManageTeaching/TeacherManageDetailCourse";
import Footer from "./components/common/footer/Footer";
import DetailCourse from "./components/pages/courses/DetailCourse";
import Cart from "./components/cart/Cart";
import Checkout from "./components/pages/checkout/Checkout";

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
            <Route path="/courses/:id" element={<DetailCourse />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/journal" element={<Journal />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/teachers" element={<Teacher />}></Route>
            <Route path="/me" element={<Me />}></Route>
            <Route path="/lessons" element={<Lessons/>}></Route>
            <Route path="/manage-teaching" element={<ManageTeaching/>}></Route>
            <Route path="/manage-teaching/mycourse/:id" element={<TeacherManageDetailCourse />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
