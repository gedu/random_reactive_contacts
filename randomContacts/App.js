/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/Index';
import MasterDetailNav from './src/Navigator';
import MasterPanel from './src/screens/MasterPanel';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MasterDetailNav />
      </Provider>
    );
  }
}