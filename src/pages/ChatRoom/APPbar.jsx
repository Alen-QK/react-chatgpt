import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LOGOUT} from "../../constants/cons";

export default function ButtonAppBar() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleLogOut = () => {
        navigate('/');

        const action = {
            type: LOGOUT,
            payload: null
        };

        dispatch(action);
    }

    return (
        <Box sx={{ flexGrow: 1,  width: '100%'}}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}