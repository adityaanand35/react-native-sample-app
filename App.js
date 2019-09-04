import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Route, NativeRouter } from "react-router-native";

import CreateAccount from "./Container/Create-Account";
import Home from "./Component/Home/Home";
import Congratulations from "./Component/Congratulations/Congratulations";

export default function App() {
  return (
    <React.Fragment>
      <NativeRouter>
        <View style={styles.logo}>
          <Image source={require("./assets/logo_foliofirst.png")} />
        </View>
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/congratulations" exact component={Congratulations} />
        <Route path="/" exact component={Home} />
      </NativeRouter>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  pageHeader: {
    fontWeight: "bold",
    fontSize: 22
  },
  makeBold: {
    fontWeight: "bold"
  },
  para: {
    marginTop: 10
  }
});
