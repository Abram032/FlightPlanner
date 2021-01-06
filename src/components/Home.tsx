import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#03adfc',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;