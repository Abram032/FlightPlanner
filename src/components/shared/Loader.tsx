import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

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
  
const styles = StyleSheet.create({
  loader: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;