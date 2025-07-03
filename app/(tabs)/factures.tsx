import Greet from "@/components/Greet";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const logoImage = require("../../assets/images/react-logo.png");
const background = require("../../assets/images/bg-main.png");

export default function LoginScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar />
      <View style={styles.card}>
        <Greet name="Junior" />
        <Pressable onPress={toggleModal}>
          <Image source={logoImage} style={styles.logoImage} />
        </Pressable>
        <Button title="Go to Home" onPress={toggleModal} color="#FF8A00" />
        <Button
          title="Show Alert"
          onPress={() =>
            Alert.alert("Alert", "This is an alert", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ])
          }
          color="#008A07"
        />
        <ActivityIndicator size="large" color="#FF8A00" animating={false} />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
        presentationStyle="pageSheet"
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Modal</Text>
          <Image source={logoImage} style={styles.logoImage} />
          <Button title="Close Modal" onPress={toggleModal} color="#FF8A00" />
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 20,
    alignItems: "center",
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: "90%",
    maxWidth: 370,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#181D28",
    textAlign: "center",
    marginBottom: 8,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  subText: {
    color: "#8C8C8C",
    fontSize: 14,
  },
  link: {
    color: "#FF8A00",
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: "#181D28",
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ECECEC",
    marginBottom: 8,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    color: "#FF8A00",
    fontSize: 13,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#FF8A00",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
