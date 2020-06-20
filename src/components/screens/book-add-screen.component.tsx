import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View } from 'react-native';

declare type DrawerNavigationProperties = {
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

export class BookAddScreen extends Component<DrawerNavigationProperties> {
    constructor(props: DrawerNavigationProperties) {
        super(props);
    }

    private styles = StyleSheet.create({
        view: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
            // backgroundColor: "#fff",
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

    render() {
        return (
            <>
                <View style={this.styles.view}>
                    <View style={this.styles.inputView}>
                        <Text style={this.styles.labelForm}>Title</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => { console.log(text); }} />
                        <Text style={this.styles.labelForm}>Authors</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => { console.log(text); }} />
                        <Text style={this.styles.labelForm}>Quantity</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => { console.log(text); }} />
                        <Text style={this.styles.labelForm}>Description</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => { console.log(text); }} />
                        <Text style={this.styles.labelForm}>Remark</Text>
                        <TextInput style={this.styles.inputForm} onChangeText={text => { console.log(text); }} />
                    </View>
                    <View style={this.styles.buttonView}>
                        <View style={this.styles.wrapButtonView}>
                            <Button color={this.styles.saveButton.backgroundColor} title="Save"
                                onPress={() => { console.log("Save pressed!"); }} />
                        </View>
                        <View style={this.styles.wrapButtonView}>
                            <Button color={this.styles.cancelButton.backgroundColor} title="Cancel"
                                onPress={() => { console.log("Cancel pressed!"); }} />
                        </View>
                    </View>
                </View>
            </>
        );
    }
}
