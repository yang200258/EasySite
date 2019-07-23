import {createStore,combineReducers,applyMiddleware} from 'redux'

function reducer(state={},action) {
    return {}
}

const reducers = combineReducers({
    index: reducer
})

const store = createStore(reducers)

export default store