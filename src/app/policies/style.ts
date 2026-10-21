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
    fontSize: 24,
    color: theme.colors.primaryWhite,
    flex: 1,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    aspectRatio: 1.8,
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    padding: 12,
    gap: 8,
    elevation: 6,
    shadowColor: theme.colors.primaryBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  cardText: {
    color: theme.colors.primaryWhite,
    fontFamily: theme.font.fontWeight.bold,
    fontSize: 18,
    textAlign: "center",
  },
});
