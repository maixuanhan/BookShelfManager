import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Animated, StyleSheet, GestureResponderEvent } from 'react-native';

interface ISwipeableRightActionProps {
    progressAnimatedValue: Animated.AnimatedInterpolation;
    dragAnimatedValue: Animated.AnimatedInterpolation;
    title: string;
    action: (event: GestureResponderEvent) => void;
    containerStyle?: any;
    textStyle?: any;
}

interface ISwipeableRightActionState {
}

export class SwipeableRightAction extends Component<ISwipeableRightActionProps, ISwipeableRightActionState> {
    public styles = StyleSheet.create({
        actionContainer: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
            ...this.props.containerStyle,
        },
        actionText: {
            fontWeight: '600',
            padding: 20,
            ...this.props.textStyle,
        },
    });
    public render() {
        return (
            <TouchableOpacity onPress={this.props.action}>
                <View style={this.styles.actionContainer}>
                    <Text style={this.styles.actionText}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
