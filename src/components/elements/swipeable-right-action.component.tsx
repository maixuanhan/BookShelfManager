import React, { Component } from 'react';
import {
    TouchableOpacity, View, Text, Animated, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle, TextStyle,
} from 'react-native';

interface ISwipeableRightActionProps {
    progressAnimatedValue: Animated.AnimatedInterpolation;
    dragAnimatedValue: Animated.AnimatedInterpolation;
    title: string;
    action: (event: GestureResponderEvent) => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

interface ISwipeableRightActionState {
}

export class SwipeableRightAction extends Component<ISwipeableRightActionProps, ISwipeableRightActionState> {
    public styles = StyleSheet.create({
        actionContainer: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
            ...(this.props.containerStyle as Record<string, unknown>), // ... op is not supported for generic type yet
        },
        actionText: {
            fontWeight: '600',
            padding: 20,
            ...(this.props.textStyle as Record<string, unknown>),
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
