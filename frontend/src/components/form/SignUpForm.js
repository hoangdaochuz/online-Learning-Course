import {Form, Formik, useField } from "formik";
import React from "react";
import * as Yup from "yup";
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'
import {register, reset} from '../../features/auth/authSlice'


import styled from 'styled-components'

const HeadingtAuth = styled.h1`
    color: var(--primary-color);
`

const ButtonAuth = styled.button`
    background-color: var(--primary-color);
`

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="pb-[8px] block">
        {label}
      </label>
      <input
        {...props}
        {...field}
        className="border border-2 p-2 w-full bg-slate-100"
      />

      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="pb-[8px] block mt-2">
        {label}
      </label>
      <select
        className="border border-2 p-2 w-full bg-slate-10"
        {...props}
        {...field}
      ></select>

      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className="flex gap-x-3 mt-2">
        <input
          {...props}
          {...field}
          className="border border-2 p-2 bg-slate-10"
        ></input>
        {children}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignUpForm = ({margin}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess,message} = useSelector((state)=>state.auth)
  useEffect(()=>{
      if(isError) {
         toast.error(message);
      }

      if(isSuccess|| user){
        if(user.job === 'admin') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }
        toast.success("Sign up successfully")
      }
      dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return (<div className="w-[50px] h-[50px] rounded-full border-4 border-blue-800 border-l-transparent animate-spin mt-[100px]"></div>)
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        job: "",
        term: false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        userName: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        confirmPassword: Yup.string()
          .required("Required")
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be same"
            ),
          }),
        job: Yup.string().required("Required"),
        term: Yup.boolean().oneOf(
          [true],
          "Please accept all the term and condition"
        ),
      })}
      onSubmit={(values, action) => {   
        const userData = {
          fullname: values.firstName + ' ' + values.lastName,
          username: values.userName,
          email: values.email,
          password: values.password,
          job: values.job,
        }
        console.log(userData)
        dispatch(register(userData))

      }}
    >
      {(formik) => {
        return (
          <Form className={`max-w-[400px] ${margin ? 'mx-0': 'mx-auto'} pt-[40px]`}>
            <HeadingtAuth className="text-4xl font-semibold text-purple-500 pb-[20px]">
              Sign Up
            </HeadingtAuth>
            {/* {formik.isSubmitting ? (
              <div
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
              >
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading...
                </h2>
                <p className="w-1/3 text-center text-white">
                  This may take a few seconds, please don't close this page.
                </p>
              </div>
            ) : null} */}
            <MyInput
              name="firstName"
              id="firstName"
              label="First name"
              type="text"
              placeholder="Enter your first name"
            />
            <MyInput
              name="lastName"
              id="lastName"
              label="Last name"
              type="text"
              placeholder="Enter your last name"
            />
            <MyInput
              name="userName"
              id="userName"
              label="Username"
              type="text"
              placeholder="Enter your username"
            />
            <MyInput
              name="email"
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
            <MyInput
              name="password"
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <MyInput
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Enter your password again"
            />
            <MySelect label="Select your work" name="job" id="job">
              <option value="select your job">Select your job</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </MySelect>
            <MyCheckBox type="checkbox" name="term" id="term">
              <p>I accept with all terms and conditions</p>
            </MyCheckBox>
            <ButtonAuth
              type="submit"
              className="bg-purple-400 text-white py-3 px-5 ml-auto rounded-md float-right mt-4"
              // disabled={formik.isSubmitting}
            >
              Sign up
            </ButtonAuth>

            <NavLink to="/login" className="my-[20px] block text-blue-600">Did you have an account ?Login now</NavLink>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
