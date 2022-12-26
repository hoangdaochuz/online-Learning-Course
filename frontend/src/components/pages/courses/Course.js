import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "./../../common/Button";
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useDebounce from '../../../myhooks/useDebounce';
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {addProductToCart} from '../../../features/cart/cartSlice'
import CourseNotFound from "./CourseNotFound";
import styled from "styled-components";
import { toast } from "react-toastify";

const CourseStyle = styled.div`

  @media screen and (width: 1024px){
    max-width: 960px;
  }

  @media screen and (max-width: 1023px) {
    padding: 0 40px;
    .course-heading-container{
      flex-direction: column;
    }
    .course-search-box{
      margin-top: 20px;
      width: 100%;
    }
    .course-body-container{
      grid-template-columns: repeat(2, 1fr);
    }
    .course-item-price{
      font-size: 24px;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 767px){
    .course-body-container{
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media screen and (max-width: 500px){
    padding: 0 20px;
    .course-heading-title{
      font-size: 30px;
      font-weight: 600;
    }
    .course-search-box{
      display: flex;
      flex-direction: column;
    }
  }

`


const Course = () => {
  const [searchQuery,setSearchQuery] = useState('');
  const [search, setSearch] = useState(false)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const searchValueDebounce = useDebounce(searchQuery,1000)
  const searchRef = useRef(null)
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()                                              
  const navigate = useNavigate()
  const getAllCourse = async(queryString) => {
    setLoading(true)
    const response = await axios.get(`http://localhost:5000/api/search/course?nameCourse=${queryString}`)
    return response.data;
  }

  const handleSearch = ()=>{
    setSearch((prev)=>!prev)
  }
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(()=>{
      getAllCourse(searchValueDebounce).then((result)=>{
        setCourses(result)
        setLoading(false)
      })
    },500)
    return ()=>{
      clearTimeout(timer)
    }
  },[searchValueDebounce, search])
  

  useEffect(()=>{
    if(!loading){
      searchRef.current.focus()
    }
  },[loading])

  if(loading){
    return <Loading width={'50px'} height={'50px'}/>
  }

  const handleAddToCart = ({id, name, price,image})=>{
    // console.log(id,name,price, image)
    if(user){
      dispatch(addProductToCart({
        id,
        name,
        price,
        image
      }))
      toast.success('Course be added to cart successfully')
    }else{
      navigate('/login')
    }
  }

  const handleBuyCourse = ({id, name, price, image})=>{
    if(user){
      dispatch(addProductToCart({
        id,
        name,
        price,
        image
      }))
      navigate('/cart')
    }else{
      navigate('/login')
    }
  }

  return (
    <CourseStyle className="max-w-[1320px] mx-auto pb-[128px]">
      <div className="course-heading-container mb-[80px] mt-[80px] flex justify-between items-center">
        <div>
            <h2 className="course-heading-title text-[46px] text-[var(--primary-color)]">Danh sách các khóa học</h2>
        </div>
        <div className="course-search-box flex gap-[12px] w-[40%]">
            <input 
              type="text" 
              name="course" 
              id="course" 
              placeholder="Nhập khóa học muốn tìm kiếm" 
              className="h-[50px] flex-grow rounded-3xl px-5"
              value={searchQuery}  
              onChange={(e)=>{
                setSearchQuery(e.target.value)
              }}
              ref={searchRef}
            />
            <button className="rounded-2xl bg-[var(--primary-color)] text-white px-[15px] py-[5px]" onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>
      {courses.length === 0 && <CourseNotFound/>}
      <div className="course-body-container grid grid-cols-3 gap-[40px]">
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
                    <p className="course-item-price mt-[8px] text-3xl text-[var(--primary-color)]">
                        {course.price} VNĐ
                    </p>
                    </div>
                    <div className="flex gap-5 mt-5">
                    <Button
                        primary={true}
                        onClick = {()=>handleAddToCart({
                          id: course.id,
                          name: course.name,
                          price: course.price,
                          image: course.image,
                        })}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        deleteBtn={true}
                        onClick = {()=>handleBuyCourse({
                          id: course.id,
                          name: course.name,
                          price: course.price,
                          image: course.image,
                        })}
                    >
                        Buy
                    </Button>
                    </div>
                </div>
            </div>
            )
        })}
      </div>

      <div className="my-[40px]">
        <ul className="flex justify-center gap-x-3">
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer"><FontAwesomeIcon icon={faChevronLeft}/></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">1</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">2</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">3</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">4</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer"><FontAwesomeIcon icon = {faChevronRight}/></li>
        </ul>
      </div>
    </CourseStyle>
  );
};

export default Course;
