import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BusIcon from "../assets/bus.png";
import Line from "../assets/Line.jpg";
import CoinIcon from "../assets/coin.png";
import ClockIcon from "../assets/clock.png";

// const BusIcon = require('../assets/bus.svg');

const JourneyFleetDetails = ({
  journey,
  statusValue,
  seating,
  status,
  none,
}) => {
  const dateObj = new Date(journey.vehicle_route_destination.journey_date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(dateObj);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formattedTime = formatTime(
    journey.vehicle_route_destination.route_schedule.departure_time
  );

  return (
    <>
      <View style={status ? styles.infoRowTicket : styles.infoRow}>
        <View style={styles.locationBox1}>
          <Text style={styles.locationLabel}>Origin</Text>
          <Text style={styles.location}>
            {
              journey.vehicle_route_destination.route_schedule.route_destination
                .route.origin.en
            }
          </Text>
        </View>
        <View style={styles.indicatorBox}>
          <Image source={Line} style={styles.line} />
          <View style={styles.indicator}>
            <Image source={BusIcon} style={styles.indicatorIcon} />
          </View>
        </View>
        <View style={styles.locationBox2}>
          <Text style={styles.locationLabel}>Destination</Text>
          <Text style={styles.location}>
            {
              journey.vehicle_route_destination.route_schedule.route_destination
                .destination.en
            }
          </Text>
        </View>
      </View>
      <View style={status ? styles.detailsRowTicket : styles.detailsRow}>
        <View style={styles.detailBox}>
          <View style={styles.detailWrapper1}>
            <Image source={ClockIcon} style={styles.timeIcon}></Image>
            <View>
              <Text style={styles.time}>{formattedTime}</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailBox}>
          <View style={styles.detailWrapper1}>
            <View>
            <Text style={styles.positionLabel}>Position</Text>
            <Text style={styles.position}>{`${journey.reservation_positions
              .map((position) => position.seat_number)
              .join(", ")}`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailBox}>
          <View style={styles.detailWrapper3}>
            <View style={styles.pricing}>
              <View style={styles.fareHeader}>
                <Image source={CoinIcon} style={styles.fareIcon}></Image>
                <Text style={styles.detailLabel2}>Fleet Fare</Text>
              </View>
              <Text style={styles.fare}>
                {
                  journey.vehicle_route_destination.route_schedule
                    .route_destination.price
                }
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoRowTicket: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  locationBox1: {
    alignItems: "left",
  },
  locationBox2: {
    alignItems: "right",
  },
  locationLabel: {
    fontSize: 11,
    color: "#666",
    // marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  indicatorBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -15,
    // padding: 7,
  },
  indicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ABB5FE",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  line: {
    marginBottom: -20,
  },
  indicatorIcon: {
    width: 20,
    height: 20,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10.5,
  },
  detailsRowTicket: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailBox: {
    alignItems: "center",
    flex: 1,
  },
  detailWrapper1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CDD2F8",
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#070C35",
    borderStyle: "dashed",
  },
  detailWrapper2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCF6E7",
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#B88400",
    borderStyle: "dashed",
  },
  detailWrapper3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D5FAED",
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#5CE4B5",
    borderStyle: "dashed",
  },
  timeIcon: {
    fontSize: 18,
    color: "#333",
    marginRight: 2,
    marginTop: -18,
    width: 15,
    height: 15,
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  seatIcon: {
    fontSize: 24,
    color: "#333",
    marginRight: 8,
  },
  seating: {
    alignItems: "center",
  },
  pricing: {
    alignItems: "center",
  },
  detailLabel1: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#B88400",
  },
  detailLabel2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#626689",
  },
  seats: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B88400",
    marginTop: -4,
  },
  availableSeats: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9B978E",
    fontWeight: "bold",
  },
  fareHeader: {
    flexDirection: "row",
    alignItems: "bottom",
  },
  fareIcon: {
    marginRight: 3,
    marginTop: 2,
    width: 20,
    height: 13,
  },
  fare: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#18BA82",
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
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF0B45",
    backgroundColor: "#FCB9BD",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  positionBox: {
    // flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  positionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    alignSelf: 'center',
  },
  positionValue: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
  position: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: 'center',
    // color: "#070C35",
    paddingHorizontal: 10,
    // paddingVertical: 2,
    // borderRadius: 5,
  },
});

export default JourneyFleetDetails;
