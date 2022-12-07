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

  const MyInputImage = ({ label,getImage,oldImage, ...props }) => {
    const [field, meta] = useField(props);
    const [imgfile, uploadimg] = useState([])
    const [change, setChange] = useState(false);
    const imgFileHandler = (e)=>{
        if(e.target.files.length !==0){
            uploadimg((imgfile)=>[...imgfile, URL.createObjectURL(e.target.files[0])])
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
          onChange={(e)=>{
            field.onChange(e);
            imgFileHandler(e)
            setChange(true);
            getImage(e.target.files[0])
          }}
        />

        {imgfile.length>0  && imgfile.map((element, index)=>{
            return (<span>
                <img src={element}  alt="" height="200" width="200"/>
            </span>)
        })}

        {imgfile.length===0 && (<span>
                <img src={oldImage}  alt="" height="200" width="200"/>
            </span>)}
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={props.id || props.name} className="mb-[8px] text-base font-semibold text-[var(--primary-color)]">
          {label}
        </label>
        <textarea
          {...props}
          {...field}
          className="pl-[15px] py-[8px] border-2 h-[100px]"
        />
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };


const EditCourseForm = ({id_course,closeModal}) => {
    console.log(id_course)
    const [selectedImage, setSelectedImage] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleGetImage = (value)=>{
      setSelectedImage(value)
    }

    const getInfoCourse = async(id)=>{
      const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
      // console.log(response.data)
      return response.data
    }

    useEffect(()=>{
      setLoading(true)
      getInfoCourse(id_course).then((result)=>{
        setCourse(result)
        setLoading(false)
      })
    },[])
    const updateCourse = async(id_course,data)=>{
        const {name, image, description, price} = data

        const formData = new FormData()
        formData.append('name',name)
        if(image){
          formData.append('image',image)
        }
        formData.append('description',description)
        formData.append('price',price)
        
        const response = await axios.put(`http://localhost:5000/api/courses/${id_course}`,formData,{
          headers: {
            'Content-Type':  `multipart/form-data`,
          }
        })
        console.log(response.data)
        return response.data
    }
    return (
      
      !loading && <Formik
            initialValues={{
                name: course.name || "",
                image: "",
                description: course.description || "",
                price: course.price || "",
            }}

            validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                image: Yup.string(),
                description: Yup.string().required("Required"),
                price: Yup.string().required("Required"),
            })}

            onSubmit = {(values)=>{
                const data = {
                  name: values.name,
                  image: selectedImage || "",
                  description: values.description,
                  price: values.price
                }
                updateCourse(id_course, data).then((result)=>{
                  if(result.status === "success"){
                    toast.success('Update Successfully')
                    window.location.reload()
                  }else{
                    toast.error('Something went wrong')
                  }
                })
                
            }}
        >

            <Form className="pt-[50px]">
                <h2 className="text-center text-[var(--primary-color)] text-[28px] border-b-2 border-b-[var(--primary-color)] pb-[20px] ">CHỈNH SỬA KHÓA HỌC</h2>
                <div className="pb-[70px] mx-10">
                    <MyInput label="Tên khóa học" type="text" name="name" id="name" placeholder="Nhập tên khóa học..." />
                    <MyInputImage label="Thumnail" type="file" name="image" id="image" getImage = {handleGetImage} oldImage = {course.image}/>
                    <MyTextArea label="Mô tả" placeholder="Nhập mô tả khóa học" type="text" name="description" id="description"/>
                    <MyInput label="Giá" placeholder="Nhập giá tiền khóa học" type="text" name="price" id="price"/>
                    <button className="float-right  ml-[20px] bg-[var(--primary-color)] text-white text-base px-[20px] py-[5px] rounded-lg" type="submit">CẬP NHẬT</button>

                    <button className="float-right border bg-red-600 text-white text-base px-[20px] py-[5px] rounded-lg " onClick={closeModal}>HỦY</button>
                </div>
            </Form>
        </Formik>
    );
};

export default EditCourseForm;