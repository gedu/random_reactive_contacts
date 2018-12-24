import * as ActionTypes from './ActionTypes';

const initialState = { 
    isLoading: false, 
    error: undefined, 
    data: {} 
}

const ContactReducer = (state  = initialState, action ) => {
    
    switch(action.type) {
        case ActionTypes.SERVICE_PENDING:
            return Object.assign( {}, state, {isLoading: true} );
        case ActionTypes.SERVICE_SUCCESS:
            return Object.assign( {}, state, {isLoading: false, error: undefined, data: action.data.results} );
        case ActionTypes.SERVICE_ERROR:
            return Object.assign( {}, state, {isLoading: false, error: action.error} );
        default: return state;
    }

}

export default ContactReducer