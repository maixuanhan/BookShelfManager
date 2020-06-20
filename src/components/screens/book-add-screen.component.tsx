import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View } from 'react-native';
import { Book } from '../../models/book';
import { BookService } from '../../services/book-service';
import { IDbReadyProperty } from '../../reducers/dbready';
import { connect } from 'react-redux';

interface IDrawerNavigationProperties {
    navigation: {
        addListener: Function,
        canGoBack: Function,
        closeDrawer: Function,
        dangerouslyGetParent: Function,
        dangerouslyGetState: Function,
        dispatch: Function,
        goBack: Function,
        isFocused: Function,
        jumpTo: Function,
        navigate: Function,
        openDrawer: Function,
        pop: Function,
        popToTop: Function,
        push: Function,
        removeListener: Function,
        replace: Function,
        reset: Function,
        setOptions: Function,
        setParams: Function,
        toggleDrawer: Function
    },
    route: {
        key: string,
        name: string,
        params: any
    }
}

interface IBookAddScreenProps extends IDbReadyProperty, IDrawerNavigationProperties {
}

export class _BookAddScreen extends Component<IBookAddScreenProps> {
    constructor(props: IBookAddScreenProps) {
        super(props);
    }

    private book = new Book();
    private bookService = new BookService();

    private styles = StyleSheet.create({
        view: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
            // backgroundColor: "#fff",
        },
        labelForm: {
            marginBottom: 4,
            fontSize: 16,
        },
        inputForm: {
            marginBottom: 12,
            backgroundColor: "#fff",
            borderColor: "#ced4da",
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            height: 38,
            fontSize: 16,
        },
        inputView: {
            flex: 1,
        },
        buttonView: {
            flexDirection: "row-reverse",
        },
        wrapButtonView: {
            flex: 1,
            margin: 5
        },
        saveButton: {
            backgroundColor: "#007bff",
        },
        cancelButton: {
            backgroundColor: "#6c757d",
        }
    });

    private async addBook() {
        if (this.props.dbReady) {
            try {
                await this.bookService.addBook(this.book);
            } catch (e) {
                console.log("Something went wrong while adding book.", e);
            }
            this.props.navigation.navigate("book.list");
        } else {
            console.log("Database is not ready");
        }
    }

    render() {
        return (
            <>
                <View style={this.styles.view}>
                    <View style={this.styles.inputView}>
                        <Text style={this.styles.labelForm}>Title</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => {
                            this.book.title = text;
                        }} />
                        <Text style={this.styles.labelForm}>Authors</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => {
                            this.book.authors = text;
                        }} />
                        <Text style={this.styles.labelForm}>Quantity</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => {
                            this.book.quantity = parseInt(text);
                        }} />
                        <Text style={this.styles.labelForm}>Description</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => {
                            this.book.description = text;
                        }} />
                        <Text style={this.styles.labelForm}>Remark</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => {
                            this.book.remark = text;
                        }} />
                    </View>
                    <View style={this.styles.buttonView}>
                        <View style={this.styles.wrapButtonView}>
                            <Button color={this.styles.saveButton.backgroundColor} title="Save"
                                onPress={() => { this.addBook(); }} />
                        </View>
                        <View style={this.styles.wrapButtonView}>
                            <Button color={this.styles.cancelButton.backgroundColor} title="Cancel"
                                onPress={() => { this.props.navigation.navigate("book.list"); }} />
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

const mapStateToProps = ({ dbReady }) => ({ dbReady });
export const BookAddScreen = connect(mapStateToProps)(_BookAddScreen);
