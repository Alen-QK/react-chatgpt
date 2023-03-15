import React from 'react';
import Mes from "./Mes";
import {useSelector} from "react-redux";
import {Box, Grid, Paper} from "@mui/material";
import ChatInputForm from "./ChatInputForm";

const Chat = () => {
    let chatHistory = useSelector(state => state.chatInfo);

    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                  width: '100%',
                  height: '100%',
              }}>
            <Paper elevation={10} sx={{
                display: 'flex',
                width: '50%',
                height: '80%',
                flexDirection: 'column',
                padding: '10px',
                maxHeight: '80%',
                overflow: 'auto'
            }}>
                {
                    chatHistory.map((item) => {
                        return <Mes key={item.id} role={item.role} message={item.content}/>
                    })
                }
            </Paper>

            <ChatInputForm/>
        </Grid>
    )
}

export default Chat