import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const ConfirmationScreen = ({ route }) => {
//   const route = useRoute();
  const { qrData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned Data</Text>
      <Text style={styles.data}>{qrData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  data: {
    fontSize: 16,
  },
});

export default ConfirmationScreen;
