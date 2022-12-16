import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarDays, faMap, faPaperPlane, faPhone} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const FooterStyle = styled.div`
    .footer-link-item:hover .footer-link{
        color: var(--primary-color)
    }

    .footer-link:hover{
        color: var(--primary-color);
    }
    @media screen and (max-width: 1024px){
        .footer-heading{
            padding: 40px 40px;
            flex-direction: column;
            gap: 12px 0px;
            align-items: flex-start;
        }
        .footer-heading-input-box{
            width: 100%;
        }
        .footer-container{
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            padding: 0 40px;
        }
    }

    @media screen and (max-width: 767px){
        .footer-container{
            grid-template-columns: repeat(2, 1fr);
            padding: 0 20px;
        }
        .footer-heading{
            padding: 20px 0px;
        }
    }

    @media screen and (max-width: 500px){
        .footer-container{
            grid-template-columns: repeat(1, 1fr);
            padding: 0 10px;
        }
    }

`

const Footer = () => {
    return (
        <FooterStyle>
            <div className='footer-heading bg-[var(--primary-color)] py-[48px] '>
                <div className='footer-heading flex justify-center items-center max-w-[1320px] mx-auto'>
                    <div className='px-[24px] mr-[40px]'>
                        <h2 className='text-[27px] text-white font-medium '>Newsletter - Stay tune and get the latest update</h2>
                        <p className='text-[16px] font-normal text-white'>Far far away, behind the word mountains</p>
                    </div>
                    <div className='footer-heading-input-box px-[24px] flex items-center  w-1/3'>
                        <input type="text" placeholder='Enter email address' className='footer-heading-input bg-transparent text-white text-[16px] p-0 border-t-0 border-l-0 border-r-0 placeholder:text-white h-[45px] w-full flex-1 border-b-white border-b-2'/>
                        <div className='border-b-2 border-b-white pt-[8px] pb-[11px]'>
                            <a href="">
                                <FontAwesomeIcon icon = {faPaperPlane} className='text-white'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-[80px] max-w-[1320px] mx-auto pb-[48px]'>
                <div className='footer-container grid grid-cols-5'>
                    <div className='px-[12px]'>
                        <div className='mb-[24px]'>
                            <h2 className='pb-[40px]'>
                                <NavLink to="/" className="text-[30px] font-extrabold text-[#111111]">
                                    ACADEMIA
                                </NavLink>
                                <span className='block text-[12px] font-medium text-[var(--primary-color)]'>ONLINE EDUCATION & LEARNING</span>
                            </h2>
                            <p className='text-[16px] font-normal text-[#999999] leading-[28.8px] mb-[16px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                            <div className='flex gap-x-3 mt-[8px] mb-[16px]'>
                                <div className='mb-[10px] w-[40px] h-[40px] rounded-full bg-[var(--primary-color)] flex justify-center items-center text-white'>
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </div>
                                <div className='mb-[10px] w-[40px] h-[40px] rounded-full bg-[var(--primary-color)] flex justify-center items-center text-white'>
                                    <FontAwesomeIcon icon={faFacebookF}/>
                                </div>
                                <div className='mb-[10px] w-[40px] h-[40px] rounded-full bg-[var(--primary-color)] flex justify-center items-center text-white'>
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-[12px]'>
                        <div>
                            <h2 className='text-[18px] font-medium text-[#111111] mb-[40px]'>Explore</h2>
                            <div>
                                <ul>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>About us</a>
                                    </li>

                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Services</a>
                                    </li>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Courses</a>
                                    </li>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Blog</a>
                                    </li>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Contact us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='px-[12px]'>
                        <div>
                            <h2 className='text-[18px] font-medium text-[#111111] mb-[40px]'>Quick Links</h2>
                            <div>
                                <ul>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Contact Us</a>
                                    </li>

                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Pricing</a>
                                    </li>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Terms & Conditions</a>
                                    </li>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Privacy</a>
                                    </li>
                                    <li className='footer-link-item flex gap-x-2 mb-[16px]'>
                                        <div>
                                            <FontAwesomeIcon icon={faArrowRight} className='text-[var(--primary-color)] text-[14px]'/>
                                        </div>
                                        <a href="" className='footer-link text-[16px] font-normal text-[#666666]'>Feedbacks</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='px-[12px]'>
                        <div>
                            <h2 className='text-[18px] font-medium text-[#111111] mb-[40px]'>Recent Posts</h2>
                            <div>
                                <div className='flex mb-[24px]'>
                                    <div className='w-[50px] h-[50px]'>
                                        <img src="https://preview.colorlib.com/theme/academia/images/image_1.jpg.webp" alt="" className='w-full h-full rounded-lg'/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <div className='text-[12px] font-normal text-[var(--primary-color)] mb-[5px]'>
                                            <FontAwesomeIcon icon={faCalendarDays}/>
                                            <span className='mr-[5px]'>Jan. 18, 2022</span>
                                            <FontAwesomeIcon icon={faUser}/>
                                            <span>Admin</span>
                                        </div>
                                        <a href="" className='text-[16px] font-normal leading-6 text-[#666] block w-[178px] footer-link'>Creativity and Inspiration</a>
                                    </div>
                                </div>
                                <div className='flex mb-[24px]'>
                                    <div className='w-[50px] h-[50px]'>
                                        <img src="https://preview.colorlib.com/theme/academia/images/image_2.jpg.webp" alt="" className='w-full h-full rounded-lg'/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <div className='text-[12px] font-normal text-[var(--primary-color)] mb-[5px]'>
                                            <FontAwesomeIcon icon={faCalendarDays}/>
                                            <span className='mr-[5px]'>Jan. 18, 2022</span>
                                            <FontAwesomeIcon icon={faUser}/>
                                            <span>Admin</span>
                                        </div>
                                        <a href="" className='text-[16px] font-normal leading-6 text-[#666] block w-[177px] footer-link'>Creativity and Inspiration</a>
                                    </div>
                                </div>
                                <div className='flex mb-[24px]'>
                                    <div className='w-[50px] h-[50px]'>
                                        <img src="https://preview.colorlib.com/theme/academia/images/image_3.jpg.webp" alt="" className='w-full h-full rounded-lg'/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <div className='text-[12px] font-normal text-[var(--primary-color)] mb-[5px]'>
                                            <FontAwesomeIcon icon={faCalendarDays}/>
                                            <span className='mr-[5px]'>Jan. 18, 2022</span>
                                            <FontAwesomeIcon icon={faUser}/>
                                            <span>Admin</span>
                                        </div>
                                        <a href="" className='text-[16px] font-normal leading-6 text-[#666] block w-[178px] footer-link'>Creativity and Inspiration</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-[12px]'>
                    <div>
                            <h2 className='text-[18px] font-medium text-[#111111] mb-[40px]'>Have a Questions?</h2>
                            <div>
                                <div className='flex mb-[15px]'>
                                    <div className='w-[40px] h-full mr-[20px]'>
                                        <FontAwesomeIcon icon={faMap} className='text-[var(--primary-color)]'/>
                                    </div>
                                    <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                                </div>
                                <div className='flex mb-[15px]'>
                                    <div className='w-[40px] h-full'>
                                        <FontAwesomeIcon icon={faPhone} className='text-[var(--primary-color)]'/>
                                    </div>
                                    <p>	+2 392 3929 210</p>
                                </div>
                                <div className='flex mb-[15px]'>
                                    <div className='w-[40px] h-full'>
                                        <FontAwesomeIcon icon={faPaperPlane} className='text-[var(--primary-color)]'/>
                                    </div>
                                    <p>	info@yourdomain.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center py-[48px] bg-[#E9E9E9]'>
                <p>Copyright ©2022 All rights reserved | This template is made with  by <a href="https://colorlib.com/wp/template/academia/" target="_blank" className='text-[var(--primary-color)]'>Colorlib</a></p>
            </div>
        </FooterStyle>
    );
};

export default Footer;