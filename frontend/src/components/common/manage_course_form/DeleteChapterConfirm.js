import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteChapterConfirm = ({id_chapter,id_course, closeModal}) => {
    const deleteCourse = async()=>{
        const response = await axios.delete(`http://localhost:5000/api/courses/${id_course}/chapter/${id_chapter}`)
        return response.data
    }

    const handleDeleteChapter = ()=>{
        deleteCourse().then((result)=>{
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
            <p className="text-[18px] font-semibold pt-[20px] pl-[40px]">Do you really want to delete this chapter ?</p>
            <div className="float-right pr-[40px] pb-[40px]"> 
                <button className="px-[10px] py-[5px] rounded-lg text-white bg-[#f12222]" onClick={closeModal}>Cancel</button>
                <button className="px-[20px] py-[5px] rounded-lg text-white bg-[var(--primary-color)] ml-[20px]" onClick={handleDeleteChapter}>Yes</button>
            </div>
        </div>
    );
};

export default DeleteChapterConfirm;