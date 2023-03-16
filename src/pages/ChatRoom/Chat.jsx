import React, {useEffect, useRef} from 'react';
import Mes from "./Mes";
import ButtonAppBar from "./APPbar";
import {useSelector} from "react-redux";
import {Box, Grid, Paper} from "@mui/material";
import ChatInputForm from "./ChatInputForm";

const Chat = () => {
    let chatHistory = useSelector(state => state.chatInfo);
    // 如何实现自动滚动至底，注意被Ref的scroll需要放在包裹聊天记录的div里面，这里就是Paper
    let scroll = useRef(null);

    const scrollToBottom = () => {
        scroll.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom()
    }, [chatHistory]);

    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                  width: '100%',
                  height: '100%',
              }}>
            <ButtonAppBar></ButtonAppBar>
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
                <div ref={scroll}></div>
            </Paper>

            <ChatInputForm/>
        </Grid>
    )
}

export default Chat