import React, { Component } from 'react';
import { Text, Button } from 'react-native';

declare type DrawerNavigationProperties = {
    navigation: {
        addListener: Function,
        canGoBack: Function,
        closeDrawer: Function,
        dangerouslyGetParent: Function,
        dangerouslyGetState: Function,
        dispatch: Function,
        goBack: Function,
        isFocused: Function,
        jumpTo: Function,
        navigate: Function,
        openDrawer: Function,
        pop: Function,
        popToTop: Function,
        push: Function,
        removeListener: Function,
        replace: Function,
        reset: Function,
        setOptions: Function,
        setParams: Function,
        toggleDrawer: Function
    },
    route: {
        key: string,
        name: string,
        params: any
    }
}

export class BookListScreen extends Component<DrawerNavigationProperties> {
    constructor(props: DrawerNavigationProperties) {
        super(props);
    }

    render() {
        return (
            <>
                <Text>This is LIST of BOOKS screen</Text>
                <Button
                    title="Add book"
                    onPress={() => { this.props.navigation.navigate("book.add"); }}
                />
            </>
        );
    }
}
