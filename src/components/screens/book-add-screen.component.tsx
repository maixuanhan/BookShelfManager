import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View, FlatList } from 'react-native';
import { Book } from '../../models/book';
import { BookService } from '../../services/book-service';
import { searchTitle, IBookInfo } from '../../services/goodreads';
import { AutoCompleteInput } from '../elements/auto-complete-input.component';
import { BookAdditionalInfo } from 'src/models/book-additional-info';
import { DbReadyConsumer } from '../elements/db-ready';

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

interface IBookAddScreenProps extends IDrawerNavigationProperties {
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
            quantity: 0,
            remark: '',
        };
    }

    private bookService = new BookService();
    private updating: boolean = false;

    private styles = StyleSheet.create({
        view: {
            flexGrow: 1,
            justifyContent: "space-between",
            padding: 10,
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
            marginBottom: 10,
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

    private async addBook(dbReady: boolean) {
        if (dbReady && !this.updating) {
            this.updating = true;
            try {
                const book: Partial<Book> = {
                    title: this.state.title || '',
                    authors: this.state.authors || '',
                    quantity: this.state.quantity || 0,
                    note: this.state.note,
                    remark: JSON.stringify(this.state.additionalInfo),
                };
                const result = await this.bookService.addBook(book);
                book.id = result.id;
                this.props.navigation.navigate("book.list", { new: book });
            } catch (e) {
                this.updating = false;
                console.log("Something went wrong while adding book", e);
            }
        } else if (this.updating) {
            console.log("Book is updating");
        } else {
            console.log("Database is not ready");
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
                        renderItem={(props) => (
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
                                        this.setState({ ...this.state, title: item.title, authors: item.author, additionalInfo });
                                    }} />
                                <Text style={this.styles.labelForm}>Authors</Text>
                                <TextInput style={this.styles.inputForm} value={this.state.authors} onChangeText={text => {
                                    this.setState({ ...this.state, authors: text });
                                }} />
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
                                        onPress={() => { this.props.navigation.navigate("book.list"); }} />
                                </View>
                            </View>
                        }
                    />
                )}
            </DbReadyConsumer>
        );
    }
}
