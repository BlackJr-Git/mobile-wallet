import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const operators = [
  {
    id: 1,
    name: "Orange",
    image: require("../../assets/images/orange.png"),
  },
  {
    id: 2,
    name: "MTN",
    image: require("../../assets/images/mtn.png"),
  },
  {
    id: 3,
    name: "Airtel",
    image: require("../../assets/images/airtel.png"),
  },
];

export default function AchatCredit() {
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
            <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">
              Ajouter un numéro
            </Text>
            <Text className="text-slate-500 dark:text-white">
              Entrez le numéro de téléphone
            </Text>
          </View>
          <Input
            placeholder="Numéro de téléphone"
            // label="Numéro de téléphone"
          />
        </View>
        <View className="w-full px-6">
          <Text className="text-foreground dark:text-white">
            Selectionnez un operateur
          </Text>
          <FlatList
            data={operators}
            renderItem={({ item }) => (
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-foreground dark:text-white">
                  {item.name}
                </Text>
                <Image source={item.image} />
              </View>
            )}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
