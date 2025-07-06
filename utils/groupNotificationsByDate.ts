// import { Notification } from "../components/notifications/NotificationsModal";

type NotificationType =
  | "transaction"
  | "security"
  | "reminder"
  | "system"
  | "marketing";

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

export type NotificationSection = {
  title: string;
  data: Notification[];
};

function isToday(date: Date, now: Date) {
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function isYesterday(date: Date, now: Date) {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

function isLast7Days(date: Date, now: Date) {
  const diff = now.getTime() - date.getTime();
  return diff > 2 * 24 * 60 * 60 * 1000 && diff <= 7 * 24 * 60 * 60 * 1000;
}

export function groupNotificationsByDate(
  notifications: Notification[],
  now: Date = new Date()
): NotificationSection[] {
  const today: Notification[] = [];
  const yesterday: Notification[] = [];
  const last7Days: Notification[] = [];
  const older: Notification[] = [];

  notifications.forEach((notif) => {
    const date = new Date(notif.createdAt);
    if (isToday(date, now)) {
      today.push(notif);
    } else if (isYesterday(date, now)) {
      yesterday.push(notif);
    } else if (isLast7Days(date, now)) {
      last7Days.push(notif);
    } else {
      older.push(notif);
    }
  });

  const sections: NotificationSection[] = [];
  if (today.length) sections.push({ title: "Aujourd'hui", data: today });
  if (yesterday.length) sections.push({ title: "Hier", data: yesterday });
  if (last7Days.length)
    sections.push({ title: "7 derniers jours", data: last7Days });
  if (older.length) sections.push({ title: "Plus anciens", data: older });
  return sections;
}
