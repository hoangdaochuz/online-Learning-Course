import React from 'react';
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";

const Testimonial = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div className='max-w-[1320px] mx-auto pb-[128px]'>
      <div className='text-center pb-[24px]'>
        <h2 className='text-[16px] font-bold text-[var(--primary-color)] mb-[5px]'>TESTIMONIAL</h2>
        <h1 className='text-[46px] font-medium text-[#000000cc] mb-[48px]'>Our Successful Students</h1>
      </div>
      <Carousel  
        responsive={responsive}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
      >
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
        <div className='pt-[35px] pb-[30px] pl-[30px] pr-[30px] bg-white mx-[12px]'>
          <div className='flex items-center mb-[24px]'>
            <div className='w-[80px] h-[80px] flex-shrink-0'>
              <img src="https://preview.colorlib.com/theme/academia/images/person_2.jpg.webp" alt="" className='w-full h-full rounded-full'/>
            </div>
            <div className='pl-[16px]'>
              <h1 className='text-[#111111] text-[20px] font-semibold leading-9'>ROGER SCOTT</h1>
              <h3 className='text-[13px] text-[var(--primary-color)] font-medium leading-[23.4px]'>MARKETING MANAGER</h3>
            </div>
          </div>
          <div>
            <p className='text-[16px] font-normal leading-[28.8px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;