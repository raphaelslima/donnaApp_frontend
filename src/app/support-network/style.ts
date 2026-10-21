import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primaryPurple,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 36,
    paddingVertical: 18,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    fontFamily: theme.font.fontWeight.bold,
    fontSize: 22,
    color: theme.colors.primaryWhite,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: theme.font.fontWeight.regular,
    fontSize: 16,
    color: theme.colors.primaryBlack,
    textAlign: "center",
  },
});
