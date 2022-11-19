import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Hero from '../hero/Hero';
const Layout = ({hideheaderPaths = []}) => {
    const {pathname} = useLocation()
    // console.log(hideheaderPaths.includes(pathName))
    return (
        <>
            {!hideheaderPaths.includes(pathname) && 
                <>
                    <Header/>
                    <Hero/>
                </>
            }
            <Outlet/>
        </>
    );
};

export default Layout;