import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { googleStyles as styles } from '../../styles//Styles';

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
      <TouchableOpacity activeOpacity={0.9} style={styles.googleButton} onPress={this.props.onClick}>
        <Image source={require('../../assets/icons/google-logo.png')} style={styles.googleButtonImageIcon} />
        <Text style={styles.googleButtonText}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

export default GoogleButton;