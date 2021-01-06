import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Props {
  title: string;
  onClick: () => Promise<void>;
}

export class GoogleButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={this.props.onClick}>
        <Image source={require('../../assets/icons/google-logo.png')} style={styles.buttonImageIconStyle} />
        <Text style={styles.buttonTextStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    width: 200,
    justifyContent: 'center'
  },
  buttonImageIconStyle: {
    marginRight: 24,
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  buttonTextStyle: {
    fontFamily: 'Roboto-Medium',
    color: '#444'
  }
});

export default GoogleButton;