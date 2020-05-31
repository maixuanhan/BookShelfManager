import React, { Component } from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

interface AppTopNavigationProps {
    title: string;
    navigation: any;
    leftAccessory?: "back" | "menu";
}

export class AppTopNavigation extends Component {
    public props: AppTopNavigationProps;
    constructor(props: AppTopNavigationProps) {
        super(props);
        this.props = props;
    }

    private BackAction = (props: any) => <TopNavigationAction {...props}
        icon={(props: any) => <Icon {...props} name='arrow-back' />}
        onPress={() => { this.props.navigation.goBack(); }} />;

    private MenuAction = (props: any) => <TopNavigationAction {...props}
        icon={(props: any) => <Icon {...props} name='menu' />}
        onPress={() => { this.props.navigation.openDrawer() }} />;

    render() {
        if (this.props.leftAccessory === "back") {
            return <TopNavigation title={this.props.title} alignment='center' accessoryLeft={this.BackAction} />;
        } else if (this.props.leftAccessory === "menu") {
            return <TopNavigation title={this.props.title} alignment='center' accessoryLeft={this.MenuAction} />;
        } else {
            return <TopNavigation title={this.props.title} alignment='center' />;
        }
    }
}
