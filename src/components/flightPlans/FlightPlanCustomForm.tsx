import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FlightPlan } from '../../models/FlightPlan';
import { Card } from '../shared/Card';
import { Formik } from 'formik';
import { styles } from '../../styles/Styles';
import { CustomFlightPlanForm } from '../forms/createCustomFlightPlan/CustomFlightPlanForm';

export class FlightPlanCustomForm extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.componentBody}>
        <CustomFlightPlanForm />
      </View>
    );
  }
};

export default FlightPlanCustomForm;