import { 
    Box, 
    Typography, 
    useTheme, 
    IconButton, 
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Rating,
    useMediaQuery,
    Stack,
    ActionButton,
    Link
} from "@mui/material";
import Header from "../../adminComponents/Header";
import { React, useState, useEffect } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import FlexBetween from 'adminComponents/FlexBetween';
import useDebounce from "../../myhooks/useDebounce";
import ConfirmDialog from "./confirmDialogDeleteBlog";
import AdminEditBlog from "./editBlog";

const AdminManagementBlog = ({
    id,
    title,
    description,
    image,
    start_date,
    end_date,
  }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: ''})

    const handleDeleteBlog = async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`)
        return response.data
    }
    
    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
            <Box
                component="img"
                alt="blog"
                src={image}
                height="200px"
                width="100%"
                borderRadius="5px"
                sx={{ objectFit: "cover" }}
            />
            <Box>
              <Typography
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{ color: theme.palette.secondary[100] }}
                mt="5px"
              >
                {title}
              </Typography>
              <Stack spacing={2} direction="row">
                <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[100] }}
                >
                    {start_date} - {end_date}
                </Typography>
              </Stack>
            </Box>
            <Stack spacing={2} direction="row" className="btns-manage-blogs">
                <Button 
                    variant="contained" 
                    sx={{ color: theme.palette.secondary[100] }}
                    size="medium"
                    className="btns-manage-blogs-item"
                    onClick={() => navigate(`/management-blogs/edit-blog/${id}`)}
                >Edit</Button>
                <Button 
                    variant="contained" 
                    sx={{ color: theme.palette.secondary[100] }}
                    size="medium"
                    className="btns-manage-blogs-item"
                    onClick={() => {
                        setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this blog?',
                            subTitle: "You can't undo this operation",
                            id: id
                        })
                    }}
                >Remove</Button>
                {/* <CardActions pt="10px">
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ color: theme.palette.secondary[100], height: "100%" }}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        See More
                    </Button>
                </CardActions> */}
                <Button
                        variant="contained"
                        size="medium"
                        sx={{ color: theme.palette.secondary[100], height: "100%" }}
                        className="btns-manage-blogs-item"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        See More
                </Button>
            </Stack>
        </CardContent>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography>ID: {id}</Typography>
            <Typography>Description: {description}</Typography>
          </CardContent>
        </Collapse>
        <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
            id={id}
        />
      </Card>
    );
  };

const AdminManagementBlogs = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchValueDebounce = useDebounce(searchQuery, 1000);

    function convertDate(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const allBlogs = async (queryString) => {
        setLoading(true);
        const response = await axios.get(
        `http://localhost:5000/api/blogs/list`
        );
        return response.data;
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
        allBlogs(searchValueDebounce).then((result) => {
            setBlogs(result);
            setLoading(false);
        });
        }, 500);
        return () => {
        clearTimeout(timer);
        };
    }, [searchValueDebounce]);

    const isNoneMobile = useMediaQuery("(min-width: 1000px)");
    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Header title="MANAGEMENT BLOGS" subtitle="These Are The Blogs"/>
                <Box display="flex" alignItems="center" mt="10px">
                    <IconButton onClick={() => navigate('/management-blogs/add-blog')}>
                        <AddCircleOutlineOutlined />
                    </IconButton>
                    <Typography fontSize="0.9rem">Add New Blog</Typography>
                </Box>
            </Box>
            <Box m="1.5rem 2.5rem">
                {allBlogs || !loading ? (
                    <Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%"
                        sx={{
                            "& > div": { gridColumn: isNoneMobile ? undefined : "span 4" },
                        }}
                    >
                    {blogs.map(
                        ({
                            id,
                            title,
                            description,
                            image,
                            start_date,
                            end_date,
                        }) => (
                        <AdminManagementBlog
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            image={image}
                            start_date={convertDate(start_date)}
                            end_date={convertDate(end_date)}
                        />
                        )
                    )}
                    </Box>
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </>
    );
};

export default AdminManagementBlogs;