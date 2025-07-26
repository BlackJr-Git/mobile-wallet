import Icon from "@/components/ui/Icon";
import { formatDateTimeFR } from "@/utils/formatDate";
import { groupNotificationsByDate } from "@/utils/groupNotificationsByDate";
import { icons } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import PressableIcon from "../ui/PressableIcon";
import { Divider } from "../ui/divider";

type NotificationType =
  | "transaction"
  | "security"
  | "reminder"
  | "system"
  | "marketing";

const notifcationTypeIcon = {
  transaction: "Wallet" as keyof typeof icons,
  security: "Lock" as keyof typeof icons,
  reminder: "Bell" as keyof typeof icons,
  system: "Info" as keyof typeof icons,
  marketing: "Gift" as keyof typeof icons,
};

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: string;
  status: string;
  priority: string;
  userId: string;
  metadata: any;
  createdAt: string;
  expiresAt: string;
  action: any;
  platform: any;
  readAt: string | null;
};

const notifications: Notification[] = [
  {
    id: "notif_001",
    title: "Transfert reçu",
    message: "Vous avez reçu 15.000 FC de Alain Mbala",
    type: "transaction",
    category: "incoming_transfer",
    status: "unread",
    priority: "high",
    userId: "user_001",
    metadata: {
      amount: 15000,
      currency: "CDF",
      senderName: "Alain Mbala",
      transactionId: "txn_abc123",
      channel: "mobile_money",
      balanceAfter: 45000,
    },
    createdAt: "2025-07-05T15:27:00Z",
    expiresAt: "2025-07-12T00:00:00Z",
    action: {
      label: "Voir le détail",
      url: "/transactions/txn_abc123",
    },
    platform: {
      os: "iOS",
      deviceId: "device_XYZ",
      appVersion: "1.5.3",
    },
    readAt: null,
  },
  {
    id: "notif_002",
    title: "Échec de paiement",
    message: "Le paiement de 10.000 FC vers Airtel Money a échoué",
    type: "transaction",
    category: "payment_failed",
    status: "unread",
    priority: "normal",
    userId: "user_001",
    metadata: {
      amount: 10000,
      currency: "CDF",
      receiver: "Airtel Money",
      transactionId: "txn_def456",
      reason: "Solde insuffisant",
    },
    createdAt: "2025-07-04T11:12:00Z",
    expiresAt: "2025-07-11T00:00:00Z",
    action: {
      label: "Réessayer",
      url: "/transactions/txn_def456/retry",
    },
    platform: {
      os: "Android",
      deviceId: "device_123",
      appVersion: "1.5.2",
    },
    readAt: null,
  },
  {
    id: "notif_003",
    title: "Code OTP",
    message: "Votre code de sécurité est 938274",
    type: "security",
    category: "otp",
    status: "read",
    priority: "high",
    userId: "user_001",
    metadata: {
      otp: "938274",
      expiresIn: "5 minutes",
    },
    createdAt: "2025-07-03T10:58:00Z",
    expiresAt: "2025-07-03T11:03:00Z",
    action: null,
    platform: {
      os: "iOS",
      deviceId: "device_XYZ",
      appVersion: "1.5.3",
    },
    readAt: "2025-07-03T11:00:00Z",
  },
  {
    id: "notif_004",
    title: "Rappel de paiement",
    message: "N'oubliez pas de payer votre abonnement CANAL+ avant demain",
    type: "reminder",
    category: "bill_reminder",
    status: "unread",
    priority: "normal",
    userId: "user_001",
    metadata: {
      billName: "CANAL+",
      dueDate: "2025-07-06",
    },
    createdAt: "2025-07-02T08:00:00Z",
    expiresAt: "2025-07-06T23:59:00Z",
    action: {
      label: "Payer maintenant",
      url: "/bills/canal",
    },
    platform: {
      os: "Android",
      deviceId: "device_123",
      appVersion: "1.5.2",
    },
    readAt: null,
  },
  {
    id: "notif_005",
    title: "Nouveau cashback",
    message: "Vous avez gagné 500 FC de cashback sur votre dernier achat",
    type: "marketing",
    category: "cashback_reward",
    status: "unread",
    priority: "low",
    userId: "user_001",
    metadata: {
      amount: 500,
      currency: "CDF",
      source: "achat chez Magasin TopShop",
    },
    createdAt: "2025-07-01T18:20:00Z",
    expiresAt: "2025-07-10T00:00:00Z",
    action: {
      label: "Découvrir l’offre",
      url: "/rewards",
    },
    platform: {
      os: "iOS",
      deviceId: "device_XYZ",
      appVersion: "1.5.3",
    },
    readAt: null,
  },
  {
    id: "notif_006",
    title: "Transfert programmé demain",
    message:
      "Un transfert de 25.000 FC vers Grâce Kabeya est prévu pour demain à 08:00",
    type: "transaction",
    category: "scheduled_transfer",
    status: "unread",
    priority: "normal",
    userId: "user_001",
    metadata: {
      amount: 25000,
      currency: "CDF",
      receiverName: "Grâce Kabeya",
      scheduledFor: "2025-07-06T08:00:00Z",
    },
    createdAt: "2025-07-05T14:00:00Z",
    expiresAt: "2025-07-07T00:00:00Z",
    action: {
      label: "Modifier le transfert",
      url: "/transfers/scheduled",
    },
    platform: {
      os: "Android",
      deviceId: "device_654",
      appVersion: "1.5.4",
    },
    readAt: null,
  },
  {
    id: "notif_007",
    title: "Connexion inhabituelle",
    message: "Nouvelle connexion détectée depuis Kinshasa (Android • Chrome)",
    type: "security",
    category: "login_alert",
    status: "unread",
    priority: "high",
    userId: "user_001",
    metadata: {
      location: "Kinshasa",
      device: "Android",
      browser: "Chrome",
      ip: "197.215.100.22",
    },
    createdAt: "2025-07-05T06:44:00Z",
    expiresAt: "2025-07-12T06:44:00Z",
    action: {
      label: "C'était pas moi",
      url: "/security/review",
    },
    platform: {
      os: "Android",
      deviceId: "device_111",
      appVersion: "1.5.3",
    },
    readAt: null,
  },
  {
    id: "notif_008",
    title: "Maintenance planifiée",
    message:
      "F-Pay sera indisponible le 8 juillet entre 01:00 et 02:00 pour maintenance.",
    type: "system",
    category: "maintenance_notice",
    status: "unread",
    priority: "normal",
    userId: "user_001",
    metadata: {
      start: "2025-07-08T01:00:00Z",
      end: "2025-07-08T02:00:00Z",
    },
    createdAt: "2025-07-04T10:15:00Z",
    expiresAt: "2025-07-09T00:00:00Z",
    action: null,
    platform: {
      os: "iOS",
      deviceId: "device_XYZ",
      appVersion: "1.5.3",
    },
    readAt: null,
  },
  {
    id: "notif_009",
    title: "Promo : transferts gratuits",
    message:
      "Transférez de l'argent sans frais vers Airtel jusqu’au 10 juillet 🎉",
    type: "marketing",
    category: "promotion",
    status: "unread",
    priority: "low",
    userId: "user_001",
    metadata: {
      offer: "free_transfers_airtel",
      expiresOn: "2025-07-10",
    },
    createdAt: "2025-07-03T13:30:00Z",
    expiresAt: "2025-07-10T00:00:00Z",
    action: {
      label: "Profiter maintenant",
      url: "/promo/airtel",
    },
    platform: {
      os: "iOS",
      deviceId: "device_XYZ",
      appVersion: "1.5.3",
    },
    readAt: null,
  },
  {
    id: "notif_010",
    title: "Reçu d’abonnement disponible",
    message:
      "Votre reçu pour le paiement StarTimes du 1er juillet est disponible.",
    type: "transaction",
    category: "receipt_available",
    status: "read",
    priority: "normal",
    userId: "user_001",
    metadata: {
      bill: "StarTimes",
      amount: 12000,
      currency: "CDF",
      date: "2025-07-01",
    },
    createdAt: "2025-07-01T19:45:00Z",
    expiresAt: "2025-07-31T00:00:00Z",
    action: {
      label: "Télécharger",
      url: "/receipts/startimes",
    },
    platform: {
      os: "Android",
      deviceId: "device_777",
      appVersion: "1.4.9",
    },
    readAt: "2025-07-02T08:01:00Z",
  },
  {
    id: "notif_011",
    title: "Félicitations 🎉",
    message:
      "Vous êtes passé au niveau Gold ! Bénéficiez de +5% de cashback sur vos paiements",
    type: "marketing",
    category: "loyalty_upgrade",
    status: "unread",
    priority: "high",
    userId: "user_001",
    metadata: {
      newTier: "Gold",
      reward: "5% cashback",
      validUntil: "2025-08-01",
    },
    createdAt: "2025-07-06T17:50:00Z",
    expiresAt: "2025-08-01T00:00:00Z",
    action: {
      label: "Découvrir les avantages",
      url: "/loyalty/gold",
    },
    platform: {
      os: "iOS",
      deviceId: "device_XYZ",
      appVersion: "1.5.3",
    },
    readAt: null,
  },
];

export default function NotificationsModal() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View className="">
      <PressableIcon
        onPress={() => setModalOpen(true)}
        name="Bell"
        color="#4A67FF"
      />
      <Modal
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <View className="w-full h-full bg-white dark:bg-gray-900 p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold dark:text-white">
              Notifications (5)
            </Text>
            <PressableIcon
              onPress={() => setModalOpen(false)}
              name="X"
              color="#4A67FF"
            />
          </View>
          <Divider className="my-4" />
          <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
            {groupNotificationsByDate(notifications, new Date()).map(
              (section) => (
                <View key={section.title} className="mb-2">
                  <Text className="text-lg font-bold mb-2 text-slate-600 dark:text-slate-300">
                    {section.title} junior 
                  </Text>
                  {section.data.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </View>
              )
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const notificationTypeColor: Record<NotificationType, string> = {
  transaction: "bg-blue-700",
  security: "bg-red-700",
  reminder: "bg-yellow-700",
  system: "bg-gray-700",
  marketing: "bg-green-700",
};

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <View className="w-full flex-row my-2 overflow-hidden">
      <View
        className={`items-center justify-center p-4 rounded-3xl ${
          notificationTypeColor[notification.type]
        }`}
      >
        <Icon
          name={notifcationTypeIcon[notification.type]}
          size={28}
          color="#fff"
        />
      </View>
      <View className="flex-col ml-4 overflow-hidden">
        <Text className="text-xl font-bold dark:text-white">
          {notification.title}
        </Text>
        <Text className="text-slate-500 dark:text-white line-clamp-1 truncate">
          {notification.message}
        </Text>
        <Text className="text-slate-300 dark:text-slate-600">
          {formatDateTimeFR(notification.createdAt)}
        </Text>
      </View>
    </View>
  );
}
