import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const RootLayout = () => <Stack screenOptions={{ headerShown: false }} />;

export default RootLayout;
