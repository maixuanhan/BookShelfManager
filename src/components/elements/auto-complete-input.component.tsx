import React, { Component } from 'react';
import { Text, StyleSheet, TextInput, View, StyleProp, TextStyle, ScrollView, TouchableOpacity, Image } from 'react-native';

type StringProperties<T> = Pick<T, {
    [K in keyof T]: T[K] extends string | undefined ? K : never
}[keyof T]>;

interface IAutoCompleteInputProps<T> {
    textInputStyle?: StyleProp<TextStyle>;
    onTextChanged?: (text: string) => any;
    onItemSelected?: (item: T) => any;
    textMember: keyof StringProperties<T>;
    imageMember?: keyof StringProperties<T>;
    data: T[];
}

interface IAutoCompleteInputState {
    value: string;
    showList: boolean;
    listStyle: any;
}

export class AutoCompleteInput<T> extends Component<IAutoCompleteInputProps<T>, IAutoCompleteInputState> {
    constructor(props: IAutoCompleteInputProps<T>) {
        super(props);
        this.state = {
            value: '',
            showList: true,
            listStyle: this.makeListStyle(100, 50),
        };
    }

    private makeListStyle(top: number, width: number) {
        return StyleSheet.create({
            list: {
                position: 'absolute',
                backgroundColor: 'white',
                zIndex: 100,
                top,
                width,
                borderColor: '#afafaf',
                borderStyle: 'solid',
                borderWidth: 1,
                padding: 5,
                height: 320,
            }
        }).list;
    }

    private defaultStyle = StyleSheet.create({
        container: {
            position: 'relative',
        },
        item: {
            flexDirection: 'row',
            padding: 5,
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

    private onItemSelected(item: T) {
        this.setState({ ...this.state, value: String(item[this.props.textMember]), showList: false });
        if (this.props.onItemSelected) { this.props.onItemSelected(item); }
    }

    componentDidUpdate(prevProps: Readonly<IAutoCompleteInputProps<T>>) {
        if (prevProps.data != this.props.data) {
            this.setState({ ...this.state, showList: true });
        }
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <TextInput
                    style={this.props.textInputStyle}
                    onChangeText={(text) => {
                        this.setState({ ...this.state, value: text });
                        if (this.props.onTextChanged) {
                            this.props.onTextChanged(text);
                        }
                    }}
                    onLayout={e => {
                        this.setState({ ...this.state, listStyle: this.makeListStyle(e.nativeEvent.layout.height, e.nativeEvent.layout.width) });
                    }}
                    value={this.state.value} />
                {this.state.showList && this.props.data.length ?
                    <ScrollView style={this.state.listStyle}>
                        {this.props.data.map((entry, i) => (
                            <TouchableOpacity key={i} onPress={() => { this.onItemSelected(entry); }}>
                                <View style={this.defaultStyle.item}>
                                    {this.props.imageMember ?
                                        <Image style={this.defaultStyle.itemImage} source={{ uri: String(entry[this.props.imageMember]) }} /> :
                                        <></>
                                    }
                                    <View style={this.defaultStyle.itemText}>
                                        <Text>{entry[this.props.textMember]}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    : <></>
                }
            </View>
        );
    }
}
