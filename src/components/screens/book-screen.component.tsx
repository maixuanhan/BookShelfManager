import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookListScreen } from './book-list-screen.component';
import { BookAddScreen } from './book-add-screen.component';
import { Button, StyleSheet, View } from 'react-native';
import { DbReadyConsumer } from '../elements/db-ready.context.component';
import { IDrawerNavigationProperties } from '../common/drawer-navigation-props.interface';

const Stack = createStackNavigator();

interface IBookScreenProps extends IDrawerNavigationProperties {
}

export class BookScreen extends Component<IBookScreenProps> {
    private styles = StyleSheet.create({
        addBookView: {
            marginRight: 10,
        }
    });
    render() {
        return (
            <DbReadyConsumer>
                {({ dbReady }) => (
                    <Stack.Navigator initialRouteName="book.list" headerMode="screen">
                        <Stack.Screen name="book.list" options={{
                            title: "Book list",
                            headerRight: () => {
                                return (
                                    <View style={this.styles.addBookView}>
                                        <Button
                                            title="Add book"
                                            onPress={() => { this.props.navigation.navigate("book.add"); }}
                                        />
                                    </View>
                                );
                            },
                        }} >
                            {(props) => <BookListScreen {...props} dbReady={dbReady} />}
                        </Stack.Screen>
                        <Stack.Screen name="book.add" component={BookAddScreen} options={{ title: "Add new book" }} />
                    </Stack.Navigator>
                )}
            </DbReadyConsumer>
        );
    }
}
