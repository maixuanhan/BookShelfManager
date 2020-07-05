import React, { Component } from 'react';
import { Text, StyleSheet, TextInput, View, StyleProp, TextStyle, ScrollView, TouchableOpacity, Image } from 'react-native';

interface IAutoCompleteInputProps {
    textInputStyle?: StyleProp<TextStyle>;
    onTextChanged?: (text: string) => any;
    onItemSelected?: (item: any) => any;
    textMember: string;
    imageMember: string;
    data: any[];
}

interface IAutoCompleteInputState {
    value: string;
    showList: boolean;
    listStyle: any;
}

export class AutoCompleteInput extends Component<IAutoCompleteInputProps, IAutoCompleteInputState> {
    constructor(props: IAutoCompleteInputProps) {
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
            paddingRight: 50,
        },
        itemImage: {
            width: 50,
            height: 70,
        },
        itemText: {
            padding: 5,
        },
    });

    private onItemSelected(item: any) {
        this.setState({ ...this.state, value: item[this.props.textMember], showList: false });
        if (this.props.onItemSelected) { this.props.onItemSelected(item); }
    }

    componentDidUpdate(prevProps: Readonly<IAutoCompleteInputProps>) {
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
                                    <Image style={this.defaultStyle.itemImage} source={{ uri: entry[this.props.imageMember] }} />
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
