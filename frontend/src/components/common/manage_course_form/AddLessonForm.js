import { Form, Formik, useField } from 'formik';
import React, { useState } from 'react';
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


  const MyInputVideo = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [imgfile, uploadimg] = useState([]);
    console.log(field)

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
          }}
        />

        {imgfile.length>0 && imgfile.map((element, index)=>{
            return (
                <span key={index} className="block w-[100px] h-[100px]">
                    <video src={element} className = "w-full h-full" alt="" />
                </span>
            )
        })}
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const AddLessonForm = ({closeModal}) => {
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
                console.log(values);
            }}
        >

            <Form className="pt-[50px]">
                <h2 className="text-center text-[var(--primary-color)] text-[28px] border-b-2 border-b-[var(--primary-color)] pb-[20px] ">THÊM BÀI HỌC</h2>
                <div className="pb-[70px] mx-10 h-[200px] overflow-y-auto">
                    {/* Tên bài học */}
                    <MyInput label="Tên bài học" type="text" name="name" id="name" placeholder="Nhập tên bài học..." />

                    <MyInputVideo label="Video" type="file" name="video" id="video" />

                    <button className="float-right  ml-[20px] bg-[var(--primary-color)] text-white text-base px-[20px] py-[5px] rounded-lg" type="submit">THÊM</button>
                    <button className="float-right border bg-red-600 text-white text-base px-[20px] py-[5px] rounded-lg " onClick={closeModal}>HỦY</button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddLessonForm;