import React from 'react';

import LoginIdx from "./pages/UserLS";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";

function App() {
    return (
        <div style={{
            height: "100vh"
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LoginIdx/>}></Route>
                    <Route path={'/chatroom'} element={<ChatRoom/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
