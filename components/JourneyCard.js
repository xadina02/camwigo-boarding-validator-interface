import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import useGetTravelJourneyDetails from "../utils/useGetTravelJourneyDetail";
import JourneyFleetDetails from "./JourneyFleetDetails";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, IMAGE_BASE_URL } from "../config";

const JourneyCard = ({ journey }) => {
  const navigation = useNavigation();
  const imageBaseUrl = `${baseUrl}/storage`;
  const imageIconLink = `${IMAGE_BASE_URL}${journey.vehicle_route_destination.vehicle.vehicle_category.icon_link}`;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <Image source={{ uri: imageIconLink }} style={styles.vehicleIcon} />
          <Text style={styles.vehicleName}>{journey.vehicle_route_destination.vehicle.name}</Text>
        </View>
        <Text style={styles.type}>
          {journey.vehicle_route_destination.vehicle.vehicle_category.name.en.toUpperCase()}
        </Text>
      </View>

      <JourneyFleetDetails
        journey={journey}
        seating={true}
        status={false}
        none={false}
      />
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
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
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
});

export default JourneyCard;
