import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Logo from "@/components/ui/Logo";
import React from "react";
import { SafeAreaView, View } from "react-native";

export default function Change() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
        <ProfileSheet />
        <Logo variant="default" size="small" />
        <NotificationsModal />
      </View>
    </SafeAreaView>
  );
}
