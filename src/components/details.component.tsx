import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back' />
);

export const DetailsScreen = (nav: any) => {

    const navigateBack = () => {
        nav.navigation.goBack();
    };

    const BackAction = (props: any) => (
        <TopNavigationAction icon={BackIcon} {...props} onPress={navigateBack} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Test details page' alignment='center' accessoryLeft={BackAction} />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h1'>DETAILS</Text>
            </Layout>
        </SafeAreaView>
    );
};
