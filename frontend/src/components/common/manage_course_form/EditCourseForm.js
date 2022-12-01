import { Form, Formik, useField } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";

const MyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    console.log(field)
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

  const MyInputImage = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [imgfile, uploadimg] = useState([])
    console.log(field)
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
          }}
        />

        {imgfile.length>0 && imgfile.map((element, index)=>{
            return (<span>
                <img src={element}  alt="" height="200" width="200"/>
            </span>)
        })}

        {imgfile.length===0 && (<span>
                <img src="https://ghouse.com.vn/wp-content/uploads/2019/07/ghouse-huongdan-c.jpg"  alt="" height="200" width="200"/>
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


const EditCourseForm = ({closeModal}) => {
    return (
        <Formik
            initialValues={{
                name: "C/C++ course",
                image: "",
                description: "This is C/C++ course",
                price: "450352",

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
                <h2 className="text-center text-[var(--primary-color)] text-[28px] border-b-2 border-b-[var(--primary-color)] pb-[20px] ">CHỈNH SỬA KHÓA HỌC</h2>
                <div className="pb-[70px] mx-10">
                    <MyInput label="Tên khóa học" type="text" name="name" id="name" placeholder="Nhập tên khóa học..." />
                    <MyInputImage label="Thumnail" type="file" name="image" id="image" />
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