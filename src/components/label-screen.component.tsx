import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Layout, TopNavigation, Button, Text } from '@ui-kitten/components';
import { NavigatorScreen } from './navigator-screen.component.abstract';
import { AppTopNavigation } from './app-top-navigation.component';

export class LabelScreen extends NavigatorScreen {
    constructor(screenOptions: any) {
        super(screenOptions);
    }

    public render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <AppTopNavigation title='All labels' navigation={this.navigation} leftAccessory="menu" />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Some contents will be placed here</Text>
                <Button onPress={() => { this.navigate('Home') }}>GO HOME</Button>
            </Layout>
        </SafeAreaView>;
    }
}
