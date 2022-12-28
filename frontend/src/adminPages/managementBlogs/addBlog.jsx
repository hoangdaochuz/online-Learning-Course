import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography, InputLabel, FormHelperText, Stack} from "@mui/material";
import { Form, Formik, useField } from 'formik';
import "./blog.css";

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
          className="pl-[15px] py-[8px] bg-transparent text-white"
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

        {imgfile.length > 0 && imgfile.map((element, index)=>{
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
          className="pl-[15px] py-[8px] border-2 h-[100px] bg-transparent text-white"
        />
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };


const AdminAddBlog = () => {
    const [imageFile, setImageFile] = useState(null)
    const [startDate, setStartDate] = useState(new Date("2022-12-27"));
    const [endDate, setEndDate] = useState(new Date("2023-01-01"));
    
    const navigate = useNavigate();
    const addBlog = async(data)=>{
      const {title, description, image, startDate, endDate} = data

      const formData = new FormData();
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)
      formData.append('startDate', startDate)
      formData.append('endDate', endDate);
      const response = await axios.post('http://localhost:5000/api/blogs/add', formData, {
        headers: {
          'Content-Type':  `multipart/form-data`,
        }
      })
      return response.data
    }

    const handleGetImageFile = (value)=>{
      setImageFile(value);
    }

    function convertDate(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    return (
        <Formik
            initialValues={{
                title: "",
                image: "",
                description: "",
                startDate: "",
                endDate: ""
            }}

            validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                image: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
            })}

            onSubmit = {(values)=>{
            const data = {
                title: values.title,
                image: imageFile,
                description: values.description,
                startDate: convertDate(startDate),
                endDate: convertDate(endDate)
            }

            addBlog(data).then((result)=>{
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
                    <h2 className="text-center text-[var(--primary-color)] text-[28px] pb-[20px] ">ADD NEW A BLOG</h2>
                    <div className="pb-[70px] mx-10 h-[630px] overflow-y-auto">
                    <MyInputImage label="Image" type="file" name="image" id="image" getFileImage = {handleGetImageFile}/>
                        <MyInput label="Title" type="text" name="title" id="title" placeholder="Please enter a title..." />
                        <MyTextArea label="Description" placeholder="Please enter a description..." type="text" name="description" id="description"/>
                        {/* Apply from Date to Date */}
                        <Box mt="20px">
                        <InputLabel style={{fontSize: "16px", fontWeight: "600", color: "var(--primary-color)"}}>Apply</InputLabel>
                        <Box display="flex" justifyContent="space-between"className="date-picker-apply">
                            <Box className="date-picker-apply-item" display="flex" alignItems="center">
                            <Typography sx={{width: "60px"}}>Start: </Typography>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="yyyy-MM-dd"
                                    id="startDate"
                                    name="startDate"
                                />
                            </Box>
                            <Box className="date-picker-apply-item" display="flex" alignItems="center">
                                <Typography sx={{width: "60px"}}>End: </Typography>
                                <DatePicker
                                selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="yyyy-MM-dd"
                                    id="endDate"
                                    name="endDate"
                                />
                            </Box>
                    </Box>
                </Box>
                        <button className="float-right  ml-[20px] mt-[20px] bg-[var(--primary-color)] text-white text-base px-[20px] py-[5px] rounded-lg" type="submit">POST</button>

                        <button className="float-right mt-[20px] border bg-red-600 text-white text-base px-[20px] py-[5px] rounded-lg " onClick={() => navigate("/management-blogs")}>BACK</button>
                    </div>
                </Form>
            </Formik>
    );

};

export default AdminAddBlog;

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { Form, Formik, useField } from 'formik';
// import { toast } from 'react-toastify';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { Box, Typography, useTheme, IconButton, TextField, Input, TextareaAutosize,
// FormControl, InputLabel, FormHelperText, Stack} from "@mui/material";
// import Button from '@mui/material/Button';
// import { AddCircleOutlineOutlined, HighlightOffOutlined } from '@mui/icons-material';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { CssBaseline } from "@mui/material";
// import "./blog.css";

// const MyInputImage = ({ label,getFileImage, ...props }) => {
//     const [field, meta] = useField(props);
//     const [imgfile, uploadimg] = useState([]);
//     const imgFileHandler = (e)=>{
//         if (e.target.files.length !== 0) {
//             uploadimg(imgfile => [...imgfile, URL.createObjectURL(e.target.files[0])])
//         }
//     }

//     return (
//       <div className="flex flex-col mb-4">
//         <label htmlFor={props.id || props.name} className="mb-[8px] text-base font-semibold text-[var(--primary-color)]">
//           {label}
//         </label>
//         <input
//           {...props}
//           {...field}
//           className="pl-[15px] py-[8px]"

//           onChange = {(e)=>{
//             field.onChange(e)
//             imgFileHandler(e);
//             getFileImage(e.target.files[0]);
//           }}
//         />

//         {imgfile.length>0 && imgfile.map((element, index)=>{
//             return (
//                 <span key={index} className="block w-[100px] h-[100px]">
//                     <img src={element} className = "w-full h-full" alt="" />
//                 </span>
//             )
//         })}
  
//         {meta.touched && meta.error ? (
//           <div className="text-red-600">{meta.error}</div>
//         ) : null}
//       </div>
//     );
// };

// const AdminAddBlog = () => {
//     const styleInput = {
//         width: "100%",
//         backgroundColor: "transparent",
//         border: "0.5px solid #ccc",
//         outline: "none",
//         borderRadius: "4px",
//         padding: "10px"
//     }
    
//     const styleTextArea = {
//         height: "150px"
//     }
    

//     function convertDate(str) {
//         var date = new Date(str),
//         mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//         day = ("0" + date.getDate()).slice(-2);
//         return [date.getFullYear(), mnth, day].join("-");
//     }

//     const [image, setImage] = useState(null)
//     const styleImage = {
//         height: "300px",
//         width: "100%",
//         borderRadius: "4px",
//         objectFit: "cover",
//     }
//     const onImageChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//           setImage(URL.createObjectURL(event.target.files[0]));
//         }
//     }

//     const [imageFile, setImageFile] = useState(null)
//     const [title, setTitle] = useState('')
//     const [description, setDescription] = useState('')

//     const [startDate, setStartDate] = useState(new Date("2022-12-27"));
//     const [endDate, setEndDate] = useState(new Date("2023-01-01"));

//     const theme = useTheme();
//     const navigate = useNavigate();

//     const handleGetImageFile = (value)=>{
//       setImageFile(value);
//     }

//     const handleRefresh = () => {
//         setImage('')
//         setTitle('')
//         setDescription('')  
//     }

//     const addBlog = async(data)=>{
//         const {title, description, image, startDate, endDate} = data
//         const formData = new FormData();
//         formData.append('title', title)
//         formData.append('description', description)
//         formData.append('image', image)
//         formData.append('startDate', startDate)
//         formData.append('endDate', endDate)

//         const response = await axios.post('http://localhost:5000/api/blogs/add', formData,
//         {
//           headers: {
//             'Content-Type':  "multipart/form-data",
//           }
//         })
//         console.log(response)
//         return response.data
//     }

//     return (
//         <Box
//             component="form"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             mt="20px"
//         >   
            // <Box sx={{width: "60%"}}>
            //     {image && <Box
            //         component="img"
            //         src={image}
            //         sx={{...styleImage}}
            //     >
            //     </Box>
            //     }
//                 <Box mt="20px">
//                     {/* <InputLabel>Image</InputLabel>
//                     <Input 
//                         required
//                         type="file"
//                         id="image"
//                         name="image"
//                         sx={{...styleInput}}
//                         // onClick = {handleGetImageFile}
//                         // onChange={onImageChange}
//                         onChange={handleGetImageFile}
//                     /> */}
//                     <MyInputImage label="Image" type="file" name="image" id="image" getFileImage = {handleGetImageFile}/>
//                 </Box>
//                 <Box mt="20px">
//                     <InputLabel>Title</InputLabel>
//                     <Input
//                         type="text"
//                         required
//                         id="title"
//                         name="title"
//                         placeholder="Please enter a title..."
//                         sx={{...styleInput}}
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </Box>
//                 <Box mt="20px">
//                     <InputLabel>Description</InputLabel>
//                     <TextareaAutosize
//                         aria-label="Description"
//                         required
//                         id="description"
//                         name="description"
//                         placeholder="Please enter a description..."
//                         style={{...styleTextArea, ...styleInput}}
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </Box>
//                 {/* Apply from Date to Date */}
//                 <Box mt="20px">
//                     <InputLabel>Apply</InputLabel>
//                     <Box display="flex" justifyContent="space-between"className="date-picker-apply">
//                         <Box className="date-picker-apply-item" display="flex" alignItems="center">
//                             <Typography sx={{width: "60px"}}>Start: </Typography>
//                             <DatePicker
//                                 selected={startDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 selectsEnd
//                                 startDate={startDate}
//                                 endDate={endDate}
//                                 minDate={startDate}
//                                 dateFormat="yyyy-MM-dd"
//                                 id="startDate"
//                                 name="startDate"
//                             />
//                         </Box>
//                         <Box className="date-picker-apply-item" display="flex" alignItems="center">
//                             <Typography sx={{width: "60px"}}>End: </Typography>
//                             <DatePicker
//                                 selected={endDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 selectsEnd
//                                 startDate={startDate}
//                                 endDate={endDate}
//                                 minDate={startDate}
//                                 dateFormat="yyyy-MM-dd"
//                                 id="endDate"
//                                 name="endDate"
//                             />
//                         </Box>
//                     </Box>
//                 </Box>
                
//                 <Stack spacing={2} direction="row" className="btns-control-add-blog" mt="20px">
//                     <Button 
//                         variant="contained" 
//                         color="secondary" 
//                         size="medium"
//                         onClick={() => navigate("/management-blogs")}
//                     >Back</Button>
//                     <Button 
//                         variant="contained" 
//                         color="error" 
//                         size="medium"
//                         className="btn-refresh-add-blog"
//                         onClick={handleRefresh}
//                     >Refresh</Button>
//                     <Button 
//                         variant="contained" 
//                         color="success" 
//                         size="medium"
//                         type="submit"
//                         // onClick = {(e)=>{
//                         //     e.preventDefault()

//                         //     const data = {
//                         //       title: document.getElementById("title").value,
//                         //       description: document.getElementById("description").value,
//                         //       image: imageFile,
//                         //       startDate: convertDate(startDate),
//                         //       endDate: convertDate(endDate),
//                         //     }
//                         //     console.log("Image: " + image)
//                         //     addBlog(data).then((result) =>{
//                         //         if(result.status ==='success'){
//                         //           alert("YESSSSSSSSSSSSS")
//                         //         }else{
//                         //           alert("NOSSSSSSSSSS")
//                         //         }
//                         //     })
//                         //   }}
//                         onSubmit = {(values)=>{
//                             const data = {
//                               title: values.title,
//                               image: imageFile,
//                               description: values.description,
//                               startDate: convertDate(startDate),
//                               endDate: convertDate(endDate)
//                             }
              
//                             console.log("Image: " + imageFile)
//                             addBlog(data).then((result)=>{
//                               if(result.status ==='success'){
//                                 toast.success('Add Course Successfully')
//                               //   window.location.reload();
//                               }else{
//                                 toast.error('Some thing went wrong')
//                               }
//                             })
              
//                           }}
//                     >Post</Button>
//                 </Stack>
//             </Box>
//         </Box>
//     )
// }

// export default AdminAddBlog;

