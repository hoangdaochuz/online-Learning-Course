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

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog, id } = props;
    const theme = useTheme()

    const handleDeleteBlog = ()=>{
        console.log(id)
        deleteBlog(id).then((result)=>{
            if(result.status === 'success'){
                toast.success('Blog deleted successfully')
                setTimeout(() => window.location.reload(), 1500)
            }else{
                toast.error('Something went wrong')
            }
        })
    }

    const deleteBlog = async(id) => {
        const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`)
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
                        handleDeleteBlog()
                    }}
                     className="bg-lime-600 w-[50px] text-white font-500"
                >
                    Yes
                </button>
            </DialogActions>
        </Dialog>
    )
}