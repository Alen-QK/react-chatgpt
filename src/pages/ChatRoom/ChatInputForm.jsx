import React, {useState} from 'react';
import {Box, Button, FormControl, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import uuid from "react-uuid";
import {ADD_MESSAGE} from "../../constants/cons";

const ChatInputForm = () => {
    let [text, setText] = useState('');
    let chatHistory = useSelector(state => state.chatInfo);
    let userid = useSelector(state => state.userInfo).id;
    let PORT = process.env.REACT_APP_PORT;
    let dispatch = useDispatch();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setText('');

        const newText = {
            role: 'user',
            content: text,
            id: uuid()
        };

        const userAction = {
            type: ADD_MESSAGE,
            payload: newText
        };

        dispatch(userAction);

        chatHistory.push(newText);

        const postBody = {
            id: userid,
            data: chatHistory
        };

        axios.post(`http://localhost:${PORT}/api.chatgpt`, postBody)
            .then((response) => {
                let newChat = response.data.data;

                newChat = {
                    ...newChat,
                    id: uuid()
                };

                const gptAction = {
                    type: ADD_MESSAGE,
                    payload: newChat
                };

                dispatch(gptAction);
            })
    }

    return (
        <Box style={{
            marginTop: '10px',
            width: '50%'
        }}>
            <form onSubmit={handleSubmit}>
                <FormControl style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TextField label={'Type Something...'} placeholder={'Write what you want to chat...'} required={true} fullWidth={true} onChange={handleChange} value={text}></TextField>
                    <Button variant="contained" endIcon={<SendIcon />} sx={{marginLeft: 5}} type={'submit'}>
                        Send
                    </Button>
                </FormControl>
            </form>
        </Box>
    )
}

export default ChatInputForm