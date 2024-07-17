import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchForm from "../components/SearchForm";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate('QRCodeScannerScreen');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <View style={styles.another}>
          <View>
            <Image
              source={require("../assets/CamWiGo_logo.png")} // Replace with your logo
              style={styles.logo}
            />
          </View>
          <View style={styles.heading}>
            <Text style={styles.header}>CamWiGo - Scanner</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View>
          <SearchForm />
            <TouchableOpacity style={styles.scanButton} onPress={handlePress}>
              <Text style={styles.scanHeading}>SCAN QR CODE</Text>
              <View style={styles.codeHouse}>
                <Ionicons name="qr-code" size={180} color="#070c35" />
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070c35",
  },
  backgroundDiv: {
    height: "12%",
  },
  another: {
    height: "95%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
  container: {
    paddingHorizontal: 28,
    paddingVertical: 25,
    height: "90%",
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  belowDiv: {
    padding: '10%',
  },
  scanButton: {
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 40,
    // paddingHorizontal: 10,
    marginTop: '20%',
  },
  scanHeading: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    color: "#070C35",
  },
  codeHouse: {
    alignSelf: 'center',
  },
  heading: {
    marginLeft: "20%",
  },
  logo: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
});

export default HomeScreen;
