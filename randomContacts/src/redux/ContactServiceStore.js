import * as ActionTypes from './ActionTypes';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import MasterPanel from '../screens/MasterPanel';

export const onSuccess = (data) => ({
    type: ActionTypes.SERVICE_SUCCESS,
    data: data
});

export const onPending = () => ({
    type: ActionTypes.SERVICE_PENDING
});

export const onError = (error) => ({
    type: ActionTypes.SERVICE_ERROR,
    error: error
});

const mapStateToProps = (state) => ({
    isLoading: state.ContactReducer.isLoading,
    error: state.ContactReducer.error,
    data: state.ContactReducer.data
});

const mapDispatchToProps = (dispatch) => {
    return {
        doContactGet: () => dispatch(callContactService())
    }
}

export const callContactService = () => {
    return dispatch => {
            dispatch(onPending());
            axios.get("https://randomuser.me/api/?exc=login&seed=teddy&page=1&results=30")
                .then(response => {
                    dispatch(onSuccess(response.data))
                })
                .catch(error => {
                    dispatch(onError(error))
                });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPanel);