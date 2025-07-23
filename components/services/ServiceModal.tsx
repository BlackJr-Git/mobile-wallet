import Icon from "@/components/ui/Icon";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { icons } from "lucide-react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

export interface ServiceModalRef {
  expand: () => void;
  close: () => void;
}

const ServiceModal = forwardRef<ServiceModalRef>((props, ref) => {
  const colorScheme = useColorScheme();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["60%", "90%"], []);

  useImperativeHandle(
    ref,
    () => ({
      expand: () => {
        sheetRef.current?.snapToIndex(1);
      },
      close: () => {
        sheetRef.current?.close();
      },
    }),
    []
  );

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // Handle sheet changes if needed
  }, []);

  return (
    <View style={styles.mondalContainer}>
      <BottomSheet
        ref={sheetRef}
        index={-1} // fermé par défaut
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <BottomSheetView className="p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold dark:text-white">Services</Text>
            <Pressable onPress={closeSheet}>
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
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

ServiceModal.displayName = "ServiceModal";

export default ServiceModal;

export type OpenServiceItemProps = {
  icon: keyof typeof icons;
  title: string;
  iconColor?: string;
  onPress: () => void;
};

export function OpenServiceItem({
  icon,
  title,
  iconColor,
  onPress,
}: OpenServiceItemProps) {
  return (
    <Pressable onPress={onPress} className="">
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
  mondalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
});
