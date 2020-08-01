import React, { Component } from 'react';
import { MainMenu } from './main-menu.component';
import { DbReadyProvider } from './elements/db-ready.context.component';

export class Application extends Component {
  public render() {
    return (
      <DbReadyProvider>
        <MainMenu />
      </DbReadyProvider>
    );
  }
}
