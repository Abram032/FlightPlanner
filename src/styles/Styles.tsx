import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#03adfc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitleText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 32
  },
  singInButtonContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    minHeight: 40,
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  cardHeaderText: {
    color: '#222',
    fontFamily: 'Roboto-Medium',
  },
  cardContent: {
    flex: 1,
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },
  componentBody: {
    flex: 1,
    backgroundColor: '#03adfc',
    alignItems: 'center',
    padding: 20
  },
  componentButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  componentButtonText: {
    color: '#222',
    fontFamily: 'Roboto-Medium',
  },
  componentText: {
    marginBottom: 10,
  },
  flatListContainer: {
    flex: 1,
    padding: 10,
  },
  touchableOpacity: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  componentDetailContainer: {
    flex: 1,
    padding: 10
  }
});

export const googleStyles = StyleSheet.create({
  googleButton: {
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
  googleButtonImageIcon: {
    marginRight: 24,
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  googleButtonText: {
    fontFamily: 'Roboto-Medium',
    color: '#444'
  }
});

export const formStyles = StyleSheet.create({
  inputText: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 5
  },
  formContainer: {
    flex: 1,
    width: '100%'
  },
  formButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  formButtonText: {
    color: '#222',
    fontFamily: 'Roboto-Medium',
  },
  formDateText: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    textAlignVertical: 'center',
    padding: 5
  }
});

export default styles;