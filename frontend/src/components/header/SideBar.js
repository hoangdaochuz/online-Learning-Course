
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout, reset} from '../../features/auth/authSlice'
const StyledSideBar = styled.div`
    transform: translateX(-100%);
    transition: all 0.5s linear;
    .sidebar-menu-item{
        padding: 10px 25px;
        color: #fff;
    }
    .sidebar-close-icon{
        font-size: 40px;
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        color: #fff;
    }
`

const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
    return (
      <li className={`sidebar-menu-item ${isActive ? "active" : ""}`}>
        <NavLink to={to} {...props}>
          {children}
        </NavLink>
      </li>
    );
  };


const SideBar = ({onClick}) => {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onLogout = ()=>{
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }
    return (
        <StyledSideBar className="sidebar-wrapper bg-[#1eb2a6] fixed z-[1] top-0 bottom-0 left-0 w-[150px] ">
          <div onClick={onClick}>
              <FontAwesomeIcon className='sidebar-close-icon' icon={faXmark}/>
          </div>
          <div className="sidebar-menu pt-[50px]">
            <ul className="sidebar-menu-list flex  flex-col">
              <CustomLink to="/">Home</CustomLink>
              <CustomLink to="/courses">All Courses</CustomLink>
              <CustomLink to="/about">About</CustomLink>
              <CustomLink to="/contact">Contact</CustomLink>
              <CustomLink to="/journal">Journal</CustomLink>
              <CustomLink to="/team">Team</CustomLink>
              <CustomLink to="/teachers">Teachers</CustomLink>
              {user?(
                <>

                <CustomLink to='/me'>Quản lý tài khoản</CustomLink>
                <CustomLink  >Quản lý học tập</CustomLink>
                <CustomLink onClick={onLogout} >Log out</CustomLink>
                </>
              ):(
                <>
                <CustomLink to="/login">Sign in</CustomLink>
                <CustomLink to="/signup">Sign up</CustomLink>
                </>
              )}

              
            </ul>
          </div>
        </StyledSideBar>
      );
};

export default SideBar;