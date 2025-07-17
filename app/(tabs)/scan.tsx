import ProfileSheet from "@/components/home/ProfileSheet";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PressableIcon from "@/components/ui/PressableIcon";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  // Button,
  // StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const validQrCode = [
  "1234567890",
  "12345237890",
  "123423467890",
  "12346767890",
  "12346767890",
];

export default function ScanScreen() {
  // const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const keyboardOpen = useKeyboardStatus();

  useEffect(() => {
    if (scanned) {
      setTimeout(() => {
        setScanned(false);
      }, 2000);
    }
  }, [scanned]);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.container}>
        <Text className="dark:text-white">
          Nous avons besoin de votre permission pour afficher la camera
        </Text>
        <Button onPress={requestPermission} title="autoriser" />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text className="dark:text-white">
          Nous avons besoin de votre permission pour afficher la camera
        </Text>
        <Button onPress={requestPermission} title="autoriser" />
      </View>
    );
  }

  // function toggleCameraFacing() {
  //   setFacing((current) => (current === "back" ? "front" : "back"));
  // }

  function handleBarcodeScanned({ data }: { data: string }) {
    if (validQrCode.includes(data)) {
      console.log("QR code valid", data);
    } else {
      console.log("QR code invalid", data);
    }
    setScanned(true);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      className="flex-1 relative"
    >
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* Header with absolute positioning */}
      <View style={styles.header} className="bg-background-0">
        <ProfileSheet />
        <Text
          style={styles.headerText}
          className="text-foreground dark:text-white"
        >
          Scanner pour payer
        </Text>
        <PressableIcon onPress={() => {}} name="Bell" color="#4A67FF" />
      </View>

      {/* Camera container */}
      <View style={styles.cameraContainer}>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarcodeScanned}
          style={styles.camera}
          facing={"back"}
        />

        {!keyboardOpen && (
          <View style={stylesQr.lens}>
            {/* 4 coins */}
            <View style={[stylesQr.corner, stylesQr.topLeft]} />
            <View style={[stylesQr.corner, stylesQr.topRight]} />
            <View style={[stylesQr.corner, stylesQr.bottomLeft]} />
            <View style={[stylesQr.corner, stylesQr.bottomRight]} />
          </View>
        )}

        {/* Overlay buttons with absolute positioning */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View> */}
        <View className="absolute bottom-24 bg-transparent mx-auto px-4 py-8 w-full">
          <View className="w-full bg-background-0 rounded-2xl p-4">
            <Text className="text-center text-xl dark:text-white">
              Utiliser un code de paiement
            </Text>
            <Input placeholder="Code de paiement" label="" />
            <Button title="Continuer" onPress={() => {}} />
          </View>
        </View>
      </View>

      {scanned && (
        <View style={styles.scanSuccessOverlay}>
          <Text style={styles.scanSuccessText}>QR Code détecté !</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  mainContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#000", // Dark background for camera visibility
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 16,
    // height: 60,
    // backgroundColor: "#fff", // Make header visible
    zIndex: 10,
    width: "100%",
    position: "absolute",
    // top: 48, // Add space for status bar
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#fff",
  },
  cameraContainer: {
    flex: 1,
    marginTop: 64, // Give space for header
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  lens: {
    position: "absolute",
    top: "16%",
    left: "10%",
    width: "80%",
    height: "40%",
    borderWidth: 4,
    borderColor: "#4A67FF",
    borderRadius: 16,
    zIndex: 20,
  },
  scanSuccessOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,200,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  },
  scanSuccessText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    backgroundColor: "rgba(0,200,0,0.7)",
    padding: 16,
    borderRadius: 12,
  },
});

const stylesQr = StyleSheet.create({
  lens: {
    position: "absolute",
    top: "16%",
    left: "10%",
    width: "80%",
    height: "40%",
    zIndex: 20,
  },
  corner: {
    position: "absolute",
    width: 60,
    height: 60,
    borderColor: "#4A67FF",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
});
