import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

// import TabBarBackground from '@/components/ui/TabBarBackground';
import Icon from "@/components/ui/Icon";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: "#615fff", // Couleur de l’icône active
        tabBarInactiveTintColor: "#B0B0B0", // Couleur de l’icône inactive
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            flex: 1,
            bottom: 16,
            marginHorizontal: 12,
            borderRadius: 32,
            // // paddingVertical: 16,
            // backgroundColor: "#fff000",
            alignItems: "center",
            justifyContent: "center",
          },
          // default: {},
          android: {
            position: "absolute",
            flex: 1,
            bottom: 16,
            marginHorizontal: 12,
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
          },
        }),
        tabBarItemStyle: Platform.select({
          ios: {
            flex: 1,
            marginVertical: 16,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          },
          android: {
            flex: 1,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="House" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="factures"
        options={{
          title: "Factures",
          tabBarIcon: ({ color }) => (
            <Icon name="ScrollText" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <View className="w-16 h-16 items-center justify-center p-4 bg-indigo-500 rounded-full mb-12">
              <Icon name="Scan" size={32} color={"white"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallets",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="wallet.fill" color={color} />
            <Icon name="Wallet" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="User" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
