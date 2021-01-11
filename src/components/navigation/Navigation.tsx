import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { FlightPlansNavigation } from './FlightPlansNavigation';
import { isAuthenticated, signOut } from '../../services/AuthService';

export interface Props {
  setLoading(value: boolean): void,
  setAuthenticated(value: boolean): void
};

const Drawer = createDrawerNavigator();

export class Navigation extends React.Component<Props> {
  render() {
    return (
      <Drawer.Navigator initialRouteName="FlightPlans" drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Sign Out" onPress={async () => {
              try {
                this.props.setLoading(true);
                await signOut();
                const isAuth = await isAuthenticated();
                this.props.setAuthenticated(isAuth);
                this.props.setLoading(false);
              } catch (error) {
                console.error(error);
              }
            }} />
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen
          name='FlightPlans'
          component={FlightPlansNavigation}
          options={{ title: 'Flight plans' }}
        />
      </Drawer.Navigator>
    )
  }
};

export default Navigation;