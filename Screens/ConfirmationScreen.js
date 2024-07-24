import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import BackArrow from "../assets/arrow-circle-left.png";
import { useNavigation } from "@react-navigation/native";
import ProfileIcon from "../assets/default_profile.png";
import Delimiter from "../assets/delimiter.png";
import SuccessTick from "../assets/success-tick1.png";
import FailureIcon from "../assets/failure_icon.png";
import JourneyCard from "../components/JourneyCard";

const ConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { ticket } = route.params;

  const handleClose = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <View style={styles.another}>
          <View>
            <TouchableOpacity
              style={styles.backArrowContainer}
              onPress={() => navigation.goBack()}
              accessible={true}
              accessibilityLabel="Back"
              accessibilityHint="Navigates to the previous screen"
            >
              <Image source={BackArrow} style={styles.backArrow} />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Scan Log</Text>
        </View>
      </View>

      <View style={styles.container}>
        {ticket ? (
          <>
            <View style={styles.topContainer}>
              <Image source={SuccessTick} style={styles.modalIcon} />
              <Text style={styles.validationStatusText}>Validated!</Text>
            </View>
            <Image source={Delimiter} style={styles.delimiter} />
            <View style={styles.ticketDetails}>
              <View style={styles.profileContainer}>
                <Image source={ProfileIcon} style={styles.profileImage} />
                <View style={styles.userInfo}>
                  <Text
                    style={styles.userName}
                  >{`${ticket.reservation.user.first_name} ${ticket.reservation.user.last_name}`}</Text>
                  <Text style={styles.userType}>Passenger</Text>
                </View>
              </View>
              <View style={styles.separator} key={ticket.id}>
                <JourneyCard key={ticket.id} journey={ticket.reservation} />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* <View style={styles.topContainer}> */}
            <Image source={FailureIcon} style={styles.failureIcon} />
            <Text style={styles.validationStatusTextFailed}>Failed!</Text>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
            {/* </View> */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070c35",
  },
  container: {
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    height: "94%",
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backgroundDiv: {
    height: "6%",
  },
  another: {
    height: "100%",
    backgroundColor: "#070C35",
  },
  backArrowContainer: {
    position: "absolute",
    left: 15,
    top: "29%",
    transform: [{ translateY: 8 }],
    zIndex: 1, // Ensure it's on top
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8",
  },
  header: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 0.2 * StatusBar.currentHeight,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  data: {
    fontSize: 16,
  },
  topContainer: {
    marginTop: "-14%",
    marginBottom: 30,
    // backgroundColor: 'bisque'
  },
  modalIcon: {
    width: 157,
    height: 150,
    marginBottom: 5,
    alignSelf: "center",
  },
  failureIcon: {
    width: 263,
    height: 250,
    marginBottom: 5,
    alignSelf: "center",
  },
  delimiter: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
  validationStatusText: {
    textAlign: "center",
    color: "#070C35",
    fontSize: 25,
    fontWeight: "900",
  },
  validationStatusTextFailed: {
    textAlign: "center",
    color: "red",
    fontSize: 25,
    fontWeight: "900",
    marginVertical: 20,
  },
  ticketDetails: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "left",
    padding: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
    marginLeft: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A1A3AE",
  },
  loader: {
    height: 18.1,
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ConfirmationScreen;
