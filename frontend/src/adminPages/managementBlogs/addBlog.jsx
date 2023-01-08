import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Formik, useField } from 'formik';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, IconButton, TextField, Input, TextareaAutosize,
FormControl, InputLabel, FormHelperText, Stack} from "@mui/material";
import Button from '@mui/material/Button';
import { AddCircleOutlineOutlined, HighlightOffOutlined } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./blog.css";

const AdminAddBlog = () => {
    const styleInput = {
        width: "100%",
        backgroundColor: "transparent",
        border: "0.5px solid #ccc",
        outline: "none",
        borderRadius: "4px",
        padding: "10px"
    }
    
    const styleTextArea = {
        height: "150px"
    }
    

    function convertDate(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }   

    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const styleImage = {
        height: "300px",
        width: "100%",
        borderRadius: "4px",
        objectFit: "cover",
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setImageFile(event.target.files[0])
        }
    }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(new Date("2022-12-27"));
    const [endDate, setEndDate] = useState(new Date("2023-01-01"));

    const theme = useTheme();
    const navigate = useNavigate();

    const handleRefresh = () => {
        setImage('')
        setTitle('')
        setDescription('')  
    }

    const addBlog = async(data)=>{
        const {title, description, image, startDate, endDate} = data
        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)

        if(title && description && image) {
            if(isFileImage(image)) {
                const response = await axios.post('http://localhost:5000/api/blogs/add', formData,
                {
                  headers: {
                    'Content-Type':  "multipart/form-data",
                  }
                })
                return response.data
            } else {
                return "error"
            }
        } else {
            return "error"
        }
    }

    return (
        <Box
            component="form"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="20px"
        >   
            <Box sx={{width: "60%"}}>
                {image && <Box
                    component="img"
                    src={image}
                    sx={{...styleImage}}
                >
                </Box>
                }
                <Box mt="20px">
                    <InputLabel>Image</InputLabel>
                    <Input 
                        required
                        type="file"
                        id="image"
                        name="image"
                        sx={{...styleInput}}
                        onChange={onImageChange}
                    />
                </Box>
                <Box mt="20px">
                    <InputLabel>Title</InputLabel>
                    <Input
                        type="text"
                        required
                        id="title"
                        name="title"
                        placeholder="Please enter a title..."
                        sx={{...styleInput}}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>
                <Box mt="20px">
                    <InputLabel>Description</InputLabel>
                    <TextareaAutosize
                        aria-label="Description"
                        required
                        id="description"
                        name="description"
                        placeholder="Please enter a description..."
                        style={{...styleTextArea, ...styleInput}}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                {/* Apply from Date to Date */}
                <Box mt="20px">
                    <InputLabel>Apply</InputLabel>
                    <Box display="flex" justifyContent="space-between"className="date-picker-apply">
                        <Box className="date-picker-apply-item" display="flex" alignItems="center">
                            <Typography sx={{width: "60px"}}>Start: </Typography>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsEnd
                                startDate={startDate}
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
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="yyyy-MM-dd"
                                id="endDate"
                                name="endDate"
                            />
                        </Box>
                    </Box>
                </Box>
                
                <Stack spacing={2} direction="row" className="btns-control-add-blog" mt="20px">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="medium"
                        onClick={() => navigate("/management-blogs")}
                    >Back</Button>
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="medium"
                        className="btn-refresh-add-blog"
                        onClick={handleRefresh}
                    >Refresh</Button>
                    <Button 
                        variant="contained" 
                        color="success" 
                        size="medium"
                        type="submit"
                        onClick = {(e)=>{
                            e.preventDefault()
                            const data = {
                              title: title,
                              image: imageFile,
                              description: description,
                              startDate: convertDate(startDate),
                              endDate: convertDate(endDate)
                            }
              
                            addBlog(data).then((result)=>{
                              if(result.status ==='success'){
                                toast.success('Add Blog Successfully!')
                                setTimeout(() => window.location.reload(), 1000)
                              }else{
                                toast.error('Please fill all fields!')
                              }
                            })
              
                          }}
                    >Post</Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default AdminAddBlog;

