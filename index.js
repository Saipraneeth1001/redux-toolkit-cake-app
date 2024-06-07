const redux = require('redux');
const createStore = redux.createStore; // creating a redux store but the syntax is deprecated
const combineReducers = redux.combineReducers; // this is used to combine the reducers together

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

const initialCakeState = {
    numberOfCakes: 10,
}

const initialIcecreamState = {
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

// separation of the functionality

const cakeReducer = (state = initialCakeState, action) => {
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
        default:
            return state
    }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch(action.type) {
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



// this reducer combines the reducer mentioned as parameters and then form a root reducer
const rootReducer = combineReducers({

    cake: cakeReducer,
    icecream: icecreamReducer
})

// now we shall pass the root reducer as the reducer to the createStore method.

const store = createStore(rootReducer)
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


