import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FlightPlan } from '../../models/FlightPlan';
import { Card } from '../shared/Card';
import { Formik } from 'formik';
import { styles } from '../../styles/Styles';

interface State {
  flightPlan: {
    name: string | null,
    date: Date | null,
    description: string | null
  },
  nodes: {
    type: string | null;
    ident: string | null;
    gpsLatitude: number | null;
    gpsLongitude: number | null;
    dmsLatitude: number | null;
    dmsLongitude: number | null;
    mgrs: string | null;
    altitude: number | null;
    name?: string | null;
    tot?: Date | null;
    dtotStart?: Date | null;
    dtotEnd?: Date | null;
    viaType?: string | null;
    viaIdent?: string | null;
    description?: string | null;
  },
  test: String
};

export class FlightPlanCustomForm extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Formik
        initialValues={{ flightPlanName: '' }}
        onSubmit={values => console.log(values)}
      >
        <View style={styles.componentBody}>
          <TextInput placeholder={'Flight plan name'} />
        </View>
      </Formik>
    );
  }
};

export default FlightPlanCustomForm;