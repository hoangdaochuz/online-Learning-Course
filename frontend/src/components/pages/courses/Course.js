import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "./../../common/Button";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loading from "../../common/Loading";

const Course = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const getAllCourse = async() => {
    const response = await axios.get('http://localhost:5000/api/courses/')
    return response.data;
  }
  useEffect(() => {
    setLoading(true)
    getAllCourse().then((result)=>{
        setCourses(result)
        setLoading(false)
    })
  },[])
  if(loading){
    return <Loading width={'50px'} height={'50px'}/>
  }
  return (
    <div className="max-w-[1320px] mx-auto">
      <div className="mb-[80px] mt-[80px] flex justify-between items-center">
        <div>
            <h2 className="text-[46px] text-[var(--primary-color)]">Danh sách các khóa học</h2>
        </div>
        <div className="flex gap-[12px] w-[40%]">
            <input type="text" name="course" id="course" placeholder="Nhập khóa học muốn tìm kiếm" className="h-[50px] flex-grow rounded-3xl px-5"/>
            <button className="rounded-2xl bg-[var(--primary-color)] text-white px-[15px] py-[5px]">Tìm kiếm</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[40px]">
        {courses.length>0 && courses.map((course, index)=>{
            return (
            <div key={index} className="flex flex-col">
                <div className="w-full h-[250px] ">
                    <img
                    className="w-full h-full rounded-lg"
                    src={course.image}
                    alt=""
                    />
                </div>
                <div className="mt-[12px] flex flex-col flex-1">
                    <NavLink to={`/courses/${course.id}`} className="text-2xl font-semibold">{course.name}</NavLink>
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
                    <p className="mt-[8px] text-3xl text-[var(--primary-color)]">
                        {course.price} VNĐ
                    </p>
                    </div>
                    <div className="flex gap-5 mt-5">
                    <Button
                        primary={true}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        deleteBtn={true}
                    >
                        Buy
                    </Button>
                    </div>
                </div>
            </div>
            )
        })}
      </div>
    </div>
  );
};

export default Course;
