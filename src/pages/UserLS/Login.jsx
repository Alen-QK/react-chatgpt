import React, {useState} from 'react';
import axios from "axios";
import {Avatar, Button, FormControl, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {UtB, BtU} from '../../tools/B64';
import {LOGIN} from "../../constants/cons";

const Login = () => {
    let [l_s, setLS] = useState(true);
    let [username, setUsername] = useState('');
    let [pwd, setPwd] = useState('');
    let PORT = process.env.REACT_APP_PORT;
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const SwitchLS = () => {
        setLS(!l_s);
    };

    const InitDB = () => {
        console.log(PORT)
        axios.post(`http://localhost:${PORT}/api.db`)
            .then((response) => {
                if (response.data.code === 210) {
                    alert('DataBase init success!');
                } else {
                    alert('DataBase existed, no need to init!');
                }
            })
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePwdChange = (event) => {
        setPwd(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsername('');
        setPwd('');

        let id = UtB(username);

        let data = {
            id: id,
            name: username,
            pwd: pwd
        };
        // 登陆
        if (l_s) {
            axios.post(`http://localhost:${PORT}/api.login`, data)
                .then((response) => {
                    if (response.status !== 200) {
                        console.log('Error');
                    } else {
                        if (response.data.code === 311) {
                            alert(response.data.data)
                        }
                        else if (response.data.code === 312) {
                            alert(response.data.data)
                        }
                        else {
                            const action = {
                                type: LOGIN,
                                payload: {id: data.id, name: data.name}
                            };

                            dispatch(action);
                            navigate('/chatroom');
                        }
                    }
                })
        }
        // 注册
        else {
            axios.post(`http://localhost:${PORT}/api.signup`, data)
                .then((response) => {
                    if (response.status !== 200) {
                        console.log('Error');
                    } else {
                        if (response.data.code === 311) {
                            alert(response.data.data)
                        } else (
                            alert(response.data.data)
                        )
                    }
                })
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={{
                padding: 20,
                height: '40vh',
                width: 280,
                margin: '100px auto'
            }}>
                <Grid align={'center'}>
                    <Avatar style={{
                        backgroundColor: '#12c3d0'
                    }}><LockIcon/></Avatar>
                    {l_s && <h2>Sign In</h2>}
                    {!l_s && <h2>Sign Up</h2>}
                </Grid>

                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth={true}>
                        <TextField variant="standard" label={'Username'} placeholder={'Enter your username'} fullWidth={true} required={true} onChange={handleUsernameChange} value={username}></TextField>
                        <TextField variant="standard" label={'Password'} placeholder={'Password'} fullWidth={true} required={true} onChange={handlePwdChange} value={pwd}></TextField>

                        {l_s && <Button type={'submit'} variant="contained" fullWidth={true} style={{
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>Sign in</Button>}

                        {!l_s && <Button type={'submit'} variant="contained" fullWidth={true} style={{
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>Sign up</Button>}
                    </FormControl>
                </form>

                {l_s && <Typography >
                    Don't have account?<Link onClick={SwitchLS} style={{
                    cursor: 'pointer'
                }}> Sign up!</Link>

                </Typography>}

                {!l_s && <Typography >
                    Sign an account?<Link onClick={SwitchLS} style={{
                    cursor: 'pointer'
                }}> Go Login!</Link>

                </Typography>}



                <Link onClick={InitDB} style={{
                    cursor: 'pointer'
                }}>Init DataBase</Link>
            </Paper>
        </Grid>
    )
}

export default Login