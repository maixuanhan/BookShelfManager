import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Book } from '../../models/book';
import { BookService } from '../../services/book-service';
import { searchTitle, IBookInfo } from '../../services/goodreads';
import { AutoCompleteInput } from '../elements/auto-complete-input.component';
import { BookAdditionalInfo } from '../../models/book-additional-info';
import { DbReadyConsumer } from '../elements/db-ready.context.component';
import { Validator } from '../../services/validator';
import { IStackNavigationProperties } from '../common/stack-navigation-props.interface';

interface IBookAddScreenProps extends IStackNavigationProperties {
}

interface IBookAddScreenState extends Partial<Book> {
    autoCompleteBooks: IBookInfo[];
    additionalInfo?: BookAdditionalInfo;
}

export class BookAddScreen extends Component<IBookAddScreenProps, IBookAddScreenState> {
    constructor(props: IBookAddScreenProps) {
        super(props);
        this.state = {
            autoCompleteBooks: [],
            title: '',
            authors: '',
            note: '',
            quantity: 1,
            remark: '',
        };
    }

    private bookService = new BookService();
    private updating = false;

    private styles = StyleSheet.create({
        view: {
            flexGrow: 1,
            justifyContent: 'space-between',
            padding: 10,
        },
        labelForm: {
            marginBottom: 4,
            fontSize: 16,
        },
        inputForm: {
            marginBottom: 12,
            backgroundColor: '#fff',
            borderColor: '#ced4da',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 4,
            height: 38,
            fontSize: 16,
        },
        linkForm: {
            color: 'blue',
            textDecorationLine: 'underline',
            textDecorationColor: 'blue',
        },
        inputView: {
            flex: 1,
            marginBottom: 10,
        },
        buttonView: {
            flexDirection: 'row-reverse',
        },
        wrapButtonView: {
            flex: 1,
            margin: 5,
        },
        saveButton: {
            backgroundColor: '#007bff',
        },
        cancelButton: {
            backgroundColor: '#6c757d',
        },
    });

    private async addBook(dbReady: boolean) {
        if (dbReady && !this.updating) {
            this.updating = true;
            try {
                const validationResult = new Validator([
                    {
                        validator: (title) => title, data: [this.state.title],
                        failMessage: 'Title must not be empty',
                    },
                    {
                        validator: (quantity) => quantity > 0, data: [this.state.quantity],
                        failMessage: 'You must own at least 1 book',
                    },
                ]).validate();
                if (!validationResult.ok) {
                    throw new Error(validationResult.message);
                }
                const book: Partial<Book> = {
                    title: this.state.title || '',
                    authors: this.state.authors || '',
                    quantity: this.state.quantity || 0,
                    note: this.state.note,
                    remark: JSON.stringify(this.state.additionalInfo),
                };
                const result = await this.bookService.addBook(book);
                book.id = result.id;
                this.props.navigation.navigate('book.list', { new: book });
            } catch (e) {
                this.updating = false;
                // console.log("Error while adding book:", e);
                Alert.alert(`Cannot add book: ${e.message}`);
            }
        } else if (this.updating) {
            console.log('Book is updating');
        } else {
            console.log('Database is not ready');
        }
    }

    private async onTitleChanged(text: string) {
        this.setState({ ...this.state, title: text });
        if (text.length >= 3) {
            const autoCompleteBooks = await searchTitle(text);
            this.setState({ ...this.state, autoCompleteBooks });
        }
    }

    render() {
        return (
            <DbReadyConsumer>
                {({ dbReady }) => (
                    <FlatList
                        data={[1]}
                        keyExtractor={item => item.toString()}
                        contentContainerStyle={this.styles.view}
                        renderItem={() => (
                            <View style={this.styles.inputView}>
                                <Text style={this.styles.labelForm}>Title</Text>
                                <AutoCompleteInput<IBookInfo>
                                    data={this.state.autoCompleteBooks}
                                    idMember="id"
                                    textMember="title"
                                    secondaryTextMember="author"
                                    imageMember="thumbnailUrl"
                                    textInputStyle={this.styles.inputForm}
                                    onTextChanged={this.onTitleChanged.bind(this)}
                                    onItemSelected={(item) => {
                                        const additionalInfo = this.state.additionalInfo || {};
                                        additionalInfo.goodReadsId = item.id;
                                        additionalInfo.imageUrl = item.imageUrl;
                                        additionalInfo.thumbnailUrl = item.thumbnailUrl;
                                        this.setState({
                                            ...this.state, title: item.title, authors: item.author, additionalInfo,
                                        });
                                    }} />
                                <Text style={this.styles.labelForm}>Authors</Text>
                                <TextInput
                                    style={this.styles.inputForm}
                                    value={this.state.authors}
                                    onChangeText={text => {
                                        this.setState({ ...this.state, authors: text });
                                    }}
                                />
                                <Text style={this.styles.labelForm}>Quantity</Text>
                                <TextInput
                                    style={this.styles.inputForm}
                                    keyboardType="numeric"
                                    value={this.state.quantity?.toString()}
                                    onChangeText={text => {
                                        this.setState({ ...this.state, quantity: Number(text) });
                                    }} />
                                <Text style={this.styles.labelForm}>Note</Text>
                                <TextInput style={this.styles.inputForm} value={this.state.note} onChangeText={text => {
                                    this.setState({ ...this.state, note: text });
                                }} />
                                <TouchableOpacity onPress={() => {
                                    console.log('WORK!');
                                    this.props.navigation.openDrawer();
                                }}>
                                    <Text style={this.styles.linkForm}>Labels</Text>
                                </TouchableOpacity>
                                {this.state.additionalInfo?.goodReadsId ?
                                    <Text>Goodreads ID: {this.state.additionalInfo.goodReadsId}</Text> :
                                    <></>}
                            </View>
                        )}
                        ListFooterComponent={
                            <View style={this.styles.buttonView}>
                                <View style={this.styles.wrapButtonView}>
                                    <Button color={this.styles.saveButton.backgroundColor} title="Save"
                                        onPress={() => { this.addBook(dbReady); }} />
                                </View>
                                <View style={this.styles.wrapButtonView}>
                                    <Button color={this.styles.cancelButton.backgroundColor} title="Cancel"
                                        onPress={() => { this.props.navigation.navigate('book.list'); }} />
                                </View>
                            </View>
                        }
                    />
                )}
            </DbReadyConsumer>
        );
    }
}
