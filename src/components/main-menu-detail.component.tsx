import React, { Component } from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, StyleSheet, View } from 'react-native';

export class MainMenuDetail extends Component<DrawerContentComponentProps> {
    private styles = StyleSheet.create({
        mainView: {
            flex: 1,
        },
        headerView: {
            paddingLeft: 25,
            paddingTop: 40,
            paddingBottom: 40,
            borderBottomWidth: 0.25,
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        listView: {
            flex: 1,
            paddingTop: 20,
            paddingLeft: 30,
        },
        footerView: {
            paddingRight: 15,
            paddingTop: 20,
            paddingBottom: 20,
            borderTopWidth: 0.25,
        },
        footerText: {
            fontSize: 12,
            textAlign: 'center',
        },
    });

    public render() {
        return (
            <View style={this.styles.mainView}>
                <View style={this.styles.headerView}>
                    <Text style={this.styles.headerText}>Book Shelf</Text>
                </View>

                <DrawerContentScrollView {...this.props} style={this.styles.listView}>
                    <DrawerItemList {...this.props} />
                </DrawerContentScrollView>

                <View style={this.styles.footerView}>
                    <Text style={this.styles.footerText}>App version 0.0.1</Text>
                </View>
            </View>
        );
    }
}
