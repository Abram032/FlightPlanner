import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface Props {
  headerComponent: React.ReactNode,
  contentComponent: React.ReactNode,
  headerStyles?: object,
  contentStyles?: object
};

export class Card extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={this.props.headerStyles ?? styles.header}>
          {this.props.headerComponent}
        </View>
        <View style={this.props.contentStyles ?? styles.content}>
          {this.props.contentComponent}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    minHeight: 40,
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  }
});

export default Card;