import { faCalendarDays, faChalkboardTeacher, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
const AboutTopStyle = styled.div`
  .about-benefit-item:hover{
    background-color: var(--primary-color);

  }

  .about-benefit-item:hover .about-benefit-info{
    color: white;
  }

  .about-bottom{
    background-image: url('https://preview.colorlib.com/theme/academia/images/bg_3.jpg.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  @media screen and (max-width: 1024px){
    .about-top{
      flex-direction: column;
    }
    .about-bottom-statistic{
      grid-template-columns: repeat(2, 1fr);
      padding: 0 40px;
    }
  }

  @media screen and (max-width: 500px){
    .about-bottom-statistic{
      grid-template-columns: repeat(1, 1fr);
      gap: 24px 0px;
    }
  }
`
const AboutTop = () => {
  return (
    <AboutTopStyle className='pb-[128px]'>
      <div className='about-top max-w-[1320px] mx-auto flex items-center'>
        <div className='px-[24px] w-[700px] flex-shrink-0'>
          <img src="https://preview.colorlib.com/theme/academia/images/about.jpg.webp" alt="" className=''/>
        </div>
        <div className='my-[48px] py-[48px] px-[24px]'>
          <div>
            <h1 className='text-[16px] font-bold text-[var(--primary-color)] mb-[5px]'>LEARN ANYTHING</h1>
            <h1 className='text-[46px] font-medium text-[#000000cc] mb-[8px]'>Benefits About Online Learning Expertise</h1>
          </div>
          <div>
            <div className='about-benefit-item flex items-center p-[25px] bg-white transition-all mt-[8px]'>
              <div className='w-[60px] h-[60px] flex-shrink-0'>
                <img src="/online-learning.png" alt="" className='w-full h-full'/>
              </div>
              <div className='pl-[20px]'>
                <h2 className='about-benefit-info text-[20px] font-medium mb-[15px] text-[#000000cc]'>Online Courses</h2>
                <p className='about-benefit-info text-[16px] font-normal text-[#999999] leading-[28.8px]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
            <div className='about-benefit-item flex items-center p-[25px] bg-white transition-all mt-[8px]'>
              <div className='w-[60px] h-[60px] flex-shrink-0'>
                <img src="/certified.png" alt="" className='w-full h-full'/>
              </div>
              <div className='pl-[20px]'>
                <h2 className='about-benefit-info text-[20px] font-medium mb-[15px] text-[#000000cc]'>Earn A Certificates</h2>
                <p className='about-benefit-info text-[16px] font-normal text-[#999999] leading-[28.8px]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
            <div className='about-benefit-item flex items-center p-[25px] bg-white transition-all mt-[8px]'>
              <div className='w-[60px] h-[60px] flex-shrink-0'>
                <img src="/scientist.png" alt="" className='w-full h-full'/>
              </div>
              <div className='pl-[20px]'>
                <h2 className='about-benefit-info text-[20px] font-medium mb-[15px] text-[#000000cc]'>Learn with Expert</h2>
                <p className='about-benefit-info text-[16px] font-normal text-[#999999] leading-[28.8px]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='about-bottom py-[96px]'>
        <div className='about-bottom-statistic grid grid-cols-4 max-w-[1320px] mx-auto'>
          <div className='flex items-center gap-4'>
            <div>
              <FontAwesomeIcon icon = {faGraduationCap} className='text-white text-[60px]'/>
            </div>
            <div>
              <h1 className='text-[40px] font-bold mb-[5px] text-white'>3000</h1>
              <p className='text-[16px] font-normal text-white'>SUCCESS STORIES</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <FontAwesomeIcon icon = {faChalkboardTeacher} className='text-white text-[60px]'/>
            </div>
            <div>
              <h1 className='text-[40px] font-bold mb-[5px] text-white'>320</h1>
              <p className='text-[16px] font-normal text-white'>TRUSTED TUTORS</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <FontAwesomeIcon icon = {faCalendarDays} className='text-white text-[60px]'/>
            </div>
            <div>
              <h1 className='text-[40px] font-bold mb-[5px] text-white'>1,000</h1>
              <p className='text-[16px] font-normal text-white'>SCHEDULES</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <FontAwesomeIcon icon = {faGraduationCap} className='text-white text-[60px]'/>
            </div>
            <div>
              <h1 className='text-[40px] font-bold mb-[5px] text-white'>587</h1>
              <p className='text-[16px] font-normal text-white'>COURSES</p>
            </div>
          </div>
        </div>
      </div>
    </AboutTopStyle>
  );
};

export default AboutTop;
