import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
  btnBack: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 45,
    marginTop: 16,
  },
  iconBack: {
    fontSize: 24,
    color: theme.colors.primaryWhite,
  },
  TextBack: {
    fontSize: 20,
    color: theme.colors.primaryWhite,
  },
  containerListItemns: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    fontFamily: theme.font.fontWeight.bold,
    fontSize: 24,
    color: theme.colors.primaryWhite,
    marginBottom: 16,
  },
});
