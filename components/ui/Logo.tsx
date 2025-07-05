import { Image, StyleSheet, Text, View } from "react-native";
const logoImage = require("../../assets/images/logo_fpay.png");
const logoImageWhite = require("../../assets/images/white-logo-fpay.png");

type variant = "default" | "white";
type size = "small" | "medium" | "large";

interface Props {
  variant: variant;
  size: size;
  withText?: boolean;
}

const logoSizes = {
  small: { width: 40, height: 40, fontSize: 14 },
  medium: { width: 70, height: 70, fontSize: 20 },
  large: { width: 100, height: 100, fontSize: 28 },
};

export default function Logo({ variant, size, withText }: Props) {
  const { width, height, fontSize } = logoSizes[size];
  return (
    <View style={styles.logoContainer}>
      {variant === "default" && (
        <Image
          source={logoImage}
          style={[styles.logoImage, { width, height }]}
        />
      )}
      {variant === "white" && (
        <Image
          source={logoImageWhite}
          style={[styles.logoImage, { width, height }]}
        />
      )}
      {withText && (
        <Text
          className="text-foreground dark:text-white"
          style={[styles.logoText, { fontSize }]}
        >
          F-Pay
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    // width and height are now set dynamiquement
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
