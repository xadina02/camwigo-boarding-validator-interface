import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import useGetOrigins from "../utils/useGetOrigin";
import useGetDestinations from "../utils/useGetDestination";
import useGetSchedules from "../utils/useGetSchedule";
import useGetVehicles from "../utils/useGetVehicle";
import useUserStore from "../zustand/useUserStore";
import { useNavigation } from "@react-navigation/native";
import OriginIcon from "../assets/direct-down.png";
import DestinationIcon from "../assets/location.png";
import VehicleIcon from "../assets/bus.png";
import ScheduleIcon from "../assets/clock2.png";

const SearchForm = ({ setTheSelectedScheduleId, setTheSelectedVehicleId }) => {
  const navigation = useNavigation();
  const appToken = "sekurity$227";
  const { accessToken } = useUserStore();

  const { origins } = useGetOrigins(accessToken, appToken);
  const [destinations, setDestinations] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [time, setTime] = useState("");

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedOriginId, setSelectedOriginId] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDestinationId, setSelectedDestinationId] = useState(0);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [internalSelectedScheduleId, setInternalSelectedScheduleId] =
    useState(0); // Renamed
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [internalSelectedVehicleId, setInternalSelectedVehicleId] = useState(0); // Renamed

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { destinations: fetchedDestinations } = useGetDestinations(
    accessToken,
    selectedOriginId,
    appToken
  );
  const { schedules: fetchedSchedules } = useGetSchedules(
    accessToken,
    selectedDestinationId,
    appToken
  );
  const { vehicles: fetchedVehicles } = useGetVehicles(
    accessToken,
    internalSelectedScheduleId,
    appToken
  );

  useEffect(() => {
    setFilteredData(origins);
  }, [origins]);

  useEffect(() => {
    if (selectedOriginId) {
      setDestinations(fetchedDestinations);
    } else {
      setDestinations([]);
    }
    setSelectedDestination("");
    setSelectedSchedule("");
    setSelectedVehicle("");
    setSchedules([]);
    setVehicles([]);
  }, [selectedOriginId, fetchedDestinations]);

  useEffect(() => {
    if (selectedDestinationId) {
      setSchedules(fetchedSchedules);
    } else {
      setSchedules([]);
    }
    setSelectedSchedule("");
    setSelectedVehicle("");
    setVehicles([]);
  }, [selectedDestinationId, fetchedSchedules]);

  useEffect(() => {
    if (internalSelectedScheduleId) {
      setVehicles(fetchedVehicles);
    } else {
      setVehicles([]);
    }
    setSelectedVehicle("");
  }, [internalSelectedScheduleId, fetchedVehicles]);

  const openModal = (type) => {
    setModalType(type);
    if (type === "origin") {
      setFilteredData(origins);
    } else if (type === "destination") {
      setFilteredData(destinations);
    } else if (type === "schedule") {
      setFilteredData(schedules);
    } else if (type === "vehicle") {
      setFilteredData(vehicles);
    }
    setModalVisible(true);
  };

  const handleItemPress = (item) => {
    if (modalType === "origin") {
      setSelectedOrigin(item.origin.en);
      setSelectedOriginId(item.id);
    } else if (modalType === "destination") {
      setSelectedDestination(item.destination.en);
      setSelectedDestinationId(item.id);
    } else if (modalType === "schedule") {
      setSelectedSchedule(item.label.en + " - " + item.departure_time);
      setTime(item.departure_time);
      setInternalSelectedScheduleId(item.id); // Updated
      setTheSelectedScheduleId(item.id); // Update parent state
    } else if (modalType === "vehicle") {
      setSelectedVehicle(item.name);
      setInternalSelectedVehicleId(item.id); // Updated
      setTheSelectedVehicleId(item.id); // Update parent state
    }
    setModalVisible(false);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const renderModalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.modalItemText}>
        {modalType === "origin" && item.origin.en}
        {modalType === "destination" && item.destination.en}
        {modalType === "schedule" &&
          `${formatTime(item.departure_time)} - ${item.label.en}`}
        {modalType === "vehicle" && item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalSearchInput}
            placeholder="Search..."
            onChangeText={(text) =>
              setFilteredData(
                (modalType === "origin"
                  ? origins
                  : modalType === "destination"
                  ? destinations
                  : schedules
                ).filter((item) =>
                  item.label.toLowerCase().includes(text.toLowerCase())
                )
              )
            }
          />
          <FlatList
            data={filteredData}
            renderItem={renderModalItem}
            keyExtractor={(item) => item.id}
            style={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#00103D" />}
      <Text style={styles.topic}>Configure the validation</Text>

      <TouchableOpacity
        style={styles.inputs}
        onPress={() => openModal("origin")}
      >
        <Image source={OriginIcon} style={styles.elementIcon} />
        <Text style={styles.elementLabel}>
          {selectedOrigin ? selectedOrigin : "Select Origin"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputs}
        onPress={() => openModal("destination")}
        disabled={!selectedOrigin}
      >
        <Image source={DestinationIcon} style={styles.elementIcon} />
        <Text style={styles.elementLabel}>
          {selectedDestination ? selectedDestination : "Select Destination"}
        </Text>
      </TouchableOpacity>

      <View style={styles.period}>
        <TouchableOpacity
          style={[styles.inputs, styles.halfInput]}
          onPress={() => openModal("schedule")}
          disabled={!selectedDestination}
        >
          <Image source={ScheduleIcon} style={styles.elementIcon} />
          <Text style={styles.elementLabel}>
            {selectedSchedule
              ? selectedSchedule.length > 14
                ? `${selectedSchedule.substring(0, 14)}...`
                : selectedSchedule
              : "Pick Schedule"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inputs, styles.halfInput]}
          onPress={() => openModal("vehicle")}
          disabled={!selectedSchedule}
        >
          <Image source={VehicleIcon} style={styles.elementIcon} />
          <Text style={styles.elementLabel}>
            {selectedVehicle
              ? selectedVehicle.length > 14
                ? `${selectedVehicle.substring(0, 14)}...`
                : selectedVehicle
              : "Select Vehicle"}
          </Text>
        </TouchableOpacity>
      </View>

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    backgroundColor: "#070C35",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  inputs: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#999999",
    alignItems: "left",
    flexDirection: "row",
    marginVertical: "3%",
  },
  elementLabel: {
    marginLeft: 7,
    fontSize: 14,
    // fontWeight: 'bold',
  },
  elementIcon: {
    width: 14,
    height: 15,
  },
  modalList: {
    height: "40%",
    // flex: 1
  },
  period: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "49%",
  },
  topic: {
    fontSize: 21,
    fontWeight: "900",
    marginTop: 5,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: {
    fontSize: 18,
  },
  modalSearchInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default SearchForm;
