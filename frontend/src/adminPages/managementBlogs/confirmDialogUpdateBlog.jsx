import React from 'react';
import {NotListedLocationOutlined} from '@mui/icons-material';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Typography, 
    IconButton,
    Button,
    useTheme
} from "@mui/material";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ConfirmDialogUpdate(props) {

    const { confirmDialog, setConfirmDialog, id_blog, title, description, image, startDate, endDate } = props;
    const theme = useTheme()

    const handleEditBlog = ()=>{
        const data = {title, description, image, startDate, endDate }
        EditBlog(data).then((result)=>{
            if(result.status ==='success'){
              toast.success('Update Blog Successfully')
              setTimeout(() => window.location.reload(), 1000)
            }else{
              toast.error('Some thing went wrong')
            }
        })
    }

    const EditBlog = async(data) => {
        const {title, description, image, startDate, endDate} = data
        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)

        const response = await axios.put(`http://localhost:5000/api/blogs/${id_blog}`, formData,
        {
          headers: {
            'Content-Type':  "multipart/form-data",
          }
        })
        return response.data
    }

    return (
        <Dialog open={confirmDialog.isOpen} 
            sx={{
                padding: theme.spacing(2),
                position: 'absolute',
                top: theme.spacing(5)
            }}
        > 
            <DialogTitle 
                sx={{textAlign: 'center'}}
            >
                <IconButton disableRipple 
                    sx={{color: "red"}}
                >
                    <NotListedLocationOutlined sx={{fontSize: "40px"}}/>
                </IconButton>
            </DialogTitle>
            <DialogContent 
                sx={{textAlign: 'center'}}
            >
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{justifyContent: 'center'}}
            >
                <button
                    onClick = {() => {
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                    }}
                    className="bg-red-500 w-[50px] text-white font-500"
                >No</button>
                <button
                    onClick={() => {
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                        handleEditBlog()
                    }}
                     className="bg-lime-600 w-[50px] text-white font-500"
                >
                    Yes
                </button>
            </DialogActions>
        </Dialog>
    )
}