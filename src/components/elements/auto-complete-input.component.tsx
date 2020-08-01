import React, { Component } from 'react';
import {
    Text, StyleSheet, TextInput, View, StyleProp, TextStyle, TouchableOpacity, Image, FlatList,
} from 'react-native';

type StringProperties<T> = Pick<T, {
    [K in keyof T]: T[K] extends string | undefined ? K : never
}[keyof T]>;

interface IAutoCompleteInputProps<T> {
    textInputStyle?: StyleProp<TextStyle>;
    onTextChanged?: (text: string) => any;
    onItemSelected?: (item: T) => any;
    idMember: keyof T;
    textMember: keyof StringProperties<T>;
    secondaryTextMember?: keyof StringProperties<T>;
    imageMember?: keyof StringProperties<T>;
    data: T[];
}

interface IAutoCompleteInputState<T> {
    value: string;
    data: T[];
}

export class AutoCompleteInput<T> extends Component<IAutoCompleteInputProps<T>, IAutoCompleteInputState<T>> {
    constructor(props: IAutoCompleteInputProps<T>) {
        super(props);
        this.state = {
            value: '',
            data: this.props.data,
        };
    }


    private styles = StyleSheet.create({
        container: {
            marginBottom: 10,
        },
        headerContainer: {
            marginBottom: -10,
        },
        item: {
            flexDirection: 'row',
            backgroundColor: '#fff',
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
        secondaryText: {
            color: '#a0a0ac',
        },
    });

    private onItemSelected(item: T) {
        this.setState({ ...this.state, value: String(item[this.props.textMember]), data: [] });
        if (this.props.onItemSelected) { this.props.onItemSelected(item); }
    }

    componentDidUpdate(prevProps: Readonly<IAutoCompleteInputProps<T>>) {
        if (prevProps.data != this.props.data) {
            this.setState({ ...this.state, data: this.props.data });
        }
    }

    render() {
        return (
            <FlatList
                style={this.styles.container}
                stickyHeaderIndices={[0]}
                ListHeaderComponentStyle={this.styles.headerContainer}
                data={this.state.data}
                keyExtractor={item => `${item[this.props.idMember]}`}
                ListHeaderComponent={
                    <TextInput
                        style={this.props.textInputStyle}
                        onChangeText={(text) => {
                            this.setState({ ...this.state, value: text });
                            if (this.props.onTextChanged) {
                                this.props.onTextChanged(text);
                            }
                        }}
                        value={this.state.value}
                    />
                }
                renderItem={(props) => (
                    <TouchableOpacity key={props.index} onPress={() => { this.onItemSelected(props.item); }}>
                        <View style={this.styles.item}>
                            {this.props.imageMember ?
                                <Image
                                    style={this.styles.itemImage}
                                    source={{ uri: String(props.item[this.props.imageMember]) }}
                                /> : <></>
                            }
                            <View style={this.styles.itemText}>
                                <Text>{props.item[this.props.textMember]}</Text>
                                {this.props.secondaryTextMember ?
                                    <Text style={this.styles.secondaryText}>
                                        {props.item[this.props.secondaryTextMember]}
                                    </Text>
                                    : <></>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
}
