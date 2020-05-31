import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout } from '@ui-kitten/components';
import { NavigatorScreen } from './navigator-screen.component.abstract';
import { AppTopNavigation } from './app-top-navigation.component';

export class HomeScreen extends NavigatorScreen {
    constructor(screenOptions: any) {
        super(screenOptions);
    }

    public render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <AppTopNavigation title='My Book Shelf' navigation={this.navigation} leftAccessory="menu" />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => { this.navigate('Details') }}>OPEN DETAILS</Button>
            </Layout>
        </SafeAreaView>;
    }
}
