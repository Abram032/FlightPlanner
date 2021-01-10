import React from 'react';
import { View } from 'react-native';
import { styles } from '../../styles/Styles';

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
      <View style={styles.cardBody}>
        <View style={{...styles.cardHeader, ...this.props.headerStyles }}>
          {this.props.headerComponent}
        </View>
        <View style={{...styles.cardContent, ...this.props.contentStyles }}>
          {this.props.contentComponent}
        </View>
      </View>
    );
  }
};

export default Card;