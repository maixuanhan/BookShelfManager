import React, { Component } from 'react';

const DbReadyContext = React.createContext({
    dbReady: false,
    changeDbReady: (value: boolean): void => { },
});

export const DbReadyConsumer = DbReadyContext.Consumer;

export class DbReadyProvider extends Component {
    state = {
        dbReady: false,
    };

    changeDbReady = (dbReady: boolean) => {
        this.setState({ dbReady });
    };

    render() {
        return (
            <DbReadyContext.Provider value={{
                dbReady: this.state.dbReady,
                changeDbReady: this.changeDbReady,
            }}>
                {this.props.children}
            </DbReadyContext.Provider>
        );
    }
}
