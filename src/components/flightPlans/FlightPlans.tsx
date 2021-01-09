import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { FlightPlan } from '../../models/FlightPlan';
import { Card } from '../shared/Card';

let data: FlightPlan[] = [
  new FlightPlan('784287-23424-32423-42342', 'EPWA -> EDDB'),
  new FlightPlan('784287-23424-32423-42343', 'EDDB -> EPWA'),
];

export class FlightPlans extends React.Component {
  constructor(props: any) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onShowFlightPlanDetails = this.onShowFlightPlanDetails.bind(this);
    this.onCreateFlightPlan = this.onCreateFlightPlan.bind(this);
  }

  renderItem({ item }: { item: FlightPlan }) {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.itemContainer} onPress={this.onShowFlightPlanDetails}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  
  renderHeader() {
    return (
      <View>
        <Text style={styles.cardHeader}>Saved flight plans:</Text>
      </View>
    );
  };

  renderContent() {
    return (
      <View style={styles.itemsContainer}>
        <FlatList 
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  onCreateFlightPlan() {

  };

  onShowFlightPlanDetails() {

  };

  render() {
    return (
      <View style={styles.body}>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={this.onCreateFlightPlan}>
          <Text style={styles.buttonText}>+ Create new flight plan</Text>
        </TouchableOpacity>
        <Card headerComponent={this.renderHeader()} contentComponent={this.renderContent()} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#03adfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#222',
    fontFamily: 'Roboto-Medium',
  },
  cardHeader: {
    color: '#222',
    fontFamily: 'Roboto-Medium',
  },
  itemsContainer: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  }
});

export default FlightPlans;