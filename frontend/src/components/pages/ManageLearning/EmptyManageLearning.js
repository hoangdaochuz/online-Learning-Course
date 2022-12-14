import { faFaceFrownOpen } from '@fortawesome/free-regular-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const EmptyManageLearning = () => {
  return (
    <div className='text-center py-[40px]'>
      <div className='mb-[40px]'><FontAwesomeIcon className='text-[62px] text-[var(--primary-color)]' icon={faFaceFrownOpen}/></div>
      <div>
        <h1 className='text-[32px] mb-[10px]'>You don't own any courses yet</h1>
        <p className='text-[18px] text-[#8a8a8a]'>Let choose course which you need and make payment for it.</p>
        <NavLink to='/courses' className="mt-[20px] block px-[15px] py-[12px] bg-[var(--primary-color)] text-white font-semibold w-1/2 translate-x-1/2">Go to Course</NavLink>
      </div>
    </div>
  );
};

export default EmptyManageLearning;