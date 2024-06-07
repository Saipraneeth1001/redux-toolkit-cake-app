const redux = require('redux');
const createStore = redux.createStore; // creating a redux store but the syntax is deprecated

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

const initialState = {
    numberOfCakes: 10,
    numberofIcecreams: 10
}

// A function which is an action creator. It returns an action when this function is called.

function orderCake() {
    return {
        type: 'CAKE_ORDERED',
        quantity: 1
    }
}

function restockCake(quantity) {
    return {
        type: 'CAKE_RESTOCKED',
        payload: quantity
    }
}

function orderIcecream() {
    return {
        type: 'ICECREAM_ORDERED',
        payload: 1
    }
}

function restockIcecream() {
    return {
        type: 'ICECREAM_RESTOCKED',
        payload: 5
    }
}

// a reducer needs to take an initial state and action
// it performs an operation to the state based on the action and then returns the modified state

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state, 
                numberOfCakes: state.numberOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }

        case ICECREAM_ORDERED:
            return {
                ...state, 
                numberofIcecreams: state.numberofIcecreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numberofIcecreams: state.numberofIcecreams + action.payload
            }
        
        default:
            return state
    }
}

const store = createStore(reducer)
console.log('initial store', store.getState())

const subscribe = store.subscribe(() => console.log('state is ', store.getState()))

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))

store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(restockIcecream(2))


subscribe() // this would unsubscribe from the store. any dispatch actions below this line, the updated 
// state wont be shown in the console. 


