import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CreateAccount from './container/Create-Account';
import Button from './component/UI/Button/button';

export default function App() {
  return (
    <React.Fragment>
      <View style={styles.logo}>
        <Image
          source={require('./assets/logo_foliofirst.png')}
        />
      </View>
      <CreateAccount />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  pageHeader: {
    fontWeight: 'bold',
    fontSize: 22
  },
  makeBold: {
    fontWeight: 'bold',
  },
  para: {
    marginTop: 10
  }
});


