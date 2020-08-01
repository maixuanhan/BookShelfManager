import React, { Component, ReactElement } from 'react';
import { Text, FlatList, ListRenderItemInfo, View, StyleSheet, ActivityIndicator } from 'react-native';
import { BookService } from '../../services/book-service';
import { Book } from 'src/models/book';
import { BookItem } from '../elements/book-item.component';
import { IStackNavigationProperties } from '../common/stack-navigation-props.interface';

interface IBookListScreenProps extends IStackNavigationProperties {
    dbReady: boolean;
}

interface IBookListScreenState {
    books: Book[];
    listInitialElem: ReactElement;
}

export class BookListScreen extends Component<IBookListScreenProps, IBookListScreenState> {
    constructor(props: IBookListScreenProps) {
        super(props);
        this.state = {
            books: [],
            listInitialElem: this.generateEmptyListComponent(),
        };
        // this.props.navigation.addListener('focus', () => { this.tryLoadBooks(); });
    }

    private styles = StyleSheet.create({
        centeredContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listContainer: {
            flexGrow: 1,
        },
    });

    private bookService = new BookService();

    private generateEmptyListComponent(): ReactElement {
        return (
            <View style={this.styles.centeredContainer}>
                <Text>No book here</Text>
            </View>
        );
    }

    private generateLoadingComponent(): ReactElement {
        return (
            <View style={this.styles.centeredContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    private async tryLoadBooks() {
        if (this.props.dbReady) {
            console.log('try load books...');
            let books: Book[] = [];
            const oldListInitialElem = this.state.listInitialElem;
            const listInitialElem = this.generateLoadingComponent();
            this.setState({ ...this.state, books, listInitialElem });
            try {
                const [bs, count] = await this.bookService.getBooks(0, 500);
                books = bs;
                console.log('Total count:', count);
            } catch (e) {
                console.log('Error happens while fetching books.', e);
            }
            this.setState({ ...this.state, books, listInitialElem: oldListInitialElem });
        }
    }

    public componentDidMount() {
        console.log('componentDidMount event');
        this.tryLoadBooks();
    }

    public componentDidUpdate(prevProps: IBookListScreenProps) {
        console.log('componentDidUpdate event:', this.props.route?.params?.new?.id);
        if (this.props.dbReady !== prevProps.dbReady && this.props.dbReady) {
            this.tryLoadBooks();
        }
        if (this.props.route?.params?.new?.id !== prevProps.route?.params?.new?.id) {
            if (this.props.route?.params?.new?.id) {
                this.state.books.unshift(this.props.route.params.new as Book);
                this.setState({ ...this.state });
            }
        }
    }

    public render() {
        return (
            <FlatList
                contentContainerStyle={this.styles.listContainer}
                ListEmptyComponent={this.state.listInitialElem}
                data={this.state.books}
                renderItem={(info: ListRenderItemInfo<Book>) =>
                    <BookItem book={info.item} onDeleted={async (book: Book) => {
                        if (book.id) {
                            this.bookService.deleteBook(book.id);
                            const books = this.state.books.filter(b => b.id !== book.id);
                            this.setState({ ...this.state, books });
                        }
                    }} />}
                keyExtractor={item => item.id?.toString() || 'never'}
            />
        );
    }
}
