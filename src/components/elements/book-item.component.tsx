import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Book } from "src/models/book";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { BookAdditionalInfo } from "src/models/book-additional-info";
import { SwipeableRightAction } from "./swipeable-right-action.component";

interface IBookItemProps {
    book: Book;
    onDeleted?: (book: Book) => void;
}

interface IBookItemState {
}

export class BookItem extends Component<IBookItemProps, IBookItemState> {
    public styles = StyleSheet.create({
        rightActionContainer: {
            backgroundColor: 'red',
            marginTop: 7,
            marginLeft: -7,
            marginRight: 7,
        },
        actionText: {
            color: '#fff',
        },
        item: {
            backgroundColor: "#fff",
            flexDirection: 'row',
            padding: 5,

            marginRight: 7,
            marginLeft: 7,
            marginTop: 7,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 1,
        },
        itemImage: {
            width: 50,
            height: 70,
        },
        itemText: {
            flex: 1,
            padding: 5,
            flexDirection: 'column',
            alignContent: 'space-around',
        },
        textTitle: {
            // flex: 1,
        },
        textAuthors: {
            color: '#a0a0ac',
        },
    });

    public render() {
        let additionalInfo: BookAdditionalInfo | undefined;
        if (this.props.book.remark) {
            try {
                additionalInfo = JSON.parse(this.props.book.remark);
            } catch (e) {
                // Ignore
                // console.log("Failed to parse remark:", this.props.book.remark);
            }
        }
        return (
            <Swipeable renderRightActions={(progress, drag) => <SwipeableRightAction progressAnimatedValue={progress}
                dragAnimatedValue={drag} title="Delete" containerStyle={this.styles.rightActionContainer}
                textStyle={this.styles.actionText} action={async () => {
                    if (this.props.onDeleted) {
                        this.props.onDeleted(this.props.book);
                    }
                }} />} >
                <View style={this.styles.item}>
                    {additionalInfo?.thumbnailUrl ?
                        <Image style={this.styles.itemImage}
                            source={{ uri: additionalInfo.thumbnailUrl }} /> :
                        <View style={this.styles.itemImage}></View>
                    }
                    <View style={this.styles.itemText}>
                        <Text style={this.styles.textTitle}>{this.props.book.title}</Text>
                        <Text style={this.styles.textAuthors}>{this.props.book.authors}</Text>
                    </View>
                </View>
            </Swipeable>
        );
    }
}
