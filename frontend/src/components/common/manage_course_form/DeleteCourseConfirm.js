import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteCourseConfirm = ({id_course, closeModal}) => {
    const deleteCourse = async(id)=>{
        const response = await axios.delete(`http://localhost:5000/api/courses/${id}`)
        return response.data
    }

    const handleDeleteCourse = ()=>{
        deleteCourse(id_course).then((result)=>{
            if(result.status === 'success'){
                toast.success('Course deleted successfully')
                window.location.reload()
            }else{
                toast.error('Something went wrong')
            }
        })
    }

    return (
        <div className="pt-[60px]">
            <h1 className="text-center text-[28px] text-[var(--primary-color)] pb-[10px] border-b-2 border-b-[var(--primary-color)]">Are you sure?</h1>
            <p className="text-[18px] font-semibold pt-[20px] pl-[40px]">Do you really want to delete this course ?</p>
            <div className="float-right pr-[40px] pb-[40px]"> 
                <button className="px-[10px] py-[5px] rounded-lg text-white bg-[#f12222]" onClick={closeModal}>Cancel</button>
                <button className="px-[20px] py-[5px] rounded-lg text-white bg-[var(--primary-color)] ml-[20px]" onClick={handleDeleteCourse}>Yes</button>
            </div>
        </div>
    );
};

export default DeleteCourseConfirm;