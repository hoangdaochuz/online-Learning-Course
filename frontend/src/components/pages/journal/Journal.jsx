import { 
    Box, 
    Typography, 
    useTheme, 
    IconButton, 
    Card,
    CardContent,
    Collapse,
    Button,
    useMediaQuery,
    Stack
} from "@mui/material";
import { React, useState, useEffect } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import FlexBetween from 'adminComponents/FlexBetween';
import useDebounce from "../../../myhooks/useDebounce";

const Journal = ({
    id,
    title,
    description,
    image,
    start_date,
    end_date,
  }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          border: "1px solid #ccc"
        }}
      >
        <CardContent>
            <Box
                component="img"
                alt="blog"
                src={image}
                height="400px"
                width="100%"
                borderRadius="5px"
                sx={{ objectFit: "cover" }}
            />
            <Box>
              <Typography
                fontWeight="bold"
                fontSize="1.7rem"
                sx={{ color: theme.palette.secondary[100] }}
                mt="5px"
              >
                {title}
              </Typography>
              <Stack spacing={2} direction="row">
                <Typography
                    fontSize="1.4rem"
                    sx={{ color: theme.palette.secondary[100]}}
                >
                   Apply: {start_date} - {end_date}
                </Typography>
              </Stack>
            </Box>
            <Button
                variant="contained"
                size="large"
                sx={{ color: theme.palette.secondary[100], height: "100%" }}
                className="btns-manage-blogs-item"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                See More
                </Button>
        </CardContent>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Typography sx={{fontSize: "1.4rem"}}>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

const Journals = () => {
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
                {allBlogs || !loading ? (
                    <Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        justifyContent="space-between"
                        rowGap="25px"
                        columnGap="1.5%"
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
                        <Journal
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

export default Journals;