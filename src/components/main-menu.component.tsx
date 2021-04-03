import React, { Component } from 'react';
import { Database } from '../database';
import { Text } from 'react-native';
import {
    createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { BookScreen } from './screens/book-screen.component';
import { DbReadyConsumer } from './elements/db-ready.context.component';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
    return (<Text>Should show some random book or book of the day</Text>);
};

const screenList: Array<{ id: string, title: string, component: any }> = [
    { id: 'menu.home', title: 'Home', component: HomeScreen },
    { id: 'menu.books', title: 'Books', component: BookScreen },
];

const CustomDrawerContent = (props: DrawerContentComponentProps) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
);

interface IMainMenuProperties {
}

export class MainMenu extends Component<IMainMenuProperties> {
    public async initializeDb(callback: (value: boolean) => void) {
        try {
            await Database.initialize();
            console.log('DB is initialized');
            callback(true);
        } catch (ex) {
            console.error('TODO: handle db init error', ex);
        }
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
                            <Drawer.Navigator initialRouteName="menu.books" drawerContent={CustomDrawerContent}>
                                {screenList.map(item =>
                                    <Drawer.Screen key={item.id} name={item.id} component={item.component} options={{
                                        drawerLabel: item.title,
                                    }} />)}
                            </Drawer.Navigator>
                        </NavigationContainer>
                    );
                }}
            </DbReadyConsumer>
        );
    }
}
