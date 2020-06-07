import React, { Component } from 'react';
import { Database } from '../database';
import { Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { BookScreen } from './screens/book-screen.component';

const Drawer = createDrawerNavigator();

const HomeScreen = (options: any) => {
  console.log(options)
  return (<Text>This is HOME screen</Text>);
};

const screenList: Array<{ id: string, title: string, component: any }> = [
  { id: "home", title: "Home", component: HomeScreen },
  { id: "books", title: "Books", component: BookScreen },
];

const CustomDrawerContent = (props: any) => (
  <DrawerContentScrollView {...props}>
    <Text>I am in front of the menu</Text>
    <DrawerItemList {...props} />
    <Text>I am behind of the menu</Text>
  </DrawerContentScrollView>
);

export class Application extends Component {
  public state = { dbReady: false };

  public componentDidMount() {
    Database.initialize()
      .then(() => { this.setState({ ...this.state, dbReady: true }); })
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
