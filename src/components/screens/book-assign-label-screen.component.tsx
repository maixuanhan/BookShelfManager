import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { IStackNavigationProperties } from '../common/stack-navigation-props.interface';
import { Label } from '../../models/label';
import { LabelService } from '../../services/label-service';
import CheckBox from '@react-native-community/checkbox';

interface ILabelSelection {
    label: Label;
    selected: boolean;
    isNew: boolean;
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
    private processing = false;
    private labelService = new LabelService();
    private styles = StyleSheet.create({
        view: {
            flexGrow: 1,
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
            marginBottom: 2,
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
            height: 70,
            flexDirection: 'row-reverse',
        },
        itemTextView: {
            flex: 1,
            marginLeft: 8,
            justifyContent: 'center',
        },
        itemCheckboxView: {
            margin: 8,
            justifyContent: 'center',
        },
        itemSeparator: {
            height: 1,
            width: "100%",
            backgroundColor: "#ced0ce",
        },
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
        const newLabels: string[] = this.props.route.params?.news || [];
        const labels: ILabelSelection[] = labelInfos.map(label => ({
            label, isNew: false, editing: false, displayed: true,
            selected: (labelIds.indexOf(label.id) > -1),
        }));
        newLabels.forEach(name => {
            const label = labels.find(l => l.label.name === name);
            if (label) {
                label.selected = true;
            } else {
                labels.push({
                    label: new Label(undefined, name),
                    isNew: true,
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
                    isNew: true,
                    selected: false,
                    displayed: true,
                });
            }
            labels = labels.map(r => (r.label.name.indexOf(text) === -1 ? { ...r, displayed: false } : r));
        }
        this.setState({ ...this.state, labels, query: text });
    }

    private async onItemSelected(item: ILabelSelection) {
        item.selected = !item.selected;
        if (item.editing) {
            item.editing = false;
            this.filter('');
        } else {
            this.setState({ ...this.state });
        }
    }

    private async onDone() {
        if (this.processing) {
            return;
        }
        this.processing = true;
        try {
            const ids: number[] = this.state.labels.filter(r => r.selected && !r.isNew && r.label.id)
                .map(r => r.label.id);
            const news: string[] = this.state.labels.filter(r => r.selected && r.isNew).map(r => r.label.name);
            if (!this.props.dbReady && news.length) {
                throw new Error('Database is not ready yet');
            }
            const labels = await Promise.all(news.map(name => this.labelService.addLabel(name)));
            if (labels.length) {
                ids.push(...labels.map(l => l.id));
            }

            this.props.navigation.navigate('book.add', { ids });
        } catch (e) {
            this.processing = false;
            Alert.alert(`Cannot assign labels: ${e.message}`);
        }
    }

    public componentDidMount() {
        if (this.props.dbReady) {
            this.initializeList();
        }
    }

    public componentDidUpdate(prevProps: IBookAssignLabelScreenProps) {
        if (this.props.dbReady && this.props.dbReady !== prevProps?.dbReady) {
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
                    ItemSeparatorComponent={() => <View style={this.styles.itemSeparator} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            this.onItemSelected(item);
                        }}>
                            <View style={this.styles.itemView}>
                                <View style={this.styles.itemCheckboxView}>
                                    <CheckBox value={item.selected} onValueChange={(checked: boolean) => {
                                        this.onItemSelected(item);
                                    }} />
                                </View>
                                <View style={this.styles.itemTextView}>
                                    <Text>{item.label.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={
                        <View style={this.styles.buttonView}>
                            <View style={this.styles.wrapButtonView}>
                                <Button color={this.styles.saveButton.backgroundColor} title="Done"
                                    onPress={() => { this.onDone(); }} />
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
