import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { FlightPlan } from '../../models/FlightPlan';
import { Card } from '../shared/Card';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/Styles';

let data: FlightPlan[] = [
  new FlightPlan('EPWA -> EDDB', new Date()),
  new FlightPlan('EDDB -> EPWA', new Date()),
];

interface State {
  isLoading: boolean
}

const Stack = createStackNavigator();

export class FlightPlans extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true
    }

    this.renderHeader = this.renderHeader.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onShowDetails = this.onShowDetails.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  renderItem({ item }: { item: FlightPlan }) {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacity} onPress={() => { this.onShowDetails(item) }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  
  renderHeader() {
    return (
      <View>
        <Text style={styles.cardHeaderText}>Saved flight plans:</Text>
      </View>
    );
  };

  renderContent() {
    return (
      <View style={styles.flatListContainer}>
        <FlatList 
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  onCreate() {
    const { navigation } = this.props;
    navigation.navigate("FlightPlanCustomForm");
  };

  onShowDetails(flightPlan: FlightPlan) {
    const { navigation } = this.props;
    navigation.navigate("FlightPlanDetails", flightPlan.id);
  };

  render() {
    return (
      <View style={styles.componentBody}>
        <TouchableOpacity activeOpacity={0.8} style={styles.componentButton} onPress={this.onCreate}>
          <Text style={styles.componentButtonText}>+ Create new flight plan</Text>
        </TouchableOpacity>
        <Card headerComponent={this.renderHeader()} contentComponent={this.renderContent()} />
      </View>
    );
  }
};

export default FlightPlans;