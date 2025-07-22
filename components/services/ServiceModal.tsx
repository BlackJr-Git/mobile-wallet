import Icon from "@/components/ui/Icon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { icons } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import ServiceItem from "./ServiceItem";

type ServiceItemProps = {
  icon: keyof typeof icons;
  title: string;
  iconColor?: string;
  routeName: string;
};

const services: ServiceItemProps[] = [
  {
    icon: "Newspaper",
    title: "Factures",
    routeName: "factures",
    iconColor: "#ff6900",
  },
  {
    icon: "CardSim",
    title: "Achat Credit",
    routeName: "achat-credit",
    iconColor: "#2b7fff",
  },
  {
    icon: "HandCoins",
    title: "Change",
    routeName: "change",
    iconColor: "#00c950",
  },
  //   {
  //     icon: "CreditCard",
  //     title: "Carte virtuelle",
  //     routeName: "carte-virtuelle",
  //     iconColor: "#4A67FF",
  //   },
  {
    icon: "Ambulance",
    title: "Santé",
    routeName: "sante",
    iconColor: "#4A67FF",
  },
  {
    icon: "BatteryCharging",
    title: "Electricité",
    routeName: "electricite",
    iconColor: "#4A67FF",
  },
  {
    icon: "Wifi",
    title: "Internet",
    routeName: "internet",
    iconColor: "#4A67FF",
  },
  {
    icon: "HeartPlus",
    title: "Assurance",
    routeName: "assurance",
    iconColor: "#4A67FF",
  },
];

function ServiceModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <OpenServiceItem
        icon="Grid2x2Plus"
        iconColor="#4A67FF"
        title="Plus"
        onPress={toggleModal}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        // animationOut="slideOutDown"
        swipeDirection="down"
        backdropOpacity={0.8}
        style={styles.modalBottom}
        // onSwipeComplete={toggleModal}
        animationOutTiming={1000}
        useNativeDriver={true}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff" },
          ]}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold dark:text-white">Services</Text>
            <Pressable onPress={toggleModal}>
              <Icon
                name="X"
                size={28}
                color={colorScheme === "dark" ? "#fff" : "#4A67FF"}
              />
            </Pressable>
          </View>
          <View className="flex-row flex-wrap mt-8">
            {services.map((service) => (
              <View
                key={service.title}
                className="w-1/4 flex items-center justify-center my-4"
              >
                <ServiceItem
                  icon={service.icon}
                  title={service.title}
                  iconColor={service.iconColor}
                  routeName={service.routeName}
                />
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ServiceModal;

type OpenServiceItemProps = {
  icon: keyof typeof icons;
  title: string;
  iconColor?: string;
  onPress: () => void;
};

function OpenServiceItem({
  icon,
  title,
  iconColor,
  onPress,
}: OpenServiceItemProps) {
  return (
    <Pressable onPress={onPress} className="w-full">
      <View className="flex-1 items-center justify-between">
        <View className="items-center bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl">
          <Icon name={icon} size={28} color={iconColor} />
        </View>
        <Text className="text-slate-500 mt-2 dark:text-white">{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalBottom: {
    justifyContent: "flex-end", // 👈 colle le modal en bas
    margin: 0, // ⚠️ important pour qu’il prenne toute la largeur
    // paddingBottom: 64,
    // backgroundColor: "red",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 200,
    paddingBottom: 64,
  },
});
