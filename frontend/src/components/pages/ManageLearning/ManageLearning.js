import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loading from '../../common/Loading';
import EmptyManageLearning from './EmptyManageLearning';



const ManageLearning = () => {
  const {user} = useSelector((state)=>state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const getAllCourseOfStudent = async()=>{
    const response = await axios.get(`http://localhost:5000/api/courses/mymaterial/${user._id}`)
    return response.data
    
  }

  useEffect(()=>{
    setLoading(true)
    getAllCourseOfStudent().then((res)=>{
      
      setCourses(res)
      setLoading(false)
    })
  },[])

  if(loading){
    return <Loading width={'50px'} height={'50px'}/>
  }
  return (
    <div className='max-w-[1320px] mx-auto py-[40px]'>
      <h2 className='text-[46px] text-[var(--primary-color)] mb-[40px]'>Manage learning</h2>
      {courses.length === 0  && <EmptyManageLearning/>}
      <div className='grid grid-cols-3 gap-10'>
        {courses.length >0 && courses.map((course, index)=>{
          
          return (<div key={index} className="flex flex-col">
            <div className="w-full h-[250px] ">
              <img
                className="w-full h-full rounded-lg"
                src={course.image}
                alt=""
              />
            </div>
            <div className="mt-[12px] flex flex-col flex-1">
              <h2 className="text-2xl font-semibold">{course.name}</h2>
              <div className="mt-[12px] mt-auto">
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                </div>
              </div>
              <div className="flex gap-5 mt-5">
                <NavLink to={`/manage-learning/${course.id}`} className="py-[10px] px-[15px] bg-[var(--primary-color)] text-white font-semibold">Keep Learning</NavLink>
              </div>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  );
};

export default ManageLearning;