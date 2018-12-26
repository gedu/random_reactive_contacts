import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import * as ActionTypes from '../redux/ActionTypes';
import { callContactService } from '../redux/ContactServiceStore';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getContacts', () => {

    beforeEach(function () {
        moxios.install();
    });
    
    afterEach(function () {
        moxios.uninstall();
    });

    it('creates GET_POSTS_SUCCESS after successfuly fetching postse', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: getPostsMock,
          });
        });
    
        const expectedActions = [
          { type: ActionTypes.SERVICE_PENDING },
          { type: ActionTypes.SERVICE_SUCCESS, data: getPostsMock },
        ];
    
        const store = mockStore({ data: "{ result: {name: 'teddy'}}" })
    
        return store.dispatch(callContactService(1)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });    

})

const getPostsMock = "{ result: {name: 'teddy'}}";