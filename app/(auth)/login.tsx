import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient colors={["#5B6BFE", "#5B6BFE", "#6A5BFE", "#49A7F6"]} style={styles.background}>
      <View style={styles.logoContainer}>
        {/* Logo ou nom de l'app */}
        <Text style={styles.logoText}>F-Pay</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.rowCenter}>
          <Text style={styles.subText}>Vous n&apos;avez pas de compte ? </Text>
          <TouchableOpacity>
            <Text style={styles.link}>S&apos;inscrire</Text>
          </TouchableOpacity>
        </View>
        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Loisbecket@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {/* Password */}
        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="#C1C1C1"
            />
          </Pressable>
        </View>
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
