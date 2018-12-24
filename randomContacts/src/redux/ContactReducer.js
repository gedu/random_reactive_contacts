import * as ActionTypes from './ActionTypes';

const initialState = { 
    isLoading: false, 
    error: undefined, 
    data: [] 
}

const ContactReducer = (state  = initialState, action ) => {
    
    switch(action.type) {
        case ActionTypes.SERVICE_PENDING:
            return Object.assign( {}, state, { isLoading: true } );
        case ActionTypes.SERVICE_SUCCESS:
            return Object.assign( {}, { isLoading: false, error: undefined, data: sortLastName([...state.data, ...action.data.results])});
        case ActionTypes.SERVICE_ERROR:
            return Object.assign( {}, state, { isLoading: false, error: action.error } );
        default: return state;
    }

}

function sortLastName(contacts) {
    console.log("CONTACTS TO SORT: ", contacts);
    return contacts.sort(function(a, b) {
        if(a.name.last < b.name.last) { return -1; }
        if(a.name.last > b.name.last) { return 1; }
        return 0;
    });
}

export default ContactReducer