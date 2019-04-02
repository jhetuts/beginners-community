import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
// import { createLogger } from 'redux-logger';

// const logger = createLogger({
//     /* https://github.com/evgenyrodionov/redux-logger */
//     collapsed: true,
//     diff: true
// });

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store;