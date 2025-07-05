import { Button } from "@/components/ui/button/";
import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import Icon from "@/components/ui/Icon";
import PressableIcon from "@/components/ui/PressableIcon";
import { Text } from "@/components/ui/text";
import UserAvatar from "@/components/UserAvatar";
import React from "react";
import { View } from "react-native";

const profileData = {
  name: "Junior Asosa",
  email: "junior.asosa@gmail.com",
};

const menuItems = [
  {
    title: "Factures",
    icon: "Newspaper",
    onPress: () => {},
  },
  {
    title: "Notifications",
    icon: "Bell",
    onPress: () => {},
  },
  {
    title: "Profil",
    icon: "User",
    onPress: () => {},
  },
  {
    title: "Paramètres",
    icon: "Settings",
    onPress: () => {},
  },
];

export default function ProfileSheet() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  return (
    <>
      <PressableIcon
        onPress={() => {
          setShowDrawer(true);
        }}
        name="LayoutGrid"
        color="#4A67FF"
      />
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="lg"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader className="mt-24">
            <UserAvatar />
          </DrawerHeader>

          <DrawerBody>
            <Text size="2xl" className="text-typography-800 font-bold">
              {profileData.name}
            </Text>
            <Text size="xl" className="text-typography-500 mb-4">
              {profileData.email}
            </Text>
            <Divider />
            {menuItems.map((item) => (
              <MenuItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                onPress={item.onPress}
              />
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button
              onPress={() => {
                setShowDrawer(false);
              }}
              className="flex-1 h-16 bg-transparent border border-indigo-500 rounded-2xl"
            >
              <MenuItem
                title="Se deconnecter"
                icon="LogOut"
                onPress={() => {}}
              />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function MenuItem({ title, icon, onPress }: any) {
  return (
    <View className="flex-row items-center gap-4 pl-0 p-4">
      <Icon name={icon} size={28} color="gray" />
      <Text size="xl" className="text-typography-800">
        {title}
      </Text>
    </View>
  );
}
