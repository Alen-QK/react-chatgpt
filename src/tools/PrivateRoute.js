import {useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";

// 私有路由保护，利用redux和router的组合，为/chatroom地址提供保护，直接访问该地址将被拒绝
const PrivateRoute = () => {
    let auth = useSelector(state => state.authMange);

    return (
        auth ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default PrivateRoute