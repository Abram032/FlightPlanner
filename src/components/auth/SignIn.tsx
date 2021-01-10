import React from 'react';
import GoogleButton from '../buttons/GoogleButton';
import { View, StyleSheet, Text } from 'react-native'
import { signIn, isAuthenticated } from '../../services/AuthService';
import { styles } from '../../styles/Styles';

export interface Props {
  setLoading: (value: boolean) => void;
  setAuthenticated: (value: boolean) => void;
}

export class SignIn extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.body}>
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitleText}>Flight Planner</Text>
        </View>
        <View style={styles.singInButtonContainer}>
          <GoogleButton 
            title="Sign in with Google"
            onClick={async () => {
              this.props.setLoading(true);
              await signIn();
              const isAuth = await isAuthenticated();
              this.props.setAuthenticated(isAuth);
              this.props.setLoading(false);
            }}
          />
        </View>
      </View>
    )
  }
}

export default SignIn;