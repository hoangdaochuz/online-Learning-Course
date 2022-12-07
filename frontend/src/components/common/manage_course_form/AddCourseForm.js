import axios from 'axios';
import { Form, Formik, useField } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
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

  const MyInputImage = ({ label,getFileImage, ...props }) => {
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
            getFileImage(e.target.files[0]);
          }}
        />

        {imgfile.length>0 && imgfile.map((element, index)=>{
            return (
                <span key={index} className="block w-[100px] h-[100px]">
                    <img src={element} className = "w-full h-full" alt="" />
                </span>
            )
        })}
  
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


const AddCourseForm = ({userID,closeModal}) => {
    const [imageFile, setImageFile] = useState(null)
    const navigate = useNavigate();
    const addCourse = async(data)=>{
      const {name, image, description, price} = data

      const formData = new FormData();
      formData.append('userID', userID)
      formData.append('name',name)
      formData.append('image',image)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('rating', 0);
      const response = await axios.post('http://localhost:5000/api/courses/', formData, {
        headers: {
          'Content-Type':  `multipart/form-data`,
        }
      })
      console.log(response)
      return response.data
    }

    const handleGetImageFile = (value)=>{
      setImageFile(value);
    }
    return (
        <Formik
            initialValues={{
                name: "",
                image: "",
                description: "",
                price: "",

            }}

            validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                image: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
                price: Yup.string().required("Required"),
            })}

            onSubmit = {(values)=>{
              const data = {
                name: values.name,
                image: imageFile,
                description: values.description,
                price: values.price
              }
              addCourse(data).then((result)=>{
                if(result.status ==='success'){
                  toast.success('Add Course Successfully')
                  window.location.reload();
                }else{
                  toast.error('Some thing went wrong')
                }
              })

            }}
        >

            <Form className="pt-[50px]">
                <h2 className="text-center text-[var(--primary-color)] text-[28px] border-b-2 border-b-[var(--primary-color)] pb-[20px] ">THÊM KHÓA HỌC</h2>
                <div className="pb-[70px] mx-10 h-[630px] overflow-y-auto">
                    <MyInput label="Tên khóa học" type="text" name="name" id="name" placeholder="Nhập tên khóa học..." />
                    <MyInputImage label="Thumnail" type="file" name="image" id="image" getFileImage = {handleGetImageFile}/>
                    <MyTextArea label="Mô tả" placeholder="Nhập mô tả khóa học" type="text" name="description" id="description"/>
                    <MyInput label="Giá" placeholder="Nhập giá tiền khóa học" type="text" name="price" id="price"/>
                    <button className="float-right  ml-[20px] bg-[var(--primary-color)] text-white text-base px-[20px] py-[5px] rounded-lg" type="submit">THÊM</button>

                    <button className="float-right border bg-red-600 text-white text-base px-[20px] py-[5px] rounded-lg " onClick={closeModal}>HỦY</button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddCourseForm;