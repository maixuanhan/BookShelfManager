import React, { Component } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation.component';
import { init as initDbConnection } from '../database';

export class Application extends Component {
  public state = { dbReady: false };

  public componentDidMount() {
    initDbConnection()
      .then(conn => { this.setState({ ...this.state, dbReady: true }) })
      .catch(err => { console.log("TODO: handle db init error", err) });
  }

  public render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigator />
        </ApplicationProvider>
      </>
    );
  }
}
