import axios from "axios";
import { AuthContext } from "../store/auth";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  const [fetchedMessage, setFetchedMessage] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://expense-tracker-ab47e-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
            authCtx.token
        );
        setFetchedMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();

    return () => {};
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
