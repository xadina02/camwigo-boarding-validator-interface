import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import BackArrow from "../assets/arrow-circle-left.png";
import { useNavigation } from "@react-navigation/native";

const QRCodeScannerScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const { scheduleId, vehicleId } = route.params;

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    navigation.navigate("ConfirmationScreen", { 
      routeScheduleId: scheduleId,
      vehicleId: vehicleId,
      qrData: data
     });
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
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
    marginTop: (0.2 * StatusBar.currentHeight),
    // backgroundColor: 'bisque'
  },
});

export default QRCodeScannerScreen;
