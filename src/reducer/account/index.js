import Types from '../../action/types';

const defaultState = {
    username: '',
    clockToken: '',
    loginToken: ''
}

const onAction = (state = defaultState,action) => {
    switch (action.type) {
        case Types.SET_ACCOUNT: 
            return {
                ...state,
            }
        default:
            return state
    }
}
export default onAction