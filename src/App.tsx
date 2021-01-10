import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { isAuthenticated } from './services/AuthService';
import { SignIn } from './components/auth/SignIn';
import { Loader } from './components/shared/Loader';
import { Navigation } from './components/navigation/Navigation';
import { styles } from './styles/Styles';

interface State {
  isLoading: boolean,
  isAuthenticated: boolean
}

export class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      isAuthenticated: false
    }

    this.renderAuthenticated = this.renderAuthenticated.bind(this);
    this.renderNotAuthenticated = this.renderNotAuthenticated.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.setAuthenticated = this.setAuthenticated.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  async componentDidMount() : Promise<void> {
    const isAuth = await isAuthenticated();
    this.setState({ isLoading: false, isAuthenticated: isAuth });
  }

  setAuthenticated(value: boolean) : void {
    this.setState({ isAuthenticated: value });
  }

  setLoading(value: boolean) : void {
    this.setState({ isLoading: value });
  }

  renderAuthenticated() : Element {
    return (
      <NavigationContainer>
        <Navigation setAuthenticated={this.setAuthenticated} setLoading={this.setLoading} />
      </NavigationContainer>
    )
  }

  renderNotAuthenticated() : Element {
    return (
      <View style={styles.body}>
        <SignIn setAuthenticated={this.setAuthenticated} setLoading={this.setLoading} />
      </View>
    )
  }

  renderLoader() : Element {
    return (
      <Loader />
    )
  }

  render() {
    if(this.state.isLoading) {
      return this.renderLoader();
    }

    return this.state.isAuthenticated ? this.renderAuthenticated() : this.renderNotAuthenticated();
  }
};

export default App;
