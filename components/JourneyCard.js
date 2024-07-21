import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import useGetTravelJourneyDetails from "../utils/useGetTravelJourneyDetail";
import JourneyFleetDetails from "./JourneyFleetDetails";
import { useNavigation } from "@react-navigation/native";

const JourneyCard = ({ journey }) => {
  const navigation = useNavigation();
  const baseUrl = "http://192.168.103.124:8000";
  const imageBaseUrl = `${baseUrl}/storage`;
  const imageIconLink = `${imageBaseUrl}${journey.vehicle.vehicle_category.icon_link}`;
  const [journeyDetails, setJourneyDetails] = useState(null);

  const appToken = "sekurity$227";

  const { travelJourneyDetails, loading, fetchTravelJourneyDetails } =
    useGetTravelJourneyDetails();

  const handleNext = async () => {
    await fetchTravelJourneyDetails(journey.id, appToken, (fetchedDetails) => {
      setJourneyDetails(fetchedDetails);
      navigation.navigate("ReservationScreen", {
        journey: fetchedDetails,
      });
    });
  };

  useEffect(() => {
    setJourneyDetails(travelJourneyDetails);
  }, [travelJourneyDetails]);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <Image source={{ uri: imageIconLink }} style={styles.vehicleIcon} />
          <Text style={styles.vehicleName}>{journey.vehicle.name}</Text>
        </View>
        <Text style={styles.type}>
          {journey.vehicle.vehicle_category.name.en.toUpperCase()}
        </Text>
      </View>

      <JourneyFleetDetails
        journey={journey}
        seating={true}
        status={false}
        none={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f5f5f5"
            style={styles.loader}
          />
        ) : (
          <Text style={styles.buttonText}>View details ➔</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#41D635",
    borderWidth: 2,
    borderRadius: 20,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleIcon: {
    width: 23,
    height: 23,
    marginRight: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#070C35",
    marginLeft: -6,
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#18BA82",
    backgroundColor: "#E0F4EC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loader: {
    height: 18.1
  },
});

export default JourneyCard;
