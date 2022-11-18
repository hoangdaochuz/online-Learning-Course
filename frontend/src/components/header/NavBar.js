import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

import styled from "styled-components";
import Button from "../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const StyledNavbarWrapper = styled.div`
  display: flex;
  background-color: #fafafa1f;
  border-radius: 4px;
  .navbar-menu-item.active {
    color: #1eb2a6;
  }

  .navbar-menu-item {
    font-size: 15px;
    font-weight: 500;
    display: inline-block;
    padding: 25px;
    position: relative;
  }

  .navbar-menu-item::after {
    content: "";
    position: absolute;
    width: 0%;
    height: 5px;
    background-color: var(--primary-color);
    bottom: 15px;
    left: auto;
    right: 0;
    transition: all 0.5s ease;
  }

  .navbar-menu-item:hover.navbar-menu-item::after {
    width: 100%;
    left: 0;
    right: auto;
  }

  .control-btn {
    padding: 10px 20px;
    transform: translateY(0);
    transition: all 0.5s ease;
  }
  .control-btn:hover {
    transform: translateY(-5px);
    box-shadow: 2px 2px 3px 2px #ccc;
  }
  .input-box {
    border-radius: 20px;
    padding: 5px 30px;
    margin-right: 20px;
  }
  .search-icon {
    width: 20px;
    height: 20px;
  }

  @media screen and (max-width: 1024px) {
    .navbar-menu-item {
      padding: 10px;
    }
    .navbar-menu-item::after {
      bottom: 0px;
    }
    .control-btn {
      padding: 5px 10px;
    }
  }

  @media screen and (max-width: 900px) {
    .btn-wrapper {
      display: none;
    }
    .navbar-controls {
      margin-right: 0;
    }
    .navbar-search-box {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 812px) {
    .navbar-menu {
      display: none;
    }
    .menu-responsive {
      display: block;
    }
  }

  @media screen and (max-width: 600px) {
    .btn-wrapper {
      display: none;
    }
    .navbar-controls {
      margin-right: 0;
    }
    .navbar-search-box {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;

    .menu-responsive {
      margin-bottom: 12px;
      align-self: flex-start;
    }
  }
`;

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`navbar-menu-item ${isActive ? "active" : ""}`}>
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    </li>
  );
};

const NavBar = ({ onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = ()=>{
    console.log(1)
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <StyledNavbarWrapper className="navbar-wrapper flex justify-between items-center">
      <div className="navbar-menu">
        <ul className="navbar-menu-list flex text-white">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/courses">Courses</CustomLink>
          <CustomLink to="/about">About</CustomLink>
          <CustomLink to="/contact">Contact</CustomLink>
          <CustomLink to="/journal">Journal</CustomLink>
          <CustomLink to="/team">Team</CustomLink>
          <CustomLink to="/teachers">Teachers</CustomLink>
        </ul>
      </div>
      <div
        onClick={onClick}
        className="menu-responsive text-xl cursor-pointer hidden text-white pl-3"
      >
        <span className="mr-2">MENU </span>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="navbar-controls flex items-center justify-end gap-x-4 mr-5">
        <div className="navbar-search-box flex items-center mr-10">
          <input
            className="input-box"
            type="text"
            placeholder="Enter course what you want..."
          />
          <FontAwesomeIcon
            className="search-icon cursor-pointer text-white pr-2"
            icon={faSearch}
          />
        </div>

        {user ? (

          // Sau sẽ làm chỗ này thành 1 cái avatar. Khi hover vào nó sẽ hiển thị ra 1 cái box và có tùy chọn log out
          <Button className="control-btn" primary={true} onClick={onLogout}>
            LOG OUT
          </Button>
        ) : (
          <>
            <Button to="/login" className="control-btn" primary={true}>
              SIGN IN
            </Button>
            <Button to="/signup" className="control-btn" outline={true}>
              SIGN UP
            </Button>
          </>
        )}
      </div>
    </StyledNavbarWrapper>
  );
};

export default NavBar;
