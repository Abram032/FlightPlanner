import React from 'react';
import GoogleButton from '../buttons/GoogleButton';
import { View, StyleSheet, Text } from 'react-native'
import { signIn, isAuthenticated } from '../../services/AuthService';

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Flight Planner</Text>
        </View>
        <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#03adfc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 32
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SignIn;