import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const notificationDays = [14, 7, 3];
const notificationMarker = "donnaProtectiveMeasure";

export const scheduleProtectiveMeasureNotifications = async (
  userId: string,
  expiryDate: Date
) => {
  const reminders = notificationDays
    .map((daysBefore) => {
      const date = new Date(expiryDate);
      date.setDate(date.getDate() - daysBefore);
      date.setHours(9, 0, 0, 0);
      return { daysBefore, date };
    })
    .filter(({ date }) => date.getTime() > Date.now());

  const scheduledNotifications = Platform.OS === "web"
    ? []
    : await Notifications.getAllScheduledNotificationsAsync();
  const previousNotifications = scheduledNotifications.filter((notification) => {
    const data = notification.content.data;
    return data?.[notificationMarker] === true && data.userId === userId;
  });
  await Promise.all(
    previousNotifications.map((notification) =>
      Notifications.cancelScheduledNotificationAsync(notification.identifier)
    )
  );

  if (Platform.OS === "web" && reminders.length > 0) {
    throw new Error("Os lembretes estão disponíveis no aplicativo Android ou iOS.");
  }

  if (reminders.length > 0) {
    const currentPermissions = await Notifications.getPermissionsAsync();
    const permissions = currentPermissions.granted
      ? currentPermissions
      : await Notifications.requestPermissionsAsync();

    if (!permissions.granted) {
      throw new Error("Permita as notificações do Donna nas configurações do aparelho para receber os lembretes.");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("measure-reminders", {
        name: "Lembretes importantes",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }

  const newNotificationIds: string[] = [];

  try {
    for (const { daysBefore, date } of reminders) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete do Donna",
          body: "Você tem um prazo importante se aproximando. Abra o app para consultar.",
          data: { [notificationMarker]: true, userId },
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date,
          ...(Platform.OS === "android" ? { channelId: "measure-reminders" } : {}),
        },
      });
      newNotificationIds.push(id);
    }
  } catch (error) {
    await Promise.all(
      newNotificationIds.map((id) => Notifications.cancelScheduledNotificationAsync(id))
    );
    throw error;
  }

  return reminders.map(({ daysBefore }) => daysBefore);
};
