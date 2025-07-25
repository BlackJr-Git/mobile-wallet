import PressableIcon from "@/components/ui/PressableIcon";
import { useRouter } from "expo-router";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <>
      <PressableIcon
        onPress={() => router.back()}
        name="ArrowLeft"
        color="#4A67FF"
      />
    </>
  );
}
