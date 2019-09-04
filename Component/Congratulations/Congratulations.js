import React from "react";
import { Text, Image, StyleSheet, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "react-router-native";

const congratulations = (props) => {
  return (
    <React.Fragment>
      <ScrollView>
        <Image
          source={require("../../assets/standingOnRock.jpg")}
          style={{
            marginTop: 10,
            width: Dimensions.get("window").width,
            height: 500
          }}
        />
        <Text style={styles.congratulationText}>Congratulations!</Text>
        <Text style={styles.congratulationDesc}>Your account is now live!</Text>
        <View style={styles.container}>
          <Text style={styles.header}>
            Check your e-mail to create a password!
          </Text>
          <Text style={styles.para}>
            An email was sent to direct you to our identity verification page.
            If you do not know your username, click on the Login page and click
            'Forgot Username'.
          </Text>
          <Text style={styles.para}>Check your email for next steps!</Text>
        </View>
        <Link to={`/`} style={styles.navItem}>
          <Text style={{ color: "#fff", fontSize: 15 }}>Go back</Text>
        </Link>
      </ScrollView>
    </React.Fragment>
  );
};

export default congratulations;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  congratulationText: {
    position: "absolute",
    top: 80,
    color: "#fff",
    fontSize: 30,
    margin: 10
  },
  congratulationDesc: {
    position: "absolute",
    top: 120,
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10
  },
  para: {
    marginTop: 15
  },
  navItem: {
    backgroundColor: "#0084ad",
    padding: 7,
    flexDirection: "row",
    justifyContent: "center"
}
});
