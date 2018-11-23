import { applyMiddleware, combineReducers, createStore } from 'redux';

export const user = (state = {token:'', name:{first:'', last:''}, email: ''}, action)  => {
    switch (action.type) {
        case 'SET_USER_DETAIL':
            return state={
                            ...state, 
                            token:action.payload.token, 
                            name:{
                                first: action.payload.name.first,
                                last: action.payload.name.last,
                            },
                            email: action.payload.email
                           
                        };
        break;
        case 'REMOVE_USER_DETAIL':
            return state;
        break;
        default:
            return state;
    }
};


export const reducers = combineReducers({
    user,
});