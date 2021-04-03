import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SwipeableRightAction } from './swipeable-right-action.component';
import { Label } from '../../models/label';

interface ILabelItemProps {
    label: Label;
    onDeleted?: (label: Label) => void;
}

interface ILabelItemState {
}

export class LabelItem extends Component<ILabelItemProps, ILabelItemState> {
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
            backgroundColor: '#fff',
            flexDirection: 'row',
            padding: 5,

            marginRight: 7,
            marginLeft: 7,
            marginTop: 7,

            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 1,
        },
        itemText: {
            flex: 1,
            padding: 5,
            flexDirection: 'column',
            alignContent: 'space-around',
        },
        textAuthors: {
            color: '#a0a0ac',
        },
    });

    public render() {
        return (
            <Swipeable renderRightActions={(progress, drag) => <SwipeableRightAction progressAnimatedValue={progress}
                dragAnimatedValue={drag} title="Delete" containerStyle={this.styles.rightActionContainer}
                textStyle={this.styles.actionText} action={async () => {
                    if (this.props.onDeleted) {
                        this.props.onDeleted(this.props.label);
                    }
                }} />} >
                <View style={this.styles.item}>
                    <View style={this.styles.itemText}>
                        <Text>{this.props.label.name}</Text>
                        <Text style={this.styles.textAuthors}>{this.props.label.description}</Text>
                    </View>
                </View>
            </Swipeable>
        );
    }
}
