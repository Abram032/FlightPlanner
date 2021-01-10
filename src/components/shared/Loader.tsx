import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/Styles';

export interface Props {
    backgroundColor?: string,
    color?: string
};

export function Loader(props: Props)  {
  return (
    <View style={{...styles.loader, backgroundColor: `${props.backgroundColor ? props.backgroundColor : '#03adfc'}` }}>
        <ActivityIndicator size='large' color={props.color ? props.color : 'white'} />
    </View>
  );
};

export default Loader;