import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../common/Button";
import HeroImage from './image/hero-image.png'
import styled from "styled-components";
import {NavLink, useLocation} from 'react-router-dom'
const StyledHero = styled.div`
  background-image: url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  height: 95vh;
  min-height: 100%;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  /* background-attachment: fixed; */
  z-index: 0;

  .hero-container {
    max-width: 1320px;
    margin: 0 auto;
  }
  .hero-info-wrapper {
    max-width: 526px;
    position: absolute;
    top: 40%;
    z-index: 0;
  }
  .hero-pre-title {
    line-height: 25px;
    color: rgba(255, 255, 255, 0.7);
  }
  .hero-title {
    font-size: 40px;
    font-weight: 600;
    line-height: 48px;
  }
  .hero-desc {
    font-size: 16px;
    font-weight: 400;
    line-height: 28.8px;
    color: rgba(255, 255, 255, 0.8);
  }
  .hero-btn {
    transform: translateY(0);
    transition: all 0.5s linear;
  }
  .hero-btn:hover {
    transform: translateY(-5px);
  }

  .back-home-control:hover{
    color: var(--primary-color);
  }

  @media screen and (max-width: 1024px) {
    .hero-info-wrapper {
      max-width: unset;
      padding-left: 40px;
      padding-right: 40px;
      z-index: 0;
    }
  }
  @media screen and (max-width: 850px) {
    .hero-pre-title {
      font-size: 14px;
    }
    .hero-title {
      font-size: 34px;
    }
    .hero-desc {
      font-size: 16px;
    }
    .hero-control {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .hero-pre-title {
      font-size: 12px;
    }
    .hero-title {
      font-size: 24px;
    }
    .hero-desc {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 500px) {
    .hero-control {
      display: grid;
      grid-template-columns: 1fr;
    }
    .hero-btn {
      margin-bottom: 12px;
      width: 100%;
    }
  }

  @media screen and (max-width: 400px) {
    .hero-pre-title {
      font-size: 12px;
    }
    .hero-title {
      font-size: 24px;
    }
    .hero-desc {
      font-size: 14px;
    }
    .hero-control {
      display: none;
    }
  }
  @media screen and (max-height: 375px) {
    .hero-control {
      display: none;
    }
  }
`;
const Hero = () => {
  const {pathname} = useLocation();
  console.log(pathname);
  return (
    <StyledHero>
        {pathname==='/'? (
      <div className="hero-container">
          <div className="hero-info-wrapper">
          <div className="hero-info">
            <h2 className="hero-pre-title text-sm font-bold mb-[5px]">
              WELCOME TO ACADEMIA
            </h2>
            <h1 className="hero-title mb-[24px] text-white">
              Best Online Education Expertise
            </h1>
            <p className="hero-desc mb-[24px] ">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
          </div>
          <div className="hero-control flex gap-x-3">
            <Button
              className="hero-btn"
              primary={true}
              RightIcon={<FontAwesomeIcon icon={faRightLong} />}
            >
              GET STARTED NOW!
            </Button>
            <Button
              className="hero-btn"
              btnBgWhite={true}
              to="/courses"
              RightIcon={<FontAwesomeIcon icon={faRightLong} />}
            >
              VIEW COURSE
            </Button>
          </div>
        </div>
      </div>
        ): (
            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
              <div className="translate-x-1/4">
                <NavLink to='/' className="text-sm text-[#ffffffcc] font-semibold uppercase text-center back-home-control">Home &gt;</NavLink>
                <span className="text-sm text-[#ffffffcc] font-semibold uppercase text-center"> {pathname.includes('mycourse')? 'details' : pathname.replace('/','')} &gt;</span>
              </div>
              <h1 className="text-center my-auto text-[70px] text-white capitalize">{pathname.includes('mycourse')? 'details' : pathname.replace('/','')}</h1>
            </div>
        )}
        
    </StyledHero>
  );
};

export default Hero;
