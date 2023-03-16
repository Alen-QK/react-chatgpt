import React from 'react';

import LoginIdx from "./pages/UserLS";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import PrivateRoute from "./tools/PrivateRoute";

function App() {
    return (
        <div style={{
            height: "100vh"
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LoginIdx/>}></Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path={'/chatroom'} element={<ChatRoom/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
