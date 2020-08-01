import React, { Component } from 'react';
import { Database } from '../database';
import { Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { BookScreen } from './screens/book-screen.component';
import { DbReadyConsumer } from './elements/db-ready.context.component';

const Drawer = createDrawerNavigator();

const HomeScreen = (options: any) => {
    return (<Text>This is HOME screen</Text>);
};

const screenList: Array<{ id: string, title: string, component: any }> = [
    { id: "home", title: "Home", component: HomeScreen },
    { id: "books", title: "Books", component: BookScreen },
];

const CustomDrawerContent = (props: any) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
);

interface IMainMenuProperties {
}

export class MainMenu extends Component<IMainMenuProperties> {
    public initializeDb(callback: (value: boolean) => void) {
        Database.initialize()
            .then(() => { callback(true); })
            .catch(err => { console.log("TODO: handle db init error", err) });
    }
    public render() {
        return (
            <DbReadyConsumer>
                {({ dbReady, changeDbReady }) => {
                    if (!dbReady) {
                        this.initializeDb(changeDbReady);
                    }
                    return (
                        <NavigationContainer>
                            <Drawer.Navigator initialRouteName="books" drawerContent={CustomDrawerContent}>
                                {screenList.map((item) => <Drawer.Screen key={item.id} name={item.id} component={item.component} options={{
                                    drawerLabel: item.title
                                }} />)}
                            </Drawer.Navigator>
                        </NavigationContainer>
                    );
                }}
            </DbReadyConsumer>
        );
    }
}
