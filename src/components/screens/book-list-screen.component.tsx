import React, { Component, ReactElement } from 'react';
import { Text, Button, FlatList, ListRenderItemInfo, View, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { BookService } from '../../services/book-service';
import { connect } from 'react-redux';
import { IDbReadyProperty } from '../../reducers/dbready';
import { Book } from 'src/models/book';
import { BookAdditionalInfo } from 'src/models/book-additional-info';

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

interface IBookListScreenState {
    books: Book[];
    listInitialElem: ReactElement;
}

class _BookListScreen extends Component<IBookListScreenProps, IBookListScreenState> {
    public static bookItemStyle = StyleSheet.create({
        container: {
            position: 'relative',
            backgroundColor: "#f2f2f2",
        },
        item: {
            backgroundColor: "#fff",
            flexDirection: 'row',
            padding: 5,

            borderRadius: 5,
            marginRight: 7,
            marginLeft: 7,
            marginTop: 7,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 1,
        },
        itemImage: {
            width: 50,
            height: 70,
        },
        itemText: {
            flex: 1,
            padding: 5,
        },
    });

    public static RenderBookItem(itemInfo: ListRenderItemInfo<Book>): ReactElement {
        let additionalInfo: BookAdditionalInfo | undefined;
        if (itemInfo.item.remark) {
            try {
                additionalInfo = JSON.parse(itemInfo.item.remark);
            } catch (e) {
                // console.log("Failed to parse remark:", itemInfo.item.remark, "of book item", itemInfo.index);
            }
        }
        return (<>
            <TouchableOpacity key={itemInfo.index} onPress={() => { console.log("Touch on item", itemInfo.index); }}>
                <View style={_BookListScreen.bookItemStyle.item}>
                    {additionalInfo?.thumbnailUrl ?
                        <Image style={_BookListScreen.bookItemStyle.itemImage}
                            source={{ uri: additionalInfo.thumbnailUrl }} /> :
                        <View style={_BookListScreen.bookItemStyle.itemImage}></View>
                    }
                    <View style={_BookListScreen.bookItemStyle.itemText}>
                        <Text>{itemInfo.item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>);
    }

    constructor(props: IBookListScreenProps) {
        super(props);
        this.state = {
            books: [],
            listInitialElem: this.generateEmptyListComponent(),
        };
        this.props.navigation.addListener('focus', () => { this.tryLoadBooks(); });
    }

    private styles = StyleSheet.create({
        centeredContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
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
            let books: Book[] = [];
            const oldListInitialElem = this.state.listInitialElem;
            const listInitialElem = this.generateLoadingComponent();
            this.setState({ ...this.state, books, listInitialElem });
            try {
                const [bs, count] = await this.bookService.getBooks(0, 500);
                books = bs;
            } catch (e) {
                console.log("Error happens while fetching books.", e);
            }
            this.setState({ ...this.state, books, listInitialElem: oldListInitialElem });
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
            <FlatList
                contentContainerStyle={this.styles.listContainer}
                ListEmptyComponent={this.state.listInitialElem}
                data={this.state.books}
                renderItem={_BookListScreen.RenderBookItem}
                keyExtractor={item => item.id?.toString() || 'never'}
            />
        );
    }
}

const mapStateToProps = (obj: IDbReadyProperty) => ({ dbReady: obj.dbReady });
export const BookListScreen = connect(mapStateToProps)(_BookListScreen);
