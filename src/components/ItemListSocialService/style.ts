import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: theme.colors.primaryWhite,
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
    height: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    padding: 16,
  },
  TextItem: {
    fontFamily: theme.font.fontWeight.regular,
    fontSize: 12,
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
  },
  iconItem: {
    color: theme.colors.primaryPurple,
    fontSize: 24,
  },
});
