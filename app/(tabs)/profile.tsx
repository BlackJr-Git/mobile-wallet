import QRcode from "@/assets/images/qr.svg";
import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Icon from "@/components/ui/Icon";
import UserAvatar from "@/components/UserAvatar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <View className="w-full relative">
        <View className="w-full flex-row items-center justify-between absolute px-6 z-10 bg-background">
          <ProfileSheet />
          {/* <Logo variant="default" size="small" /> */}
          <Text className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
            Profile
          </Text>
          <NotificationsModal />
        </View>
        <ScrollView className="w-full px-6 mt-20 mb-32">
          <View className="w-full flex-row items-center bg-indigo-500 rounded-xl p-4">
            <View className="bg-white rounded-full p-1">
              <UserAvatar size="lg" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-foreground dark:text-white text-lg">
                Junior Asosa
              </Text>
              <Text className="text-foreground dark:text-white text-md">
                junior.asosa@gmail.com
              </Text>
            </View>
            <Icon name="Pencil" color="#fff" size={24} />
          </View>
          <View className="w-full flex-col items-center justify-center my-8 p-8 bg-background-0 rounded-xl">
            <QRcode className="w-48 h-48" />
            <Text className="text-foreground dark:text-white text-lg mt-4">
              Votre code QR
            </Text>
          </View>
          <View className="w-full flex-col items-center justify-center p-8 bg-background-0 rounded-xl">
            <View className="w-full flex-row items-center justify-between my-4">
              <Text className="text-foreground dark:text-white text-lg">
                Paramètres
              </Text>
              <Icon name="Settings2" color="#4A67FF" size={24} />
            </View>
            <View className="w-full flex-row items-center justify-between my-4">
              <Text className="text-foreground dark:text-white text-lg">
                Aide & Support
              </Text>
              <Icon name="HeartHandshake" color="#4A67FF" size={24} />
            </View>
            <View className="w-full flex-row items-center justify-between mt-4">
              <Text className="text-foreground dark:text-white text-lg">
                Se deconnecter
              </Text>
              <Icon name="LogOut" color="#4A67FF" size={24} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
