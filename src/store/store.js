import {createStore } from 'redux';
import { reducers } from './../reducers/UserReducer';



export function configureStore(initialState = {}) {
    const store = createStore(reducers);
    return store;
}

export const store = configureStore();