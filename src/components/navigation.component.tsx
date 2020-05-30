import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './home-screen.component';
import { DetailsScreen } from './details.component';
import { LabelScreen } from './label-screen.component';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Text, IndexPath, Divider } from '@ui-kitten/components';

const { Navigator, Screen } = createDrawerNavigator();

const Header = () => (
    <React.Fragment>
        <Text>Some common section here</Text>
        <Divider />
    </React.Fragment>
);

const DrawerContent = (options: any) => (
    <Drawer
        header={Header}
        selectedIndex={new IndexPath(options.state.index)}
        onSelect={index => options.navigation.navigate(options.state.routeNames[index.row])}>
        <DrawerItem title='Home' />
        <DrawerItem title='Labels' />
        <DrawerItem title='Details' />
    </Drawer>
);

const DrawerNavigator = () => (
    <Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Screen name='Home' component={HomeScreen} />
        <Screen name='Labels' component={LabelScreen} />
        <Screen name='Details' component={DetailsScreen} />
    </Navigator>
);

export class AppNavigator extends React.Component {
    render() {
        return <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    }
}
