import React, {useState} from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "theme";
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'adminComponents/Navbar';
import Sidebar from 'adminComponents/Sidebar';
import { useGetUserQuery } from 'adminState/api';

const AdminLayout = () => {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isNoneMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const {user} = useSelector((state) => state.auth);
    console.log(user);
 
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box display={isNoneMobile ? "flex" : "block"} width="100%" height="100%">
                <Sidebar 
                    user={user || {}}
                    isNoneMobile={isNoneMobile}
                    drawerWidth="250px"
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen} 
                />
                <Box flexGrow={1}>
                    <Navbar 
                        user={ user || {}}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen} 
                    />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    )
};

export default AdminLayout;