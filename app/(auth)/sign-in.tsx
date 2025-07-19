// import { useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import { router, useNavigation } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
const background = require("../../assets/images/bg-main.png");

export default function LoginScreen() {
  const navigation = useNavigation();
  // const [modalVisible, setModalVisible] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      {/* <Logo variant="white" size="medium" /> */}
      <View style={styles.card}>
        <View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Icon name="ChevronLeft" size={32} color="#979797" />
          </Pressable>
        </View>
        <Text style={styles.title}>Inscription</Text>
        <View style={styles.colCenter}>
          <Input
            placeholder="Numero de telephone"
            label="Numero de telephone"
          />
          <Input placeholder="Email" label="Email" />
          <Input placeholder="Mot de passe" label="Mot de passe" />
          <Input
            placeholder="Confirmer le mot de passe"
            label="Confirmer le mot de passe"
          />
          <Button title="Créer un compte" onPress={() => {}} />
        </View>
        <View style={styles.rowLeft}>
          <Text style={styles.subText}>Vous n&apos;avez pas de compte ?</Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text
              style={{ marginLeft: 6, color: "#4A67FF", fontWeight: "bold" }}
            >
              Se connecter
            </Text>
          </Pressable>
        </View>
      </View>
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
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderColor: "#979797",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    marginBottom: 8,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  rowLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 16,
  },
  colCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  subText: {
    color: "#8C8C8C",
    fontSize: 14,
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
