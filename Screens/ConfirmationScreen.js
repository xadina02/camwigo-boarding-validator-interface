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
import useValidateTicket from "../utils/useValidateTicket";
import useUserStore from "../zustand/useUserStore";
import BackArrow from "../assets/arrow-circle-left.png";
import { useNavigation } from "@react-navigation/native";
import ProfileIcon from "../assets/default_profile.png";
import Delimiter from "../assets/delimiter.png";
import SuccessTick from "../assets/success-tick1.png";
import JourneyCard from "../components/JourneyCard";

const ConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { routeScheduleId, vehicleId, qrData } = route.params;
  const { accessToken } = useUserStore();
  const appToken = "sekurity$227";

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const { ticket, loading } = useValidateTicket(
    accessToken,
    {
      route_schedule_id: routeScheduleId,
      vehicle_id: vehicleId,
      ticket_data: qrData,
      date: getCurrentDate(),
    },
    appToken
  );

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
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color="#070C35"
              style={styles.loader}
            />
          </View>
        ) : (
          <View>
            <View>
              <Image source={SuccessTick} style={styles.modalIcon} />
              <Text style={styles.validationStatusText} >Validated!</Text>
            </View>
            <Image source={Delimiter} style={styles.delimiter} />
            <View style={styles.ticketDetails}>
              <View style={styles.profileContainer}>
                <Image source={ProfileIcon} style={styles.profileImage} />
                <View style={styles.userInfo}>
                  <Text
                    style={styles.userName}
                  >{`${ticket.reservation.user.firstName} ${ticket.reservation.user.lastName}`}</Text>
                  <Text style={styles.userType}>Passenger</Text>
                </View>
              </View>
              <View style={styles.separator} key={journey.id}>
                <JourneyCard
                  key={ticket.id}
                  journey={ticket.reservation.vehicle_route_destination.id}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>
                <Image source={ReserveIcon} /> CLOSE
              </Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center",
    padding: 10,
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
  modalIcon: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  delimiter: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
  validationStatusText: {
    textAlign: "center",
    color: "#070C35",
    fontSize: 20,
    fontWeight: "900",
  },
  ticketDetails: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "15%",
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
});

export default ConfirmationScreen;
