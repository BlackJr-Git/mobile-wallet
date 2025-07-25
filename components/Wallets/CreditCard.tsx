import Logo from "@/components/ui/Logo";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, Text, View } from "react-native";
import SimImg from "../../assets/images/sim.svg";

import * as Animatable from "react-native-animatable";

type CreditCardItemProps = {
  id: number;
  accountNumber: string;
  balance: string;
  currency: string;
  userName: string;
  image: string;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

export default function CreditCardItem({
  id,
  accountNumber,
  balance,
  currency,
  userName,
  image,
  colors,
}: CreditCardItemProps) {
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={100}
      className="shadow-xl"
      style={{ marginRight: 16 }}
    >
      <LinearGradient
        colors={colors}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          width: 320,
          height: 192,
          overflow: "hidden",
        }}
      >
        {/* Glassmorphism overlay */}
        <View
          className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl"
          pointerEvents="none"
        />
        <View className="flex-row items-center justify-between w-full px-4 pt-4">
          <SimImg className="w-10 h-10 opacity-80" />
          <Logo variant="default" size="small" />
        </View>
        <View className="flex-1 flex-col justify-center px-4">
          {/* Card Number */}
          <Text
            className="text-white text-lg md:text-xl font-mono tracking-widest font-bold drop-shadow-lg mb-2"
            style={{
              textShadowColor: "#0008",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 6,
            }}
          >
            {accountNumber.replace(/(.{4})/g, "$1 ").trim()}
          </Text>
          {/* Balance + Currency badge */}
          <View className="flex-row items-center gap-2 mb-2">
            <Text
              className="text-white text-2xl font-bold drop-shadow-lg"
              style={{
                textShadowColor: "#0008",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 6,
              }}
            >
              {balance}
            </Text>
            <View className="bg-white/40 dark:bg-black/40 px-2 py-0.5 rounded-full ml-1">
              <Text className="text-xs font-bold text-white drop-shadow">
                {currency === "CDF" ? "Fc" : "$"}
              </Text>
            </View>
          </View>
        </View>
        {/* Bottom info */}
        <View className="flex-row items-end justify-between w-full px-4 pb-4">
          <View className="flex-col gap-0.5">
            <Text className="text-white text-xs opacity-80">
              Nom du titulaire
            </Text>
            <Text className="text-white text-base font-bold">{userName}</Text>
          </View>
          <View className="flex-col gap-0.5 items-end">
            <Text className="text-white text-xs opacity-80">Portemonnaie</Text>
            <Text className="text-white text-base font-bold">
              {currency === "CDF" ? "Francs Congolais" : "Dollars"}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Animatable.View>
  );
}
