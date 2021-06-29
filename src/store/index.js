import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { videoReducer } from './reducers/videoReducer';
import { userReducer } from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  videoReducer,
  userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))