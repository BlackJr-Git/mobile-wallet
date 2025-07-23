import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput
} from "react-native";

const operators = [
  {
    id: 1,
    name: "Orange",
    slug: "orange",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753268199/vodacom-logo_pvowmx.png",
  },
  {
    id: 2,
    name: "Vodacom",
    slug: "vodacom",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753267545/Orange_logo.svg_zn2cg8.png",
  },
  {
    id: 3,
    name: "Airtel",
    slug: "airtel",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753267541/Airtel_logo_gfyke6.png",
  },
  {
    id: 4,
    name: "Africell",
    slug: "africell",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753267550/Africell_logo_tjnzbm.jpg",
  },
];

export default function AchatCredit() {
  const [selectedOperator, setSelectedOperator] = React.useState<string | null>(
    null
  );
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
        <ProfileSheet />
        <Logo variant="default" size="small" />
        <NotificationsModal />
      </View>
      <ScrollView>
        <View className="w-full px-6">
          <View>
            <Text className="text-foreground dark:text-white font-semibold mb-4 text-xl">
              Ajouter un numéro
            </Text>
            <Text className="text-slate-500 dark:text-white mb-2">
              Entrez le numéro de téléphone
            </Text>
          </View>
          <Input
            maxLength={10}
            keyboardType="numeric"
            placeholder="0851750853"
            // label="Numéro de téléphone"
          />
        </View>
        <View className="w-full pl-6 mt-4">
          <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">
            Selectionnez un operateur
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {operators.map((operator) => (
                <Pressable
                  key={operator.id}
                  onPress={() => setSelectedOperator(operator.slug)}
                  className="flex rounded-2xl items-center justify-center"
                >
                  <Image
                    source={{ uri: operator.image }}
                    className={`w-28 h-28 rounded-2xl bg-white flex items-center justify-center ${
                      selectedOperator === operator.slug
                        ? "border-4 border-green-500"
                        : ""
                    }`}
                  />
                  <Text
                    className={`text-foreground dark:text-white text-lg  ${
                      selectedOperator === operator.slug ? "font-bold" : ""
                    }`}
                  >
                    {operator.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className="w-full px-6 mt-4">
          <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">Saisissez le montant</Text>
          <TextInput maxLength={6} className="flex focus-within:border-indigo-500 focus-within:border-2 w-full h-20 rounded-2xl border text-2xl text-indigo-500 font-bold text-center border-gray-300 p-2 items-center justify-center" placeholder="Montant" keyboardType="numeric" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
