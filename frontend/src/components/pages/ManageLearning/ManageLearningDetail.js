import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import Loading from "../../common/Loading";
import Modal from "../../common/Modal";
const ManageLearningStyle = styled.div`
  .body{
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 40px 40px;
    }

    @property --a {
        syntax: '<angle>';
        inherits: false;
        initial-value: 90deg;
    }

    .circle {
    width: 50px;
    height: 50px;
    padding: 5px;
    box-sizing: border-box;
    -webkit-mask:
        conic-gradient(#000 var(--a), transparent var(--a)),
        linear-gradient(#000, #000) content-box;
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    background: tomato;
    border-radius: 50%;
    animation: progress 1s .3s linear forwards;
    }

    @keyframes progress {
    to {
        --a: 250deg;
    }
    }

    .course-lesson-item:hover{
        background-color:#eeecec;
        cursor: pointer;
    }

    @media screen and (width: 1024px){
        max-width: 960px;
        margin: 0 auto;
    }

    @media screen and (max-width: 1023px){
        .body{
            grid-template-columns: repeat(1, 1fr);
        }

        
        max-width: 700px;
        margin: 0 auto;
        
    }

    @media screen and (max-width: 767px){
        max-width: 500px;
        margin: 0 auto;
    }

    @media screen and (max-width: 500px){
        padding-left: 20px;
        padding-right: 20px;
    }

`

const VideoLesson = ({url_lesson, title_lesson})=>{
  return (
      <div className="">
          <div className = "border border-2 border-[#ccc] mb-[10px] py-[80px] px-[10px]">
              <video className='w-full h-[500px]' controls>
                  <source src={url_lesson} type="video/mp4" />
              </video>
          </div>
          <div className='mb-[40px] ml-[20px]'>
              <h2 className="text-[20px] font-semibold">Bài học: {title_lesson}</h2>
          </div>
      </div>
  )
}

const ListLesson = ({id_chapter, id_course})=>{
  const [lessons, setLessons] = useState([])
  const [watchLesson, setWatchLesson] = useState(null)
  const [openModal, setOpenModal] = useState(false);
  const getLessonInChapter = async(idCourse, idChapter)=>{
      const response = await axios.get(`http://localhost:5000/api/courses/${idCourse}/chapter/${idChapter}/lessons`)
      return response.data;
  }

  const handleOpenModal = ()=>{
      setOpenModal(true)
  }

  const handleCloseModal = ()=>{
      setOpenModal(false)
  }
  useEffect(()=>{
      getLessonInChapter(id_course, id_chapter).then((result)=>{
          setLessons(result);
      })
  },[])

  const handleWatchLesson = (id)=>{
      setWatchLesson(id)
      handleOpenModal()
  }
  return (
      <div>
          <ul className="">
              {lessons &&  lessons.length >0 && lessons.map((lesson, index)=>{
                  return (
                      <li key={index}>
                          <div  className="course-lesson-item px-[20px] py-[8px]" >
                              {/* <a href="#">{index + 1}: {lesson.name}</a> */}
                              <div onClick = {()=>handleWatchLesson(lesson.id)}>
                                  <p>{index + 1}: {lesson.name}</p>
                                  <p className="text-[13px] text-[#aca7a7]">3:05 </p>
                              </div>
                          </div>
                          
                          {watchLesson === lesson.id && 
                              
                              <Modal
                                  isOpen={openModal}
                                  onRequestClose={handleCloseModal}
                                  shouldCloseOnOverlayClick={false}
                              > 
                                  <VideoLesson url_lesson={lesson.video} title_lesson = {lesson.name}/>
                              </Modal>
                          }
                      </li>
                  )
              })}
          </ul>
          


      </div>
  )
}


const ManageLearningDetail = () => {
  const {pathname} =  useLocation();
    const pathnameArray = pathname.split('/');
    const idCourse = pathnameArray[pathnameArray.length-1]
    const [course, setCourse] = useState(null)
    const [chapters, setChapters] = useState([])
    const [chapterExpand, setChapterExpand] = useState(null)
    const [showListLesson, setShowListLesson] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [loadingChapter, setLoadingChapter] = useState(true)
    const [author, setAuthor] = useState(null);
    const [loadingAuthor, setLoadingAuthor] = useState(true)
    const getDetailCourse = async(id)=>{
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
        console.log(response.data)
        return response.data
    }

    const getChaptersOfCourse = async(id)=>{
        const response = await axios.get(`http://localhost:5000/api/courses/${id}/chapter`)
        return response.data
    }

    const getAuthorInfo = async(id_author)=>{
      const response = await axios.get(`http://localhost:5000/api/users/${id_author}`)
      return response.data;
    }

    useEffect(()=>{
      if(course){
        setLoadingAuthor(true);
        getAuthorInfo(course.id_author).then((result)=>{
          setAuthor(result);
          setLoadingAuthor(false)
        })
      }
    },[course])

    useEffect(() =>{
        setLoadingDetail(true)
        getDetailCourse(idCourse).then((result)=>{
            setCourse(result);
            setLoadingDetail(false)
        })

        
        setLoadingChapter(true)
        getChaptersOfCourse(idCourse).then((result)=>{
          setChapters(result);
          setLoadingChapter(false)
        })
    }, [])
    const handleShowListLesson = (id)=>{
        setShowListLesson((prev)=>!prev)
        setChapterExpand(id)
    }

  if(loadingDetail){
    return <Loading width={'50px'} height={'50px'}/>
  }

  return (
    <ManageLearningStyle className="detail-course-container max-w-[1320px] mx-auto mb-[80px]">
      <h1 className="text-[46px] text-[var(--primary-color)] py-[40px]">
        Chi tiết khóa học
      </h1>

      {course && (
        <>
          <h2 className="text-[32px] font-semibold text-[var(--primary-color)] pb-[20px]">
            {course.name}
          </h2>
          <div className="body">
            <div>
              <div className="w-[100%] mb-[20px]">
                <img className="w-full" src={course.image} alt="" />
              </div>

              <div className="mb-[20px]">
                <h2 className="text-[20px] font-semibold mb-[5px]">
                  What you'll learn
                </h2>
                <p>{course.description}</p>
              </div>

              <div>
                <span>Rating: {course.rating}</span>
                <div>
                  <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                  <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                  <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                  <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                  <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                </div>

                {loadingAuthor ? <Loading width={'30px'} height={'30px'}/> : (
                            <span className='mt-[20px] block'>Lecture: {author?.fullname}</span>
                )}
              </div>
            </div>
            <div>
              <div className="relative flex items-center border-2 px-[16px] py-[12px] mb-[10px]">
                <div>
                  <div className="circle"></div>
                  <h3 className="font-semibold text-[18px] absolute top-1/2 left-[22px] -translate-y-1/2">
                    65%
                  </h3>
                </div>
                <div className="font-semibold ml-[10px] text-[18px]">
                  <h3>115/204 bài học</h3>
                </div>
              </div>
              <h2 className="font-semibold text-[16px] py-[12px] px-[16px] flex justify-between">
                <span>Nội dung khóa học</span>
                <span
                  className=" w-[30px] h-[30px] rounded-full border border-[#ccc] inline-flex items-center justify-center cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </h2>
              <ul className="h-[370px] overflow-x-hidden overflow-y-auto">
                {loadingChapter && <Loading width={'30px'} height={'30px'}/>}
                {chapters.length > 0 && !loadingChapter &&
                  chapters.map((chapter, index) => {
                    return (
                      <li key={index}>
                        <div className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa] cursor-pointer flex justify-between">
                          <div>
                            {index + 1}. {chapter.name}
                            <p className="text-[13px] text-[#aca7a7]">
                              2/3 | 07:28
                            </p>
                          </div>
                          <div>
                            <span className=" ml-[10px] w-[40px] h-[40px] rounded-full border border-[#ccc] inline-flex items-center justify-center float-right">
                              <FontAwesomeIcon onClick={()=>handleShowListLesson(chapter.id)} icon={faCaretDown} className="p-3"/>
                            </span>
                          </div>
                        </div>
                        {chapterExpand === chapter.id && showListLesson && <ListLesson id_chapter = {chapter.id} id_course = {idCourse}/>}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </>
      )}
    </ManageLearningStyle>
  );
};

export default ManageLearningDetail;
