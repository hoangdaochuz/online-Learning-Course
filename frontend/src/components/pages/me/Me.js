import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const API_URL_ME = "http://localhost:5000/api/users/me/";

const StyledMeContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding-bottom: 40px;
  .profile-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  .disable {
    background-color: #ccc;
    cursor: default;
  }

  @media screen and (max-width: 1024px) {
    .profile-container {
      margin-left: 20px;
    }
  }

  @media screen and (max-width: 767px) {
    .profile-container{
      grid-template-columns: 1fr;
      margin-right: 20px;
    }
    .information-account-wrapper{
      margin-top: 20px;
    }
    .form-item{
      width: 100%;
    }
    .form-wrapper{
      margin-left: 0;
    }
    .information-account-heading{
      text-align: center;
      margin-left: 0;
      padding-bottom: 20px;
    }
    .btn-save-profile{
      align-self: center;
      margin-left: 0;
      min-width: 100px;
    }
  }

  @media screen and (max-width: 350px) {
    .profile-img-box{
      width: 200px;
      height: 200px;
    }
  }
`;

const MyInput = ({ label, loading, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col relative">
      <label
        htmlFor={props.id || props.name}
        className="font-semibold text-base mb-2"
      >
        {label}
      </label>
      <input
        {...props}
        {...field}
        className="w-1/2 px-3 py-2 rounded-lg mb-3 form-item"
      />
      {loading && (
        <span className="block w-[15px] h-[15px]  border-2 rounded-full border-l-transparent animate-spin ml-[200px] border-blue-600 absolute bottom-[25px] right-[52%]"></span>
      )}
    </div>
  );
};

const MySelect = ({ label, loading, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col relative">
      <label
        htmlFor={props.id || props.name}
        className="font-semibold text-base mb-2"
      >
        {label}
      </label>
      <select
        {...props}
        {...field}
        className="w-1/2 bg-slate-300 px-3 py-2 rounded-lg mb-3  form-item"
      ></select>
      {loading && (
        <span className="block w-[15px] h-[15px] border-2 rounded-full border-l-transparent animate-spin ml-[200px] border-blue-600 absolute bottom-[25px] right-[52%]"></span>
      )}
    </div>
  );
};

const Me = () => {
  // const [userInfo, setUserInfo] = useState({});
  const { user } = useSelector((state) => state.auth);
  // const [loading, setLoading] = useState(true);
  // const token = user.token;
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };

  // const getInfoUser = async () => {
  //   setLoading(true);
  //   const response = await axios.get(API_URL_ME, config);
  //   // console.log(response.data)
  //   return response.data;
  // };

  // useEffect(() => {
  //   getInfoUser().then((data) => {
  //     setUserInfo({
  //       fullname: data.fullname,
  //       username: data.username,
  //       email: data.email,
  //       job: data.job,
  //     });
  //     setLoading(false);
  //   });
  // }, []);
  // console.log(userInfo.fullname);
  return (
    <StyledMeContainer className="container">
      <h1 className="text-center text-[var(--primary-color)] text-[46px] py-10">
        Profile
      </h1>
      <div className="profile-container">
        <div>
          <div className="profile-img-box w-[300px] h-[300px] rounded-full border-8 border-cyan-500 mx-auto">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png"
              alt="avatar"
              className="w-full h-full rounded-full bg-[var(--primary-color)]"
            />
          </div>
          <h2 className="text-center mt-[18px] font-medium text-xl">
            
              {user.username}
            
          </h2>
        </div>
        <div className="information-account-wrapper">
          <h1 className="information-account-heading text-2xl font-semibold pb-10 ml-20">
            Account Information
          </h1>
          <Formik
            initialValues={{
              fullname: user.fullname || "",
              username: user.username || "",
              email: user.email || "",
              job: user.job || "",
            }}
            enableReinitialize
            validationSchema={Yup.object({})}
            onSubmit={(values) => {
              const userChange = {
                fullname: values.fullname,
                username: values.username,
                email: values.email,
                job: values.job,
              };
              console.log(userChange);
            }}
          >
            <Form className="form-wrapper flex flex-col ml-20">
              <MyInput
                
                label="Full name"
                name="fullname"
                id="fullname"
                type="text"
              ></MyInput>
              <MyInput
                
                label="Username"
                name="username"
                id="username"
                type="text"
              ></MyInput>
              <MyInput
                
                label="Email"
                name="email"
                id="email"
                type="text"
              ></MyInput>
              <MySelect  label="Job" name="job" id="job">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </MySelect>
              <button

                type="submit"
                className="w-[20%] flex-shrink-0 bg-[var(--primary-color)] text-white px-5 py-2 rounded-xl text-lg mt-10 ml-[30%] disable btn-save-profile"
                disabled
              >
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </StyledMeContainer>
  );
};

export default Me;
