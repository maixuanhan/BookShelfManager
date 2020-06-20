import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { MainMenu } from './main-menu.component';

const store = createStore(rootReducer)

export class Application extends Component {
  public render() {
    return (
      <Provider store={store}>
        <MainMenu />
      </Provider >
    );
  }
}
