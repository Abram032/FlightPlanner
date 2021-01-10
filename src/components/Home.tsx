import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';

export interface Props {
  backgroundColor?: string,
  color?: string
};

export class Home extends React.Component<Props> {
  render() {
    return (
      <View style={styles.body}>
        <Text>Home</Text>
      </View>
    );
  }
};

export default Home;