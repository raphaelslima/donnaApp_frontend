import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";
import ForgetPassword from ".";

export const styles = StyleSheet.create({
  areaTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    color: theme.colors.primaryWhite,
  },
  ForgetPasswordArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});
