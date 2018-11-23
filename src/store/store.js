import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducers } from './../reducers/UserReducer';


const customMiddleWare = store => action => {
    switch(action.type){
      case "SET_USER_DETAIL":
        var a = localStorage.getItem('user');
        console.log('====================================');
        console.log(a);
        console.log('====================================');
      break;
      case "REMOVE_USER_DETAIL":
      
      break;
     
      default:
       //next(action);
  
    }
  
  }
  


export function configureStore(initialState = {}) {
    const store = createStore(reducers);
    return store;
}

export const store = configureStore();