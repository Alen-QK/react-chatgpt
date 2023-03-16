import {PASS_AUTH} from "../constants/cons";

const initState = false;

function AuthReducer(state= initState, action) {
    const {type, payload} = action;

    switch (type) {
        case PASS_AUTH: {
            state = !initState

            return state
        }
    }

    return state
}

export default AuthReducer