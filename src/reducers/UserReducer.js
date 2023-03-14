import {LOGIN, LOGOUT} from "../constants/cons";

const initState = {
    id: '',
    name: ''
}

function UserReducer(state= initState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOGIN: {
            return {
                ...state,
                id: payload.id,
                name: payload.name
            }
        }

        case LOGOUT: {
            return {
                ...state,
                initState
            }
        }
    }

    return state
}

export default UserReducer