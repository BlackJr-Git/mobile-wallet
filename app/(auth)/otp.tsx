import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function otp() {
  return (
    <View style={styles.background}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.backButtonContainer}>
        <Pressable onPress={() => {}} style={styles.backButton}>
          <Icon name="ChevronLeft" size={32} color="#979797" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subTitle}>
            Enter the verification code we just sent to your number +243 94
            *******53.
          </Text>
        </View>
        <View style={styles.otpContainer}>
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
        </View>
        <View style={styles.rowCenter}>
          <Text>Didn’t receive code?</Text>
          <Text style={styles.resendText}>Resend code</Text>
        </View>
      </View>

      <View style={styles.colCenter}>
        <Button title="Verifier" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 52,
    justifyContent: "center",
    // alignItems: "center",
  },
  backButtonContainer: {
    alignItems: "flex-start",
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#181D28",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: "#979797",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  otpInput: {
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
  colCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    marginTop: "auto",
  },
  resendText: {
    color: "#4A67FF",
    fontSize: 14,
    fontWeight: "700",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
});
