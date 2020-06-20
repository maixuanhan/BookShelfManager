import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookListScreen } from './book-list-screen.component';
import { BookAddScreen } from './book-add-screen.component';

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

export class BookScreen extends Component<DrawerNavigationProperties> {
    render() {
        return (
            <Stack.Navigator initialRouteName="book.list" headerMode="screen">
                <Stack.Screen name="book.list" component={BookListScreen} options={{ title: "Book list" }} />
                <Stack.Screen name="book.add" component={BookAddScreen} options={{ title: "Add new book" }} />
            </Stack.Navigator>
        );
    }
}