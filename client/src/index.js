import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

// Step 1 - Create initial store object
let initialStore = {
  userDetails:{},
};
// Step 2 - Create the reducer
let reducer = (updatedStore = initialStore, dispatchedObj) => {
  console.log('inside reducer');
  console.log(dispatchedObj);

  if (dispatchedObj.type === "login") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  } 
  return updatedStore;
};
let tasksReducer = (updatedStore = initialStore, dispatchedObj) => {
  console.log('inside reducer');
  console.log(dispatchedObj);

  if (dispatchedObj.type === "addTask") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  }else  if (dispatchedObj.type === "submit") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  }   if (dispatchedObj.type === "deleteTask") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  } 
  return updatedStore;
};
let leavesReducer = (updatedStore = initialStore, dispatchedObj) => {
  console.log('inside reducer');
  console.log(dispatchedObj);

  if (dispatchedObj.type === "applyLeave") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  }else  if (dispatchedObj.type === "cancelLeave") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  }   if (dispatchedObj.type === "extendLeave") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  } 
  return updatedStore;
};
// step 3 - create the store
let store = createStore(combineReducers({reducer,tasksReducer,leavesReducer}),applyMiddleware(thunk));
 
let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   // Step 4: Access the store
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
