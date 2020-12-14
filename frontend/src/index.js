import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore,compose,combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {authReducer} from './store/reducer/auth'
import {getPostsHomeReducer,getPostsPersonalReducer,postCommentReducer, getPostsFriendReducer} from './store/reducer/posts'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  auth:authReducer,
  postsHome:getPostsHomeReducer,
  postsFriend:getPostsFriendReducer,
  postsPersonal:getPostsPersonalReducer,
  postComment:postCommentReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
