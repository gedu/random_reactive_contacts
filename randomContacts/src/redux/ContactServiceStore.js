import * as ActionTypes from './ActionTypes';
import { connect } from 'react-redux';
import axios from 'axios';

import MasterPanel from '../screens/MasterPanel';

var currentPage = 1;

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
        doContactGet: () => dispatch(callContactService(currentPage))
    }
}

export const callContactService = (page) => {
    return dispatch => {
            dispatch(onPending());
            return axios.get(`https://randomuser.me/api/?exc=login&seed=teddy&page=${page}&results=30`)
                .then(response => {
                    currentPage += 1
                    dispatch(onSuccess(response.data))
                })
                .catch(error => {
                    dispatch(onError(error))
                });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPanel);