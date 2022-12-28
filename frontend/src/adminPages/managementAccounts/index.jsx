import React from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Header from "../../adminComponents/Header";
import { useState, useEffect } from 'react';
import axios  from 'axios';
import "adminComponents/responsive.css";


const URL_API_ACCOUNTS = "http://localhost:5000/api/users/management-accounts";

const AdminManagementAccounts = () => {
    const theme = useTheme();
    const [listAccounts, setListAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListAccounts = async () => {
        setLoading(true);
        const response = await axios.post(URL_API_ACCOUNTS);
        return response.data;
    };
    useEffect(() => {
        getListAccounts().then((listAccounts) => {
            setListAccounts(listAccounts);
            setLoading(false);
        });
    }, []);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "fullname",
            headerName: "Full Name",
            flex: 1
        },
        {
            field: "username",
            headerName: "Username",
            flex: 0.5
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "job",
            headerName: "Job",
            flex: 0.5
        }, 
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1
        }
    ]

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ACCOUNTS" subtitle="These Are The Accounts"/>
            <Box 
                m="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                      fontSize: "0.8rem"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.background.alt,
                      color: theme.palette.secondary[100],
                      borderBottom: "none",
                      fontSize: "0.9rem"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: theme.palette.background.alt,
                      color: theme.palette.secondary[100],
                      borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `${theme.palette.secondary[200]} !important`,
                    },
                  }}
                  className="datagrid-table-view-accounts"
            >
                <DataGrid
                    loading={loading || !listAccounts}
                    getRowId={(row) => row._id}
                    rows={listAccounts || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default AdminManagementAccounts;