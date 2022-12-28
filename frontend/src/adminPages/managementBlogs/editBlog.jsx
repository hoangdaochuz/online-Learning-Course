import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useLocation} from 'react-router-dom';
import { Box, Typography, useTheme, IconButton, TextField, Input, TextareaAutosize,
FormControl, InputLabel, FormHelperText, Stack} from "@mui/material";
import Button from '@mui/material/Button';
import { AddCircleOutlineOutlined, HighlightOffOutlined } from '@mui/icons-material';
import ConfirmDialogUpdate from "./confirmDialogUpdateBlog";
import useDebounce from "../../myhooks/useDebounce";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./blog.css";

const AdminEditBlog = () => {
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
    
    const {pathname} = useLocation()
    const pathStringArray = pathname.split('/')
    const id_blog = pathStringArray[pathStringArray.length - 1]

    function convertDate(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
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
    const [searchQuery, setSearchQuery] = useState("");
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const searchValueDebounce = useDebounce(searchQuery, 1000);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: ''})

    const handleRefresh = () => {
        setImage('')
        setTitle('')
        setDescription('')  
    }

    const getInfoBlog = async() => {
        const response = await axios.get(`http://localhost:5000/api/blogs/detail/${id_blog}`)
        return response.data
    }

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            getInfoBlog(searchValueDebounce).then((result) => {
            setBlog(result);
            setLoading(false);

            setLoading(false);
            if(result.title !== undefined) {
                setImage(result.image)
                setTitle(result.title)
                setDescription(result.description)
                setStartDate(new Date(result.start_date))
                setEndDate(new Date(result.end_date))
            }
        });
        }, 500);
        return () => {
        clearTimeout(timer);
        };
    }, [searchValueDebounce]);

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
                        placeholder='Please enter a title...'
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
                        placeholder='Please enter a description...'
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
                        onClick={() => window.location.reload()}
                    >Refresh</Button>
                    <Button 
                        variant="contained" 
                        color="success" 
                        size="medium"
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: 'Are you sure to update this blog?',
                                subTitle: "You can't undo this operation",
                            })
                        }}
                    >Update</Button>
                </Stack>
            </Box>
            <ConfirmDialogUpdate
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                id_blog={id_blog}
                title={title}
                description={description}
                image={imageFile}
                startDate={convertDate(startDate)}
                endDate={convertDate(endDate)}
            />
        </Box>
    )
}

export default AdminEditBlog;

