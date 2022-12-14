import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SuccessOrder = () => {
  return (
    <div className='text-center pt-[168px] pb-[112px]'>
      <div className='w-[80px] h-[80px] rounded-full bg-[#ccc] flex justify-center items-center mx-auto mb-[48px]'>
        <FontAwesomeIcon icon={faCheck} className='text-[var(--primary-color)] text-[46px]'/>
      </div>

      <div>
        <h1 className='text-[64px] font-light mb-[8px]'>Thank you!</h1>
        <p className='text-[20px] font-light mb-[48px] text-[#6a6a6a]'>You order was successfully completed</p>

        <NavLink to="/manage-learning" className='text-[14px] text-white px-[30px] py-[12px] bg-[var(--primary-color)] font-semibold mr-[80px]'>Go to manage learning</NavLink>
        <NavLink to = '/' className='text-[14px] text-white px-[30px] py-[12px] bg-[var(--primary-color)] font-semibold'>Back to home</NavLink>
      </div>
    </div>
  );
};

export default SuccessOrder;