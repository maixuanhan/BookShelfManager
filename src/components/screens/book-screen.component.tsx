import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookListScreen } from './book-list-screen.component';
import { BookAddScreen } from './book-add-screen.component';
import { Button, StyleSheet, View } from 'react-native';
import { DbReadyConsumer } from '../elements/db-ready.context.component';
import { BookAssignLabelScreen } from './book-assign-label-screen.component';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TRoutingParamList } from '../common/routing-param-list';

const Stack = createStackNavigator();

interface IBookScreenProps extends DrawerScreenProps<TRoutingParamList, 'menu.books'> {
    dbReady: boolean;
}

export class BookScreen extends Component<IBookScreenProps> {
    private styles = StyleSheet.create({
        addBookView: {
            marginRight: 10,
        },
    });
    render() {
        return (
            <DbReadyConsumer>
                {({ dbReady }) => (
                    <Stack.Navigator initialRouteName="book.list" headerMode="screen">
                        <Stack.Screen name="book.list" options={{
                            title: 'Book list',
                            headerRight: () => (
                                <View style={this.styles.addBookView}>
                                    <Button
                                        title="Add book"
                                        onPress={() => { this.props.navigation.navigate('book.add'); }}
                                    />
                                </View>
                            ),
                        }}>{(props: any) => (<BookListScreen {...props} dbReady={dbReady} />)}</Stack.Screen>
                        <Stack.Screen name="book.add" options={{
                            title: 'Add new book',
                        }}>{(props: any) => (<BookAddScreen {...props} dbReady={dbReady} />)}</Stack.Screen>
                        <Stack.Screen name="book.assignlabels" options={{
                            title: 'Assign labels',
                        }}>{(props: any) => (<BookAssignLabelScreen {...props} dbReady={dbReady} />)}</Stack.Screen>
                    </Stack.Navigator>
                )}
            </DbReadyConsumer>
        );
    }
}
