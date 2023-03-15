import React from 'react';
import {Paper} from "@mui/material";

const Mes = (props) => {
    const role = props.role;
    const message = props.message;
    let MesStyle = role === 'user' ? {
        padding: '10px',
        maxWidth: '250px',
        borderRadius: '30px',
        backgroundColor: '#4985f5',
        color: 'white',
        alignSelf: 'flex-end'
    } : {
        padding: '10px',
        maxWidth: '250px',
        borderRadius: '30px',
        backgroundColor: '#d9d9d9',
        color: 'black',
    }

    return (
        <Paper elevation={10} style={MesStyle}>
            {message}
        </Paper>
    )
}

export default Mes