import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { BookService } from '../../services/book-service';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { IDbReadyProperty } from '../../reducers/dbready';

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

interface IBookListScreenProps extends IDbReadyProperty, IDrawerNavigationProperties {
}

class _BookListScreen extends Component<IBookListScreenProps> {
    constructor(props: IBookListScreenProps) {
        super(props);
        this.state = {
            books: [],
        }
    }

    private bookService = new BookService();

    private async tryLoadBooks() {
        if (this.props.dbReady) {
            try {
                const [books, count] = await this.bookService.getBooks(0, 100);
                this.setState({ ...this.state, books });
            } catch (e) {
                console.log("Error happens while fetching books.", e);
            }
        }
    }

    public componentDidMount() {
        this.tryLoadBooks();
    }

    public componentDidUpdate(prevProps: IBookListScreenProps) {
        if (this.props.dbReady !== prevProps.dbReady) {
            this.tryLoadBooks();
        }
    }

    public render() {
        return (
            <>
                <Text>This is LIST of BOOKS screen</Text>
                <Button
                    title="Add book"
                    onPress={() => {
                        this.props.navigation.navigate("book.add");
                    }}
                />
                <ScrollView>
                    {this.state.books.map((b) => (
                        <Text key={b.id}>{b.title}</Text>
                    ))}
                </ScrollView>
            </>
        );
    }
}

const mapStateToProps = ({ dbReady }) => ({ dbReady });
export const BookListScreen = connect(mapStateToProps)(_BookListScreen);
