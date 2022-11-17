
import './App.css';
import { GlobalStyles } from './GlobalStyles';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Course from './components/pages/Course';
import About from './components/pages/About';
import Team from './components/pages/Team';
import Journal from './components/pages/Journal';
import Contact from './components/pages/Contact';

import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Hero from './components/hero/Hero';

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  
  return (
    
    <div>
      <GlobalStyles/>
      <Header/>
      <Hero/>
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/courses' element={<Course/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/team' element={<Team/>}></Route>
          <Route path='/journal' element={<Journal/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<SignIn/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
