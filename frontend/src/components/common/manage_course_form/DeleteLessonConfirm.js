import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteLessonConfirm = ({id_course, id_chapter, id_lesson, closeModal}) => {
    const deleteLesson = async()=>{
        const response = await axios.delete(`http://localhost:5000/api/courses/${id_course}/chapter/${id_chapter}/lessons/${id_lesson}`)
        return response.data
    }

    const handleDeleteLesson = ()=>{
        deleteLesson().then((result)=>{
            if(result.status === 'success'){
                toast.success('Lesson deleted successfully')
                window.location.reload()
            }else{
                toast.error('Something went wrong')
            }
        })
    }

    return (
        <div className="pt-[60px]">
            <h1 className="text-center text-[28px] text-[var(--primary-color)] pb-[10px] border-b-2 border-b-[var(--primary-color)]">Are you sure?</h1>
            <p className="text-[18px] font-semibold pt-[20px] pl-[40px]">Do you really want to delete this Lesson ?</p>
            <div className="float-right pr-[40px] pb-[40px]"> 
                <button className="px-[10px] py-[5px] rounded-lg text-white bg-[#f12222]" onClick={closeModal}>Cancel</button>
                <button className="px-[20px] py-[5px] rounded-lg text-white bg-[var(--primary-color)] ml-[20px]" onClick={handleDeleteLesson}>Yes</button>
            </div>
        </div>
    );
};

export default DeleteLessonConfirm;