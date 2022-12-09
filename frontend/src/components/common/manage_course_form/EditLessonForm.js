import axios from 'axios';
import { Form, Formik, useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const MyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={props.id || props.name} className="mb-[8px] text-base font-semibold text-[var(--primary-color)]">
          {label}
        </label>
        <input
          {...props}
          {...field}
          className="pl-[15px] py-[8px]"
        />
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MyInputVideo = ({ label,oldVideo,getVideo, ...props }) => {
    const [field, meta] = useField(props);
    const [imgfile, uploadimg] = useState([]);
    const imgFileHandler = (e)=>{
        if (e.target.files.length !== 0) {
            uploadimg(imgfile => [...imgfile, URL.createObjectURL(e.target.files[0])])
        }
    }

    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={props.id || props.name} className="mb-[8px] text-base font-semibold text-[var(--primary-color)]">
          {label}
        </label>
        <input
          {...props}
          {...field}
          className="pl-[15px] py-[8px]"

          onChange = {(e)=>{
            field.onChange(e)
            imgFileHandler(e);
            getVideo(e.target.files[0])
          }}
        />

        {imgfile.length>0 && imgfile.map((element, index)=>{
            return (
                <span key={index} className="block w-[100px] h-[100px]">
                    <video src={element} className = "w-full h-full" alt="" />
                </span>
            )
        })}

        {imgfile.length === 0 && (
                <span className="block w-[100px] h-[100px]">
                    <video src={oldVideo} className = "w-full h-full" alt="" />
                </span>
        )}
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };
const EditLessonForm = ({id_lesson, id_chapter, id_course,closeModal}) => {
    const [oldLesson, setOldLesson] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const getOldInfoLesson = async()=>{
      const response = await axios.get(`http://localhost:5000/api/courses/${id_course}/chapter/${id_chapter}/lessons/${id_lesson}`)
      console.log(response.data)
      return response.data
    }

    useEffect(()=>{
      setLoading(true)
      getOldInfoLesson().then((result)=>{
        setOldLesson(result)
        setLoading(false)
      })
    },[])

    const handleSelectedVideo = (value)=>{
      setSelectedVideo(value)
    }

    const updateLesson = async(data)=>{
      const {name, video} = data
      const formData = new FormData()
      formData.append('name',name)
      if(video){
        formData.append('video',video)
      }

      const response = await axios.put(`http://localhost:5000/api/courses/${id_course}/chapter/${id_chapter}/lessons/${id_lesson}`, formData, {
        headers: {
          'Content-Type':  `multipart/form-data`,
        }
      })

      return response.data

    }
    return (
        !loading && <Formik
            initialValues={{
                name: oldLesson.name || "",
                video: "",

            }}

            validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                video: Yup.string()
            })}

            onSubmit = {(values)=>{
                const data = {
                  name: values.name,
                  video: selectedVideo || ""
                }
                updateLesson(data).then((result)=>{
                  if(result.status === 'success'){
                    toast.success('Update Lesson Successfully')
                    window.location.reload()
                  }else{
                    toast.error('Something went wrong')
                  }
                })
            }}
        >

            <Form className="pt-[50px]">
                <h2 className="text-center text-[var(--primary-color)] text-[28px] border-b-2 border-b-[var(--primary-color)] pb-[20px] ">CHỈNH SỬA BÀI HỌC</h2>
                <div className="pb-[70px] mx-10 h-[200px] overflow-y-auto">
                    {/* Tên bài học */}
                    <MyInput label="Tên bài học" type="text" name="name" id="name" placeholder="Nhập tên bài học..." />

                    <MyInputVideo label="Video" type="file" name="video" id="video" oldVideo = {oldLesson.video} getVideo = {handleSelectedVideo}/>
                    <button className="float-right  ml-[20px] bg-[var(--primary-color)] text-white text-base px-[20px] py-[5px] rounded-lg" type="submit">LƯU</button>
                    <button className="float-right border bg-red-600 text-white text-base px-[20px] py-[5px] rounded-lg " onClick={closeModal}>HỦY</button>
                </div>
            </Form>
        </Formik>
    );
};

export default EditLessonForm;