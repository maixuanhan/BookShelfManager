import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { DbReadyConsumer } from '../elements/db-ready.context.component';
import { IStackNavigationProperties } from '../common/stack-navigation-props.interface';
import { Label } from '../../models/label';
import { LabelService } from '../../services/label-service';

interface ILabelSelection {
    label: Label;
    selected: boolean;
    new: boolean;
    editing: boolean;
    displayed: boolean;
}

interface IBookAssignLabelScreenProps extends IStackNavigationProperties {
}

interface IBookAssignLabelScreenState {
    labels: ILabelSelection[];
}

export class BookAssignLabelScreen extends Component<IBookAssignLabelScreenProps, IBookAssignLabelScreenState> {
    constructor(props: IBookAssignLabelScreenProps) {
        super(props);
        this.state = {
            labels: [],
        };
    }

    private loaded = false;
    private labelService = new LabelService();

    private async tryInitializeList(dbReady: boolean): Promise<void> {
        if (!dbReady || this.loaded) { return; }
        const labelInfos = await this.labelService.getAllLabels();
        const labelIds: number[] = this.props.route.params?.ids || [];
        const newLabels: string[] = this.props.route.params?.new || [];
        const labels: ILabelSelection[] = labelInfos.map(label => ({
            label, new: false, editing: false, displayed: true,
            selected: (labelIds.indexOf(label.id) > -1),
        }));
        newLabels.forEach(name => {
            const label = labels.find(l => l.label.name === name);
            if (label) {
                label.selected = true;
            } else {
                labels.push({
                    label: new Label(undefined, name),
                    new: true,
                    selected: true,
                    editing: false,
                    displayed: true,
                });
            }
        });
        this.loaded = true;
        this.setState({ ...this.state, labels });
    }

    private filter(text: string): void {
        let labels: ILabelSelection[] = this.state.labels.filter(r => !r.editing)
            .map(r => ({ ...r, displayed: true })) || [];
        if (text) {
            const matched = this.state.labels.find(r => r.label.name === text);
            if (!matched) {
                labels.unshift({
                    label: new Label(undefined, text),
                    editing: true,
                    new: true,
                    selected: false,
                    displayed: true,
                });
            }
            labels = this.state.labels.map(r => (r.label.name.indexOf(text) < 0 ? { ...r, displayed: false } : r));
        }
        this.setState({ ...this.state, labels });
    }

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

    render() {
        return (
            <DbReadyConsumer>
                {({ dbReady }) => {
                    this.tryInitializeList(dbReady);
                    const labels = this.state.labels.filter(r => r.displayed);
                    return (
                        <FlatList
                            data={labels}
                            keyExtractor={item => item.label.name}
                            contentContainerStyle={this.styles.view}
                            ListHeaderComponent={() => (
                                <View style={this.styles.inputView}>
                                    <TextInput
                                        style={this.styles.inputForm}
                                        value={this.state.labels.length && this.state.labels[0].editing ?
                                            this.state.labels[0].label.name : ''}
                                        onChangeText={text => {
                                            this.filter(text);
                                        }}
                                    />
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    item.editing = false;
                                    item.selected = true;
                                    this.setState({ ...this.state });
                                }}>
                                    <View>
                                        <Text>{item.label.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={
                                <View style={this.styles.buttonView}>
                                    <View style={this.styles.wrapButtonView}>
                                        <Button color={this.styles.saveButton.backgroundColor} title="Done"
                                            onPress={() => { console.log(this.state.labels); }} />
                                    </View>
                                    <View style={this.styles.wrapButtonView}>
                                        <Button color={this.styles.cancelButton.backgroundColor} title="Cancel"
                                            onPress={() => { this.props.navigation.goBack(); }} />
                                    </View>
                                </View>
                            }
                        />
                    )
                }}
            </DbReadyConsumer>
        );
    }
}
