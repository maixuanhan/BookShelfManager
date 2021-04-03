import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DbReadyConsumer } from '../elements/db-ready.context.component';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TRoutingParamList } from '../common/routing-param-list';
import { LabelListScreen } from './label-list-screen.component';
import { Button, StyleSheet, View } from 'react-native';
import { LabelAddScreen } from './label-add-screen.component';

const Stack = createStackNavigator();

interface ILabelScreenProps extends DrawerScreenProps<TRoutingParamList, 'menu.labels'> {
    dbReady: boolean;
}

export class LabelScreen extends Component<ILabelScreenProps> {
    private styles = StyleSheet.create({
        addLabelView: {
            marginRight: 10,
        },
    });

    public render() {
        return (
            <DbReadyConsumer>
                {({ dbReady }) => (
                    <Stack.Navigator initialRouteName="label.list" headerMode="screen">
                        <Stack.Screen name="label.list" options={{
                            title: 'Labels',
                            headerRight: () => (
                                <View style={this.styles.addLabelView}>
                                    <Button
                                        title="Add label"
                                        onPress={() => { this.props.navigation.navigate('label.add'); }}
                                    />
                                </View>
                            ),
                        }}>
                            {(props: any) => (<LabelListScreen {...props} dbReady={dbReady} />)}
                        </Stack.Screen>
                        <Stack.Screen name="label.add" options={{
                            title: 'Add new label',
                        }}>{(props: any) => (<LabelAddScreen {...props} dbReady={dbReady} />)}</Stack.Screen>
                    </Stack.Navigator>
                )}
            </DbReadyConsumer>
        );
    }
}
