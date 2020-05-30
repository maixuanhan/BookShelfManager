import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { NavigatorScreen } from './navigator-screen.component.abstract';

export class HomeScreen extends NavigatorScreen {
    constructor(screenOptions: any) {
        super(screenOptions);
    }

    public render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='My Book Shelf' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => { this.navigate('Details') }}>OPEN DETAILS</Button>
            </Layout>
        </SafeAreaView>;
    }
}
