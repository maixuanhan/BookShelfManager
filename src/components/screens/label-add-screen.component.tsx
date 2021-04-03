import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View, FlatList, Alert } from 'react-native';
import { Validator } from '../../services/validator';
import { LabelService } from '../../services/label-service';
import { Label } from '../../models/label';
import { StackScreenProps } from '@react-navigation/stack';
import { TRoutingParamList } from '../common/routing-param-list';

interface ILabelAddScreenProps extends StackScreenProps<TRoutingParamList, 'label.add'> {
    dbReady: boolean;
}

interface ILabelAddScreenState extends Partial<Label> {
}

export class LabelAddScreen extends Component<ILabelAddScreenProps, ILabelAddScreenState> {
    constructor(props: ILabelAddScreenProps) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };
    }

    private labelService = new LabelService();
    private updating = false;

    private styles = StyleSheet.create({
        view: {
            flexGrow: 1,
            justifyContent: 'space-between',
            padding: 10,
        },
        labelForm: {
            marginBottom: 4,
            fontSize: 16,
        },
        inputForm: {
            marginBottom: 12,
            backgroundColor: '#fff',
            borderColor: '#ced4da',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 4,
            height: 38,
            fontSize: 16,
        },
        inputView: {
            flex: 1,
            marginBottom: 10,
        },
        buttonView: {
            flexDirection: 'row-reverse',
        },
        wrapButtonView: {
            flex: 1,
            margin: 5,
        },
        saveButton: {
            backgroundColor: '#007bff',
        },
        cancelButton: {
            backgroundColor: '#6c757d',
        },
    });

    private async addLabel() {
        if (this.props.dbReady && !this.updating) {
            this.updating = true;
            try {
                const validationResult = new Validator([
                    {
                        validator: (name) => name, data: [this.state.name],
                        failMessage: 'Label name must not be empty',
                    },
                ]).validate();
                if (!validationResult.ok) {
                    throw new Error(validationResult.message);
                }
                const result = await this.labelService.addLabel(this.state.name || '', this.state.description);
                console.log(result);
                this.props.navigation.navigate('label.list', {
                    new: {
                        id: result.id, name: result.name, description: result.description,
                    },
                });
            } catch (ex) {
                console.error('Cannot add label:', ex);
                Alert.alert(`Cannot add label: ${ex.message}`);
            } finally {
                this.updating = false;
            }
        } else if (this.updating) {
            console.log('Label is updating');
        } else {
            console.log('Database is not ready');
        }
    }

    public render() {
        return (
            <FlatList
                data={[1]}
                keyExtractor={item => item.toString()}
                contentContainerStyle={this.styles.view}
                renderItem={() => (
                    <View style={this.styles.inputView}>
                        <Text style={this.styles.labelForm}>Name</Text>
                        <TextInput
                            style={this.styles.inputForm}
                            value={this.state.name}
                            onChangeText={text => {
                                this.setState({ ...this.state, name: text });
                            }}
                        />
                        <Text style={this.styles.labelForm}>Description</Text>
                        <TextInput
                            multiline={true}
                            style={this.styles.inputForm}
                            value={this.state.description}
                            onChangeText={text => {
                                this.setState({ ...this.state, description: text });
                            }}
                        />
                    </View>
                )}
                ListFooterComponent={
                    <View style={this.styles.buttonView}>
                        <View style={this.styles.wrapButtonView}>
                            <Button color={this.styles.saveButton.backgroundColor} title="Save"
                                onPress={() => this.addLabel()} />
                        </View>
                        <View style={this.styles.wrapButtonView}>
                            <Button color={this.styles.cancelButton.backgroundColor} title="Cancel"
                                onPress={() => { this.props.navigation.navigate('label.list'); }} />
                        </View>
                    </View>
                }
            />
        );
    }
}
