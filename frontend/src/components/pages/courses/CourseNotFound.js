import React from 'react';
import { NavLink } from 'react-router-dom';

const CourseNotFound = () => {
  return (
    <div className='bg-[#F8F8F8]'>
      <div className='max-w-[1320px] mx-auto py-[80px]'>
        <div className='flex justify-center'>
          <div className='w-[500px] h-[400px]'><img className='w-full h-full' src="https://res.cloudinary.com/duwue5tbf/image/upload/v1670840543/courses/404-Error-message_di1zba.png" alt="" /></div>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;