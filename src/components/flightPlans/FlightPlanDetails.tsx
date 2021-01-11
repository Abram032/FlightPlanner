import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { CoordinateType, FlightPlan, Node } from '../../models/FlightPlan';
import { Card } from '../shared/Card';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { styles } from '../../styles/Styles';
import * as flightPlanStore from '../../stores/flightPlansStore';
import { StackActions } from '@react-navigation/native';

const Stack = createStackNavigator();

export interface Props {
  route: {
    params: string
  },
  navigation: any
};

interface State {
  flightPlan: FlightPlan | null | undefined
}

export class FlightPlanDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      flightPlan: null
    }

    this.onEdit = this.onEdit.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderItemButton = this.renderItemButton.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderItemHeader = this.renderItemHeader.bind(this);
    this.renderItemContent = this.renderItemContent.bind(this);
    this.onShowDetails = this.onShowDetails.bind(this);
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      const flightPlan = await flightPlanStore.getFlightPlanById(this.props.route.params);
      this.setState({ flightPlan: flightPlan });
      this.forceUpdate();
    });
    const flightPlan = await flightPlanStore.getFlightPlanById(this.props.route.params);
    this.setState({ flightPlan: flightPlan });
  }

  onEdit() {
    const { navigation } = this.props;
    navigation.navigate("FlightPlanCustomForm", this.state.flightPlan?.id);
  }

  onDelete = async () => {
    if(!!this.state.flightPlan)
    {
      await flightPlanStore.deleteFlightPlan(this.state.flightPlan);
      const { navigation } = this.props;
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    }
  }

  onShowDetails(item: Node) {
    item.inDetailMode = !item.inDetailMode;
    this.forceUpdate();
  }

  renderItemButton(item: Node) {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacity} onPress={() => { this.onShowDetails(item) }}>
        <Text>{item.ident} {item.name !== null && item.name !== undefined ? `- ${item.name}` : ''} @ {item.altitude} ft</Text>
      </TouchableOpacity>
    )
  }

  renderItemHeader(item: Node) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => { this.onShowDetails(item) }}>
        <Text>{item.ident} {item.name !== null && item.name !== undefined ? `- ${item.name}` : ''} @ {item.altitude} ft</Text>
      </TouchableOpacity>
    )
  }

  renderItemContent(item: Node) {
    return (
      <View style={styles.componentDetailContainer}>
        <Text>ID: {item.ident}</Text>
        <Text>Name: {item.name ?? 'N/A'}</Text>
        <Text>Type: {item.type}</Text>
        <Text>Altitude: {item.altitude}</Text>
        {
          item.coordinateType === CoordinateType.MGRS ? 
          <Text>MGRS: {item.coordinates[0]}</Text> : 
          (<>
            <Text>Latitude: {item.coordinates[0]}</Text>
            <Text>Longitude: {item.coordinates[1]}</Text>
          </>)
        }
        <Text>Via: {!!item.via ? `${item.via.type} - ${item.via.ident}` : 'N/A'}</Text>
        <Text>TOT: {!!item.tot ? `${(new Date(item.tot)).getUTCHours()}${(new Date(item.tot)).getUTCMinutes()}Z` : 'N/A'}</Text>
        <Text>DTOT: 
          {!!item.dtot ? 
            ` ${(new Date(item.dtot.start)).getUTCHours()}${(new Date(item.dtot.start)).getUTCMinutes()}Z - ${(new Date(item.dtot.end)).getUTCHours()}${(new Date(item.dtot.end)).getUTCMinutes()}Z` : 'N/A'}
        </Text>
        <Text>Description: {item.description ?? 'N/A'}</Text>
      </View>
    );
  }

  renderItem({ item }: { item: Node }) {
    if(!item.inDetailMode) {
      return this.renderItemButton(item);
    } else {
      return (
        <Card headerComponent={this.renderItemHeader(item)} contentComponent={this.renderItemContent(item)} contentStyles={{ backgroundColor: '#eee' }}/>
      )
    }
  };

  renderHeader() {
    return (
      <View>
        <Text style={styles.cardHeaderText}>Details:</Text>
      </View>
    );
  };

  renderContent() {
    return (
      <View style={styles.componentDetailContainer}>
        <Text style={styles.componentText}>Name: {!!this.state.flightPlan ? this.state.flightPlan.name : ''}</Text>
        <Text style={styles.componentText}>Date: {!!this.state.flightPlan ? this.state.flightPlan.date.toLocaleString() : ''}</Text>
        <Text style={styles.componentText}>Description: {!!this.state.flightPlan ? this.state.flightPlan.description : ''}</Text>
        <FlatList 
          data={!!this.state.flightPlan ? this.state.flightPlan.nodes : []}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.componentBody}>
        <TouchableOpacity activeOpacity={0.8} style={styles.componentButton} onPress={this.onEdit}>
          <Text style={styles.componentButtonText}>Edit this flight plan</Text>
        </TouchableOpacity>
        <Card headerComponent={this.renderHeader()} contentComponent={this.renderContent()} />
        <TouchableOpacity activeOpacity={0.8} style={styles.componentButton} onPress={async () => await this.onDelete()}>
          <Text style={styles.componentButtonText}>Delete this flight plan</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default FlightPlanDetails;