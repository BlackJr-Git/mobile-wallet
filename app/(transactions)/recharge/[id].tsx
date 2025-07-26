import BackButton from "@/components/BackButton";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function RechargeConfirmation() {
  const router = useRouter();
  // Données factices, à remplacer par les vraies props/params
  const montant = "20 000 CDF";
  const methode = "Mobile Money";
  const operateur = "Airtel";
  const numero = "+243 812 987 654";
  const date = "25/07/2025 à 22:37";
  const reference = "#RCG-20250725-003";

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-background-0">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-2 z-10 bg-background">
        <BackButton />
        <Text className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">Confirmation</Text>
        <View className="w-12" />
      </View>
      {/* Bloc principal animé */}
      <Animatable.View
        animation="fadeInUp"
        delay={100}
        className="flex-1 items-center justify-center px-6"
      >
        <View className="w-full max-w-xl bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-lg px-6 py-8 items-center">
          <Animatable.View animation="bounceIn" delay={200} className="mb-4">
            <View className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center mb-2 shadow-md">
              <Icon name="CircleCheck" color="#22c55e" size={54} />
            </View>
          </Animatable.View>
          <Text className="text-2xl font-bold text-indigo-500 mb-2">Approvisionnement réussi !</Text>
          <Text className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">Votre recharge a été effectuée avec succès.</Text>
          <View className="w-full mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 dark:text-gray-400">Montant</Text>
              <Text className="font-semibold text-indigo-500">{montant}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 dark:text-gray-400">Méthode</Text>
              <Text className="font-semibold text-gray-700 dark:text-gray-200">{methode}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 dark:text-gray-400">Opérateur</Text>
              <Text className="font-semibold text-gray-700 dark:text-gray-200">{operateur}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 dark:text-gray-400">Numéro</Text>
              <Text className="font-semibold text-gray-700 dark:text-gray-200">{numero}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 dark:text-gray-400">Date</Text>
              <Text className="font-semibold text-gray-700 dark:text-gray-200">{date}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 dark:text-gray-400">Référence</Text>
              <Text className="font-semibold text-gray-700 dark:text-gray-200">{reference}</Text>
            </View>
          </View>
          <Button
            title="Terminer"
            className="mt-4"
            onPress={() => router.replace("/")}
          />
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
}
