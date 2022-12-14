import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { faFileArrowDown, faFilePdf, faMobileAndroid, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { faSquareYoutube } from '@fortawesome/free-brands-svg-icons';
import Loading from '../../common/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../../features/cart/cartSlice'; 
import { toast } from 'react-toastify';

const DetailCourseStyle = styled.div`
  .body{
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0 40px;
  }

  @media screen and (max-width: 1024px){
    padding: 0 40px;
    .body{
      grid-template-columns: repeat(1,1fr);
      gap: 40px 0px;
    }
    .body-course-price{
      grid-row-start: 1;
    }
    .body-course-introduce{
      grid-row-start: 2;
    }
    .body-course-price-preview-video{
      width: 100%;
      height: 500px;
    }
  }

  @media screen and (max-width: 767px){
    .body-course-price-preview-video{
      height: 300px;
    }    
  }

  @media screen and (max-width: 500px){
    .course-detail-heading{
      font-size: 30px;
      font-weight: 600;
      padding: 20px 0px;
    }
    .body-course-price-preview-video{
      height: 175px;
    }
  }
`

const DetailCourse = () => {

  const {pathname} = useLocation()
  const pathStringArray = pathname.split('/')
  const idCourse = pathStringArray[pathStringArray.length - 1]
  const [course, setCourse] = useState(null)
  const [author, setAuthor] = useState(null)
  const [chapters, setChapters] = useState([])
  const [loadingDetailCourse, setLoadingDetailCourse] = useState(true)
  const[loadingChapters, setLoadingChapters] = useState(true)
  const [loadingAuthor, setLoadingAuthor] = useState(true)
  const [own, setOwn] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  const getDetailCourse = async()=>{
    const response = await axios.get(`http://localhost:5000/api/courses/${idCourse}`)
    return response.data
  }

  const checkOwnCourse = async()=>{
    const response =await axios.get(`http://localhost:5000/api/courses/check-own/${user._id}/${idCourse}`)
    return response.data.status
  }

  const getListChapterOfCourse = async()=>{
    const response = await axios.get(`http://localhost:5000/api/courses/${idCourse}/chapter`)
    return response.data;
  }
  const getAuthorInfo = async(id_author)=>{
    const response = await axios.get(`http://localhost:5000/api/users/${id_author}`)
    return response.data;
  }
  useEffect(()=>{
    setLoadingDetailCourse(true);
    const timer = setTimeout(()=>{
      getDetailCourse().then((result)=>{
        setCourse(result)
        setLoadingDetailCourse(false)
      })
    },800)

    setLoadingChapters(true);
    getListChapterOfCourse().then((result)=>{
      setChapters(result)
      setLoadingChapters(false)
    })

    return ()=>{
      clearTimeout(timer)
    }

  },[])

  useEffect(()=>{
    checkOwnCourse().then((result)=>{
      if(result === "own"){
        setOwn(true)
      }else{
        setOwn(false)
      }
    })
  },[])

  useEffect(()=>{
    if(course){
      setLoadingAuthor(true);
      getAuthorInfo(course.id_author).then((result)=>{
        setAuthor(result);
        setLoadingAuthor(false)
      })
    }
  },[course])

  if(loadingDetailCourse){
    return <Loading width={'50px'} height={'50px'}/>
  }

  const handleAddToCart = ({id, name, image, price})=>{
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
    <DetailCourseStyle className="detail-course-container max-w-[1320px] mx-auto mb-[80px]">
            <h1 className="course-detail-heading text-[46px] text-[var(--primary-color)] py-[40px]">Chi tiết khóa học</h1>

            
            {course && 
            <>
            <h2 className="text-[32px] font-semibold text-[var(--primary-color)] pb-[20px]">{course.name}</h2>
            <div className="body">
                <div className='body-course-introduce'>
                  <div>
                      <div className="w-[100%] mb-[20px]">
                          <img className="w-full" src={course.image} alt="" />
                      </div>
                  
                      <div className='mb-[20px]'>
                          <h2 className="text-[20px] font-semibold mb-[5px]">What you'll learn</h2>
                          <p >{course.description}</p>
                      </div>
                      <div>
                          <span>Rating: {course.rating}</span>
                          <div>
                              <FontAwesomeIcon className="text-yellow-500" icon={faStar}/>
                              <FontAwesomeIcon className="text-yellow-500" icon={faStar}/>
                              <FontAwesomeIcon className="text-yellow-500" icon={faStar}/>
                              <FontAwesomeIcon className="text-yellow-500" icon={faStar}/>
                              <FontAwesomeIcon className="text-yellow-500" icon={faStar}/>
                          </div>

                          {loadingAuthor ? <Loading width={'30px'} height={'30px'}/> : (
                            <span className='mt-[20px] block'>Lecture: {author?.fullname}</span>
                          )}
                      </div>
                  </div>

                  {loadingChapters? <Loading width={'50px'} height={'50px'}/>: (
                    <div className='mt-[20px]'>
                      <h2 className="font-semibold text-[16px] py-[12px] px-[16px] flex justify-between">
                          <span>Nội dung khóa học</span>
                      </h2>
                      <ul className="h-[370px] overflow-x-hidden overflow-y-auto">
                          {chapters.length >0 && chapters.map((chapter, index)=>{
                              return (
                                  <li key={index}>
                                    <div  className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa] cursor-pointer flex justify-between">
                                        <div>
                                            {index + 1}. {chapter.name}
                                            <p className="text-[13px] text-[#aca7a7]">
                                                2/3 | 07:28
                                            </p>
                                        </div>
                                    </div>
                                  </li>
                              )
                          })}
                      </ul>
                  </div>

                  )}
                  
                </div>

                <div className='body-course-price'>
                  <div className='body-course-price-preview'>
                    <video className='body-course-price-preview-video' width="400" height="400" controls>
                      <source src="https://res.cloudinary.com/duwue5tbf/video/upload/v1670555201/courses/llmt40298mwchscs8ogw.mp4" type='video/mp4' />
                    </video>
                  </div>
                  <div className='mt-[20px] mb-[20px]'>
                    {!own && <h2 className='text-[24px] font-semibold text-[var(--primary-color)] mb-[10px]'>{course.price} VNĐ</h2>}
                    
                    <div className='flex flex-col gap-y-4'>
                      {own ? (<NavLink to={`/manage-learning/${idCourse}`} className='px-[15px] py-[10px] bg-[var(--primary-color)] text-white font-semibold text-[18px] rounded-md'
                      >Keep Learning</NavLink>):(
                        <>
                          <button className='px-[15px] py-[10px] bg-[var(--primary-color)] text-white font-semibold text-[18px] rounded-md' 
                            onClick={()=>handleAddToCart({
                              id: course.id,
                              name: course.name,
                              image: course.image,
                              price: course.price
                            })}
                          >Add to cart</button>
                          <button className='px-[15px] py-[10px] bg-white text-[var(--primary-color)]  border-2 border-[#ccc] font-semibold text-[18px] rounded-md'
                            onClick={()=>handleBuyCourse({
                              id: course.id,
                              name: course.name,
                              image: course.image,
                              price: course.price
                            })}
                          >Buy now</button>
                        </>
                      )}
                    </div>
                    {!own && <p className='text-center mt-[12px] text-[#1c1d1f]'>30-Day Money-Back Guarantee</p>}
                    
                  </div>
                  {!own && 
                    <div className='mt-[12px]'>
                      <h2 className='font-semibold text-[18px]'>This course includes:</h2>
                      <div>
                        <ul>
                          <li className='py-[5px]'>
                            <div className='flex gap-x-3 items-center'>
                              <FontAwesomeIcon icon={faSquareYoutube}/>
                              <p>31.5 hours on-demand video</p>
                            </div>
                          </li>
                          <li className='py-[5px]'>
                            <div className='flex gap-x-3 items-center'>
                              <FontAwesomeIcon icon={faFilePdf}/>
                              <p>81 articles</p>
                            </div>
                          </li>
                          <li className='py-[5px]'>
                            <div className='flex gap-x-3 items-center'>
                              <FontAwesomeIcon icon={faMobileAndroid}/>
                              <p>64 downloadable resources</p>
                            </div>
                          </li>
                          <li className='py-[5px]'>
                            <div className='flex gap-x-3 items-center'>
                              <FontAwesomeIcon icon={faTrophy}/>
                              <p>Certificate of completion</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                </div>
            </div>
            </>
            }
    </DetailCourseStyle>
  );
};

export default DetailCourse;