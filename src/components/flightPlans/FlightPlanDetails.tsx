import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { FlightPlan, Node } from '../../models/FlightPlan';
import { Card } from '../shared/Card';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { styles } from '../../styles/Styles';

const Stack = createStackNavigator();

export interface Props {
  route: {
    params: string
  }
};

interface State {
  flightPlan: FlightPlan
}

export class FlightPlanDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const flightPlan = new FlightPlan('EPWA -> EPWA', new Date(), 'Sample text');
    flightPlan.addNode({
      id: uuidv4(),
      type: 'APT',
      ident: 'EPWA',
      name: 'Warsaw Chopin Airport',
      altitude: 361,
      coordinates: {
        latitude: 52.165833,
        longitude: 20.967222
      }
    });
    flightPlan.addNode({
      id: uuidv4(),
      type: 'FIX',
      ident: 'OBOLA',
      altitude: 21400,
      coordinates: {
        latitude: 52.1944,
        longitude: 16.211399999999998
      },
      via: {
        type: 'AWY-HI',
        ident: 'L980'
      }
    });
    flightPlan.addNode({
      id: uuidv4(),
      type: 'TGT',
      ident: 'SITE-1',
      altitude: 321,
      coordinates: {
        latitude: 51.87251,
        longitude: 17.65147,
        mgrs: '4QFJ 12345 67890'
      },
      tot: new Date(),
      dtot: {
        start: new Date(),
        end: new Date()
      },
      description: 'SA-6 Site'
    });
    flightPlan.addNode({
      id: uuidv4(),
      type: 'APT',
      ident: 'EPWA',
      name: 'Warsaw Chopin Airport',
      altitude: 361,
      coordinates: {
        latitude: 52.165833,
        longitude: 20.967222
      }
    });

    this.state = {
      flightPlan: flightPlan
    }

    this.onEdit = this.onEdit.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderItemButton = this.renderItemButton.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderItemHeader = this.renderItemHeader.bind(this);
    this.renderItemContent = this.renderItemContent.bind(this);
    this.onShowDetails = this.onShowDetails.bind(this);
  }

  onEdit() {

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
        <Text>Latitude: {item.coordinates.latitude}</Text>
        <Text>Longitude: {item.coordinates.longitude}</Text>
        <Text>MGRS: {item.coordinates.mgrs ?? 'N/A'}</Text>
        <Text>Via: {!!item.via ? `${item.via.type} - ${item.via.ident}` : 'N/A'}</Text>
        <Text>TOT: {!!item.tot ? `${item.tot.getUTCHours()}${item.tot.getUTCMinutes()}Z` : 'N/A'}</Text>
        <Text>DTOT: 
          {!!item.dtot ? 
            ` ${item.dtot.start.getUTCHours()}${item.dtot.start.getUTCMinutes()}Z - ${item.dtot.end.getUTCHours()}${item.dtot.end.getUTCMinutes()}Z` : 'N/A'}
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
        <Text style={styles.componentText}>Id: {this.state.flightPlan.id}</Text>
        <Text style={styles.componentText}>Name: {this.state.flightPlan.name}</Text>
        <Text style={styles.componentText}>Date: {this.state.flightPlan.date.toLocaleString()}</Text>
        <Text style={styles.componentText}>Description: {this.state.flightPlan.description}</Text>
        <FlatList 
          data={this.state.flightPlan.nodes}
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
      </View>
    );
  }
};

export default FlightPlanDetails;