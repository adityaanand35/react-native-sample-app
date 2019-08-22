import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default function App() {
  const [getFirstName, setFirstName] = useState('');
  const [getLastName, setLastName] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getUsername, setUsername] = useState('');
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Image
          source={require('./assets/logo_foliofirst.png')}
        />
      </View>
      <Text style={styles.pageHeader}>
        Let's get Started
    </Text>
      <Text>
        Fill out the fields below to begin creating your account. It only takes a minute!
    </Text>
      <TextField
        label='First Name*'
        style={styles.inputField}
        onChangeText={(text) => setFirstName(text)}
        value={getFirstName}
        tintColor='rgb(255, 0, 136)'
      />
      <TextField
        label='Last Name*'
        onChangeText={(text) => setLastName(text)}
        value={getLastName}
        tintColor='rgb(255, 0, 136)'
      />
      <TextField
        label='Email*'
        onChangeText={(text) => setEmail(text)}
        value={getEmail}
        tintColor='rgb(255, 0, 136)'
      />
      <Text>
        The username must be 8-32 characters long. It cannot contain symbols or spaces and is not case sensitive. 
        <Text style={styles.makeBold}>It is permanent and cannot be changed.</Text>
    </Text>
      <TextField
        label='Username*'
        onChangeText={(text) => getUsername(text)}
        value={setUsername}
        tintColor='rgb(255, 0, 136)'
      />
    </React.Fragment>

  );
}

const styles = StyleSheet.create({
  container: {
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
  inputField: {
    marginLeft: 10,
    marginRight: 10,
  }
});


