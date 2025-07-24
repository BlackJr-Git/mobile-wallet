import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Logo from "@/components/ui/Logo";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import Icon from "@/components/ui/Icon";

export default function Assurance() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
        <ProfileSheet />
        <Logo variant="default" size="small" />
        <NotificationsModal />
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-white dark:bg-background-0 rounded-2xl p-8 shadow-md items-center max-w-md w-full">
          <Icon name="Wrench" size={56} color="#6366f1" />
          <Text className="text-2xl font-bold text-indigo-500 mt-4 mb-2 text-center">
            Service en cours de développement
          </Text>
          <Text className="text-gray-500 dark:text-gray-300 text-center">
            Cette fonctionnalité sera bientôt disponible. Merci de votre
            patience !
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
