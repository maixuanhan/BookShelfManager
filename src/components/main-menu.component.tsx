import React, { Component } from 'react';
import { Database } from '../database';
import { Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { BookScreen } from './screens/book-screen.component';
import { connect } from 'react-redux';
import { setDbReady } from '../reducers/dbready';

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
    dispatch: Function;
}

class _MainMenu extends Component<IMainMenuProperties> {
    public componentDidMount() {
        this.props.dispatch(setDbReady(false));
        Database.initialize()
            .then(() => {
                this.props.dispatch(setDbReady(true));
            })
            .catch(err => { console.log("TODO: handle db init error", err) });
    }
    public render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="books" drawerContent={CustomDrawerContent}>
                    {screenList.map((item) => <Drawer.Screen key={item.id} name={item.id} component={item.component} options={{
                        drawerLabel: item.title
                    }} />)}
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

export const MainMenu = connect()(_MainMenu);
