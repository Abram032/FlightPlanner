import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlightPlans } from '../flightPlans/FlightPlans';
import { FlightPlanDetails } from '../flightPlans/FlightPlanDetails';
import { FlightPlanCustomForm } from '../flightPlans/FlightPlanCustomForm';

const Stack = createStackNavigator();

export class FlightPlansNavigation extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="FlightPlans">
        <Stack.Screen 
          name="FlightPlans" 
          component={FlightPlans} 
          options={{
            headerTitle: "Flight plans",
          }} 
        />
        <Stack.Screen 
          name="FlightPlanDetails" 
          component={FlightPlanDetails} 
          options={{
            headerTitle: "Flight plan details",
          }}
        />
        <Stack.Screen 
          name="FlightPlanCustomForm" 
          component={FlightPlanCustomForm} 
          options={{
            headerTitle: "Custom flight plan",
          }}
        />
      </Stack.Navigator>
    )
  }
};

export default FlightPlansNavigation;