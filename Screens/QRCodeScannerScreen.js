import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import useValidateTicket from "../utils/useValidateTicket";
import useUserStore from "../zustand/useUserStore";
import BackArrow from "../assets/arrow-circle-left.png";
import { useNavigation } from "@react-navigation/native";

const QRCodeScannerScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const [loading1, setLoading] = useState(false);
  const { scheduleId, vehicleId } = route.params;
  const { accessToken } = useUserStore();
  const appToken = "sekurity$227";

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const { ticket, loading, validateTicket } = useValidateTicket();

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setData(data);
    setLoading(true);
    await validateTicket(
      accessToken,
      {
        route_schedule_id: scheduleId,
        vehicle_id: vehicleId,
        ticket_data: data,
        date: getCurrentDate(),
      },
      appToken,
      (validatedTicket) => {
        setLoading(false);
        navigation.navigate("ConfirmationScreen", {
          ticket: validatedTicket,
        });
      }
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {/* <StatusBar backgroundColor="#070C35" /> */}
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
          <Text style={styles.header}>Scanning</Text>
        </View>
      </View>

      <View style={styles.container}>
        {/* <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        /> */}
        <CameraView
          // style={styles.camera}
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        ></CameraView>
        <View style={styles.focusPoint}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
        {loading1 && <ActivityIndicator size="large" color="#f5f5f5" />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  camera: {
    flex: 1,
  },
  backgroundDiv: {
    height: "6%",
  },
  another: {
    height: "100%",
    backgroundColor: "#070C35",
    // padding: 15,
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
    // backgroundColor: 'bisque'
  },
  focusPoint: {
    height: "40%",
    marginTop: "-45%",
    borderRadius: 20,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#CDD2F8",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 6,
    borderLeftWidth: 6,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 6,
    borderRightWidth: 6,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 6,
    borderRightWidth: 6,
  },
  // unFocusPoint: {
  //   flex: 1,
  //   marginTop: (3 * StatusBar.currentHeight),
  //   backgroundColor: 'rgba(0, 0, 0, 0.6)'
  // }
});

export default QRCodeScannerScreen;
