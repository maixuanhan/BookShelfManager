import React, { Component } from 'react';
import { Text, FlatList, ListRenderItemInfo, View, StyleSheet, RefreshControl } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TRoutingParamList } from '../common/routing-param-list';
import { Label } from '../../models/label';
import { LabelService } from '../../services/label-service';
import { LabelItem } from '../elements/label-item.component';

interface ILabelListScreenProps extends StackScreenProps<TRoutingParamList, 'label.list'> {
    dbReady: boolean;
}

interface ILabelListScreenState {
    labels: Label[];
    loading: boolean;
}

export class LabelListScreen extends Component<ILabelListScreenProps, ILabelListScreenState> {
    constructor(props: ILabelListScreenProps) {
        super(props);
        this.state = {
            labels: [],
            loading: false,
        };
    }

    private styles = StyleSheet.create({
        centeredContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listContainer: {
            flexGrow: 1,
        },
    });

    private labelService = new LabelService();

    private async tryLoadLabels() {
        if (this.props.dbReady) {
            console.log('try load labels...');
            let labels = this.state.labels;
            this.setState({ ...this.state, loading: true });
            try {
                const [lbs, count] = await this.labelService.getLabels(0, 500);
                labels = lbs;
                console.log('Total count:', count);
            } catch (ex) {
                console.log('Error happens while fetching labels.', ex);
            }
            this.setState({ ...this.state, labels, loading: false });
        }
    }

    public componentDidMount() {
        console.log('componentDidMount event');
        this.tryLoadLabels();
    }

    public componentDidUpdate(prevProps: ILabelListScreenProps) {
        if (this.props.dbReady !== prevProps.dbReady && this.props.dbReady) {
            this.tryLoadLabels();
        }
        if (this.props.route?.params?.new?.id !== prevProps.route?.params?.new?.id) {
            if (this.props.route?.params?.new?.id) {
                this.state.labels.unshift(this.props.route.params.new as Label);
                this.setState({ ...this.state });
            }
        }
    }

    public render() {
        return (
            <FlatList
                contentContainerStyle={this.styles.listContainer}
                ListEmptyComponent={
                    <View style={this.styles.centeredContainer}>
                        {this.state.loading ?
                            <Text>Loading labels...</Text> :
                            <Text>There is no label</Text>
                        }
                    </View>
                }
                data={this.state.labels}
                renderItem={(info: ListRenderItemInfo<Label>) =>
                    <LabelItem label={info.item} onDeleted={async (label: Label) => {
                        if (label.id) {
                            await this.labelService.deleteLabel(label.id);
                            const labels = this.state.labels.filter(r => r.id !== label.id);
                            this.setState({ ...this.state, labels });
                        }
                    }} />}
                keyExtractor={item => item.id?.toString() || 'never'}
                refreshControl={<RefreshControl
                    colors={['#9Bd35A', '#689F38']}
                    refreshing={this.state.loading}
                    onRefresh={() => { this.tryLoadLabels(); }} />}
            />
        );
    }
}
