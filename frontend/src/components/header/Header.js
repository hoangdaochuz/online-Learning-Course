import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faDribbble,
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import styled from "styled-components";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const StyledHeader = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .header-contact-wrapper {
      padding: 20px 0px;
      grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  .header-contact-content{
    padding-left: 10px;
  }
  .header-contact-social-item:hover{
    background-color: var(--primary-color);
    color: #fff;
  }
  .header-logo:hover{
    cursor: pointer;

  }
  .header-logo:hover .header-l0go-link{
    color: var(--primary-color);
  }
  @media screen and (max-width: 1024px){
    padding: 0 40px;
  }

  @media screen and (max-width: 768px){
    .header-contact{
        display: none;
    }
    .header-contact-wrapper{
        display: flex;
        justify-content: space-between;
    }
  }

  @media screen and (max-width: 500px){
    .header-contact-social{
        display: none;
    }
  }
`;

const Header = () => {
  const handleShowSideBar = ()=>{
    const sidebarContainer = document.querySelector('.sidebar-wrapper')
    sidebarContainer.classList.add("showSideBar")
    
  }

  const handleCloseSidebar = ()=>{
    console.log('close sidebar')
    const sidebarContainer = document.querySelector('.sidebar-wrapper')
    sidebarContainer.classList.remove("showSideBar")
  }

  return (
    <StyledHeader className="container wrapper">
      <div className="header-contact-wrapper grid">
        <div className="header-logo text-white">
          <h1 className="text-3xl font-extrabold">
            <NavLink to="/" className="header-l0go-link">
              ACADEMIA
            </NavLink>
          </h1>
          <p className="text-xs font-medium">ONLINE EDUCATION & LEARNING</p>
        </div>

        <div className="header-contact flex justify-start items-center text-white">
          <div className="header-contact-icon flex-shrink-0">
            <FontAwesomeIcon icon={faClock} className="w-[38px] h-[38px]" />
          </div>
          <div className="header-contact-content">
            <p className="">Monday - Friday</p>
            <p className="font-bold">8:00AM-8:00PM</p>
          </div>
        </div>
        <div className="header-contact flex justify-start items-center text-white">
          <div className="header-contact-icon flex-shrink-0">
            <FontAwesomeIcon icon={faPhone} className="w-[38px] h-[38px]" />
          </div>
          <div className="header-contact-content">
            <p className="">Call Us</p>
            <p className="font-bold">+2 392 3929 210</p>
          </div>
        </div>

        <div className="header-contact-social flex justify-end gap-2 items-center">
          <div className="header-contact-social-item w-10 h-10 rounded-full bg-[#c9c9c933] flex items-center justify-center text-[var(--primary-color)]">
            <a href="https://www.facebook.com/nguyeen.huu.khai" target="_blank">
                <FontAwesomeIcon icon={faFacebookF} />
            </a>
            
          </div>
          <div className="header-contact-social-item w-10 h-10 rounded-full bg-[#c9c9c933] flex items-center justify-center text-[var(--primary-color)]">
            <a href="https://www.facebook.com/nguyeen.huu.khai" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div className="header-contact-social-item w-10 h-10 rounded-full bg-[#c9c9c933] flex items-center justify-center text-[var(--primary-color)]">
            <a href="https://www.facebook.com/nguyeen.huu.khai" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <div className="header-contact-social-item w-10 h-10 rounded-full bg-[#c9c9c933] flex items-center justify-center text-[var(--primary-color)]">
            <a href="https://www.facebook.com/nguyeen.huu.khai" target="_blank">
                <FontAwesomeIcon icon={faDribbble} />
            </a>
          </div>
        </div>
      </div>
      <NavBar onClick={handleShowSideBar}/>
      <SideBar onClick={handleCloseSidebar}/>
    </StyledHeader>
  );
};

export default Header;
