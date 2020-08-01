import React, { Component } from 'react';

interface IDbReadyContext {
    dbReady: boolean;
    changeDbReady: (ready: boolean) => void;
}

const DbReadyContext = React.createContext({
    dbReady: false,
    changeDbReady: (): void => { return; },
} as IDbReadyContext);

export const DbReadyConsumer = DbReadyContext.Consumer;

export class DbReadyProvider extends Component {
    state = {
        dbReady: false,
    };

    changeDbReady = (dbReady: boolean): void => {
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
