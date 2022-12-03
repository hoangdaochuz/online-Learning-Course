import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styled from 'styled-components'
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../common/Modal';
import AddLessonForm from '../../common/manage_course_form/AddLessonForm';
import AddChapterForm from '../../common/manage_course_form/AddChapterForm';

const DetailStyled = styled.div`
    .body{
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 0 40px;
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

`

const TeacherManageDetailCourse = () => {
    const {pathname} =  useLocation();
    const pathnameArray = pathname.split('/');
    const idCourse = pathnameArray[pathnameArray.length-1]
    const [course, setCourse] = useState(null)
    const [showListLesson, setShowListLesson] = useState(false);
    const [showAddLessonModal, setShowAddLessonModal] = useState(false);
    const [showAddChapterModal, setShowAddChapterModal] = useState(false);


    const getDetailCourse = async(id)=>{
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
        console.log(response.data)
        return response.data
    }

    useEffect(() =>{
        getDetailCourse(idCourse).then((result)=>{
            setCourse(result);
        })
    }, [])

    const openAddLessonModal = ()=>{
        setShowAddLessonModal(true)
    }
    const closeAddLessonModal = ()=>{
        setShowAddLessonModal(false)
    }

    const openAddChapterModal = ()=>{
        setShowAddChapterModal(true)
    }
    const closeAddChapterModal = ()=>{
        setShowAddChapterModal(false)
    }

    return (
        <DetailStyled className="max-w-[1320px] mx-auto">
            <h1 className="text-[46px] text-[var(--primary-color)] py-[40px]">Chi tiết khóa học</h1>

            
            {course && 
            <>
            <h2 className="text-[32px] font-semibold text-[var(--primary-color)] pb-[20px]">{course.name}</h2>
            <div className="body">
                <div>
                    <div className = "border border-2 border-[#ccc] mb-[40px]">
                        <video className='w-full h-[500px]' controls>
                            <source src={course.content} type="video/mp4" />
                        </video>
                    </div>
                    <div className='mb-[40px]'>
                        
                        <p >{course.description}</p>
                    </div>
                </div>
                <div>
                    <div className="relative flex items-center border-2 px-[16px] py-[12px] mb-[10px]">
                        <div>
                            <div className="circle">
                            </div>
                            <h3 className="font-semibold text-[18px] absolute top-1/2 left-[22px] -translate-y-1/2">65%</h3>
                        </div>
                        <div className="font-semibold ml-[10px] text-[18px]">
                            <h3>115/204 bài học</h3>
                        </div>
                    </div>
                    <h2 className="font-semibold text-[16px] py-[12px] px-[16px] flex justify-between">
                        <span>Nội dung khóa học</span>
                        <span className=" w-[40px] h-[40px] rounded-full border border-[#ccc] inline-flex items-center justify-center cursor-pointer" onClick={openAddChapterModal}><FontAwesomeIcon icon={faPlus}/></span>
                    </h2>
                    <ul className="h-[370px] overflow-x-hidden overflow-y-auto">
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa] cursor-pointer">
                            1. Giới thiệu
                            <span className=" ml-[10px] w-[40px] h-[40px] rounded-full border border-[#ccc] inline-flex items-center justify-center" onClick={()=>{setShowListLesson((prev)=>!prev)}}><FontAwesomeIcon icon={faCaretDown}/></span>
                            <span className = " ml-[10px]  w-[40px] h-[40px] rounded-full border border-[#ccc] inline-flex items-center justify-center" onClick={openAddLessonModal}><FontAwesomeIcon icon={faPlus}/></span>
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        {showListLesson &&
                            <div>
                                <ul>
                                    <li className="course-lesson-item px-[20px] py-[8px]">
                                        <a href="">1: Lời khuyên trước khóa học</a>
                                        <p className="text-[13px] text-[#aca7a7]">3:05 </p>
                                    </li>
                                    <li className="course-lesson-item px-[20px] py-[8px]">
                                        <a href="">2: Cài đặt môi trường</a>
                                        <p className="text-[13px] text-[#aca7a7]">3:05 </p>
                                    </li>
                                </ul>
                            </div>
                        }
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            2. Biến, comments, built-in
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            3. Toán tử, kiểu dữ liệu
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            4. Làm việc với hàm
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            5. Làm việc với chuỗi
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            6. Làm việc với số
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            7. Làm việc với số
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                        <li className="px-[20px] py-[8px] border-b-2 border-b-[#ccc] bg-[#f7f8fa]">
                            8. Làm việc với số
                            <p className="text-[13px] text-[#aca7a7]">
                                2/3 | 07:28
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            </>
            }
            
            {showAddLessonModal && 
            <Modal
                isOpen={showAddLessonModal}
                onRequestClose={closeAddLessonModal}
                shouldCloseOnOverlayClick={true}
            > 
                <AddLessonForm closeModal={closeAddLessonModal}/>
            </Modal>
            }

            {showAddChapterModal && 
            <Modal
                isOpen={showAddChapterModal}
                onRequestClose={closeAddChapterModal}
                shouldCloseOnOverlayClick={true}
            > 
                <AddChapterForm closeModal={closeAddChapterModal}/>
            </Modal>
            }

        </DetailStyled>

        
    );
};

export default TeacherManageDetailCourse;