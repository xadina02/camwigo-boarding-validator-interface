import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import JourneyFleetDetails from './JourneyFleetDetails'
import useGetTicketDetails from "../utils/useGetTicketDetail";
import { useNavigation } from '@react-navigation/native'
import { BASE_URL, IMAGE_BASE_URL } from "../config";

const JourneyCard = ({ journey }) => {
  const navigation = useNavigation();
  const imageIconLink = `${IMAGE_BASE_URL}${journey.reservation.vehicle_route_destination.vehicle.vehicle_category.icon_link}`;
  const [theTicketDetails, setTicketDetails] = useState(null);

  const appToken = "sekurity$227";

  const { ticketDetails, loading, fetchTicketDetails } =
   useGetTicketDetails();

  const handleSeeDetails = async () => {
    await fetchTicketDetails(journey.reservation.id, appToken, (fetchedDetails) => {
      setTicketDetails(fetchedDetails);
      navigation.navigate("TicketDetailsScreen", {
        journey: fetchedDetails,
      });
    });
  };

  useEffect(() => {
    setTicketDetails(ticketDetails);
  }, [ticketDetails]);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <Image source={{ uri: imageIconLink }} style={styles.vehicleIcon} />
          <Text style={styles.vehicleName}>{journey.reservation.vehicle_route_destination.vehicle.name}</Text>
        </View>
        <Text style={styles.type}>{journey.reservation.vehicle_route_destination.vehicle.vehicle_category.name.en.toUpperCase()}</Text>
      </View>

      <JourneyFleetDetails journey={journey.reservation.vehicle_route_destination} statusValue={journey.status} seating={false} status={true} none={false}/>

      <TouchableOpacity style={styles.button} onPress={handleSeeDetails}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f5f5f5"
          />
        ) : (
          <Text style={styles.buttonText}>View ticket ➔</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#41D635',
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#070C35',
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#18BA82',
    backgroundColor: '#E0F4EC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00103D',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JourneyCard;
