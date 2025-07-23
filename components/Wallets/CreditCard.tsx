import Logo from "@/components/ui/Logo";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, Text, View } from "react-native";
import SimImg from "../../assets/images/sim.svg";

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
    <LinearGradient
      colors={colors}
      end={{ x: 0, y: 0 }}
      start={{ x: 1, y: 1 }}
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 16,
        marginRight: 16,
        width: 320,
        height: 192,
        padding: 16,
      }}
    >
      <View className="flex-row items-center justify-between w-full">
        <Logo variant="default" size="small" />
        {/* <Image source={simImg} className="w-12 h-12" /> */}
        <SimImg className="w-24 h-24" />
      </View>
      <View className="flex-row items-center gap-2 w-full justify-between">
        <Text className="text-white text-lg font-bold">
          {accountNumber.slice(0, 4) +
            " " +
            accountNumber.slice(4, 8) +
            " " +
            accountNumber.slice(8, 12) +
            " " +
            accountNumber.slice(12, 16)}
        </Text>
        <Text className="text-white text-lg font-bold">
          {balance} {currency === "CDF" ? "Fc" : "$"}
        </Text>
      </View>
      <View className="w-full flex-row justify-between">
        <View className="flex-col gap-1">
          <Text className="text-white text-sm">Nom du titulaire</Text>
          <Text className="text-white text-base font-bold">{userName}</Text>
        </View>
        <View className="flex-col gap-1">
          <Text className="text-white text-sm">Portmonnaie</Text>
          <Text className="text-white text-base font-bold">
            {currency === "CDF" ? "Francs Congolais" : "Dollars"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
