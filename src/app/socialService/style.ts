import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
  containerService: {
    width: "100%",
    padding: 16,
  },
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
    color: theme.colors.primaryBlack,
  },
  TextBack: {
    fontSize: 20,
    color: theme.colors.primaryBlack,
  },
});
