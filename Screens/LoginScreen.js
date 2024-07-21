import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { toast } from "react-toastify";
import { useNavigation } from "@react-navigation/native";
import useGetUser from "../utils/useGetUser";
import Toast from 'react-native-toast-message';
import useUserStore from "../zustand/useUserStore";
import BackArrow from "../assets/arrow-circle-left.png";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const appToken = "sekurity$227";

  const { loading, fetchUser } = useGetUser();


  const handleContinue = async () => {
    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    if (!data.email || !data.password) {
      // toast.error("All required fields must be filled.");
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "All required fields must be filled.",
      });
      return;
    }

    await fetchUser(data, appToken, (userData) => {
      if (userData) { Toast.show({
        type: 'success',
        text1: 'Success',
        text2: "Login Successful",
      });
        navigation.navigate("HomeScreen");
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <View style={styles.another}>
          <View style={styles.topper}>
            <Image
              source={require("../assets/CamWiGo_logo.png")} // Replace with your logo
              style={styles.logo}
            />
            <View style={styles.topperText}>
              <Text style={styles.title}>CamWiGo</Text>
              <Text style={styles.subHeader}>No stress, travel easy..</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.container}>
          <Text style={styles.topic}>LOGIN</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue ➔</Text>
          </TouchableOpacity>
          <View style={styles.extra}>
            <TouchableOpacity>
              <Text style={styles.extraText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.extraText}>Contact us</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070c35",
  },
  backgroundDiv: {
    height: "25%",
  },
  another: {
    height: "95%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backArrowParent: {
    // backgroundColor: 'green',
  },
  backArrowContainer: {
    left: 8,
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8",
  },
  heading: {
    marginLeft: "10%",
  },
  header: {
    color: "#CDD2F8",
    fontSize: 25,
    fontWeight: "900",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    height: "90%",
    position: "relative",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topper: {
    flexDirection: "row",
    alignItems: "center",
  },
  topperText: {
    marginLeft: "10%",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },
  topic: {
    color: "#070c35",
    fontSize: 30,
    fontWeight: "900",
    alignSelf: "center",
    marginTop: "14%",
    marginBottom: "10%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: "7%",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  subHeader: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 20,
  },
  star: {
    color: "#FF0B45",
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    // marginTop: "5%",
    marginBottom: "5%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  extra: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: "25%",
  },
  extraText: {
    color: "#737373",
    fontWeight: "600",
  },
});

export default LoginScreen;
