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
    let jwt = useSelector(state => state.userInfo).jwt;
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
        // 这里不能在dispatch前就修改chatHistory，或者说Redux并不允许你在dispatch前就修改当前state内的状态，然后还希望将此时修改的状态覆盖到reducer的state中。
        // 正确的做法只能如当前所示，即你只能把要更新的那部分dispatch给reducer，让reducer去用这部分更新state，而不能指望在这里直接更新当前对于原先state的引用然后传入reducer覆盖它
        dispatch(userAction);

        chatHistory.push(newText);

        const postBody = {
            data: chatHistory
        };

        const config = {
            headers: {
                jwt: jwt
            }
        };

        axios.post(`http://localhost:${PORT}/api.chatgpt`, postBody, config)
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
                    <TextField label={'Type Something...'} placeholder={'Write what you want to chat...'}
                               required={true} fullWidth={true} onChange={handleChange} value={text}></TextField>
                    <Button variant="contained" endIcon={<SendIcon/>} sx={{marginLeft: 5}} type={'submit'}>
                        Send
                    </Button>
                </FormControl>
            </form>
        </Box>
    )
}

export default ChatInputForm