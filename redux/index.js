import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { phoneNumber, clientReducer,certificateReducer,loginReducer } from './reducers';


const rootReducer = combineReducers({ phoneNumber, clientReducer,certificateReducer,loginReducer})

export const store = configureStore({ reducer: rootReducer, devTools: composeWithDevTools(applyMiddleware(...[thunk])) })
const makeStore = () => store;
export const wrapper = createWrapper(makeStore)
