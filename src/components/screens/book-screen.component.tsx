import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

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
        removeListener: Function,
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

const Stack = createStackNavigator();

const ListBookComponent = (options: any) => {
    console.log(options);
    return (<Text>This is LIST of BOOKS screen</Text>);
};

const AddBookComponent = (options: any) => {
    return (<Text>This is to ADD new BOOK screen</Text>);
};

export class BookScreen extends Component<DrawerNavigationProperties> {
    render() {
        return (
            <Stack.Navigator initialRouteName="book.list" headerMode="screen">
                <Stack.Screen name="book.list" component={ListBookComponent} options={{ title: "Book list" }} />
                <Stack.Screen name="book.add" component={AddBookComponent} options={{ title: "Add new book" }} />
            </Stack.Navigator>
        );
    }
}
