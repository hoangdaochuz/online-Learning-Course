import {Form, Formik, useField } from "formik";
import React from "react";
import * as Yup from "yup";
import styled from 'styled-components'

import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {NavLink, useNavigate} from 'react-router-dom'
import {login, reset} from '../../features/auth/authSlice'

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

const SignInForm = ({margin}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  useEffect(()=>{
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user){
      if(user.job === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }
    dispatch(reset())
  },[user,isLoading,isError,isSuccess,message, navigate, dispatch])

  if (isLoading) {
    return (<div className="w-[50px] h-[50px] rounded-full border-4 border-blue-800 border-l-transparent animate-spin mt-[100px]"></div>)
  }

  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validationSchema={Yup.object({
        userName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values, action) => {
        const userData = {
          username: values.userName,
          password: values.password,
        }
        dispatch(login(userData));

      }}
    >
      {(formik) => {
        return (
          <Form className={`max-w-[400px] ${margin ? 'mx-0': 'mx-auto'} pt-[40px]`}>
            <HeadingtAuth className="text-4xl font-semibold text-purple-500 pb-[20px]">
              Sign In
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
              name="userName"
              id="userName"
              label="Username"
              type="text"
              placeholder="Enter your username"
            />
            <MyInput
              name="password"
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <ButtonAuth
              type="submit"
              className="bg-purple-400 text-white py-3 px-5 ml-auto rounded-md float-right mt-4"
              // disabled={formik.isSubmitting}
            >
              Sign in
            </ButtonAuth>

            <NavLink to="/signup" className="my-[20px] block text-blue-600">Create New Account</NavLink>
          </Form>
          
        );
      }}
    </Formik>
    
  );
};

export default SignInForm;