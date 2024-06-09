// This is a non working code
// there is an issue with redux thunk


const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default
const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQEUSTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequested())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSucceeded(users))
        })
        .catch(error => {
            const message = error.message
            dispatch(fetchUsersFailed(message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware)) 



store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(fetchUsers());