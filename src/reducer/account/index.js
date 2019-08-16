import Types from '../../action/types';

const defaultState = {
    username: '',
    clockToken: '',
    loginToken: ''
}

export default onAction = (state = defaultState,action) => {
    switch (action.type) {
        case Types.SET_ACCOUNT: 
            return {
                ...state,
            }
    }
}