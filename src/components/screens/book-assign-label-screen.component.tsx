import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
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
    dbReady: boolean;
}

interface IBookAssignLabelScreenState {
    labels: ILabelSelection[];
    query: string;
}

export class BookAssignLabelScreen extends Component<IBookAssignLabelScreenProps, IBookAssignLabelScreenState> {
    private loaded = false;
    private labelService = new LabelService();
    private styles = StyleSheet.create({
        view: {
            flexGrow: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 10,
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
        itemView: {
            backgroundColor: 'cyan',
            height: 70,
        }
    });

    constructor(props: IBookAssignLabelScreenProps) {
        super(props);
        this.state = {
            labels: [],
            query: '',
        };
    }

    private async initializeList(): Promise<void> {
        if (!this.props.dbReady || this.loaded) { return; }
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
            const matched = labels.find(r => r.label.name === text);
            if (!matched) {
                labels.unshift({
                    label: new Label(undefined, text),
                    editing: true,
                    new: true,
                    selected: false,
                    displayed: true,
                });
            }
            labels = labels.map(r => (r.label.name.indexOf(text) === -1 ? { ...r, displayed: false } : r));
        }
        this.setState({ ...this.state, labels, query: text });
    }

    public componentDidUpdate(prevProps: IBookAssignLabelScreenProps) {
        if (this.props.dbReady && !prevProps.dbReady) {
            this.initializeList();
        }
    }

    public render() {
        const labels = this.state.labels.filter(r => r.displayed);
        return (
            <>
                <View style={this.styles.inputView}>
                    <TextInput style={this.styles.inputForm} value={this.state.query}
                        onChangeText={text => {
                            this.filter(text);
                        }}
                    />
                </View>
                <FlatList
                    data={labels}
                    keyExtractor={item => item.label.name}
                    contentContainerStyle={this.styles.view}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            item.selected = !item.selected;
                            if (item.editing) {
                                item.editing = false;
                                this.filter('');
                            }
                        }}>
                            <View style={this.styles.itemView}>
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
            </>
        );
    }
}
