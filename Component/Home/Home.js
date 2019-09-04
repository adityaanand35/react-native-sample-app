import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "react-router-native";

const input = props => {
  return (
    <React.Fragment>
      <ScrollView>
        <Image
          source={require("../../assets/ff-hero-image.png")}
          style={{ marginTop: 10 }}
        />
        <Text style={styles.welcome}>Welcome to FolioFirst!</Text>
        <Text style={styles.welcomeDesc}>
          From the brokerage that's been revolutionizing online investing since
          2000
        </Text>
        <View style={styles.createAccountBtn}>
          <Link to={`${props.match.url}create-account`} style={styles.navItem}>
            <Text style={{color: '#fff', fontSize: 15}}>Create an Account</Text>
          </Link>
        </View>

        <View style={styles.container}>
          <Text style={styles.paraHeader}>Who is FolioFirst? </Text>
          <Text style={styles.para}>
            FolioFirst was created to help make investing easy, accessible, and
            affordable for everyone.
          </Text>
          <Text style={styles.para}>
            FolioFirst gives you virtually unlimited commission-free trading1
            among more than 200 stocks and three exchange-traded funds (ETFs),
            enhanced investing tools, and protection for cash in your
            account—for just $5 per month.
          </Text>
          <Text style={styles.para}>
            That’s less than some other brokerages charge for just a single
            trade!
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default input;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  welcome: {
    position: "absolute",
    top: 80,
    color: "#fff",
    fontSize: 30,
    margin: 10
  },
  welcomeDesc: {
    position: "absolute",
    top: 120,
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  createAccountBtn: {
    position: "absolute",
    top: 230,
    left: 10
  },
  para: {
    marginTop: 25
  },
  paraHeader: {
    fontSize: 25,
    color: "#0084ad"
  },
  navItem: {
      backgroundColor: "#ED6247",
      padding: 7,
      borderRadius: 3
  }
});
