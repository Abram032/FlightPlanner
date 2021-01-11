import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FlightPlan } from '../../models/FlightPlan';
import { Card } from '../shared/Card';
import { Formik } from 'formik';
import { styles } from '../../styles/Styles';
import { CustomFlightPlanForm } from '../forms/createCustomFlightPlan/CustomFlightPlanForm';
import * as flightPlansStore from '../../stores/flightPlansStore';

export interface Props {
  navigation: any,
  route: {
    params: string
  },
}

interface State {
  flightPlan: FlightPlan | null
}

export class FlightPlanCustomForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
    this.state = {
      flightPlan: null
    }
  }

  async componentDidMount() {
    if(!!this.props.route.params) {
      const flightPlan = await flightPlansStore.getFlightPlanById(this.props.route.params);
      this.setState({ flightPlan: flightPlan ?? null });
    }
  }

  render() {
    return (
      <View style={styles.componentBody}>
        <CustomFlightPlanForm flightPlan={this.state.flightPlan} navigation={this.props.navigation} />
      </View>
    );
  }
};

export default FlightPlanCustomForm;