import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryWhite,
  },
  loading: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.primaryPurple,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  title: {
    color: theme.colors.primaryWhite,
    fontSize: 21,
    fontFamily: theme.font.fontWeight.bold,
    marginLeft: 16,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  introduction: {
    color: theme.colors.primaryBlack,
    marginBottom: 20,
    lineHeight: 22,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    color: theme.colors.primaryBlack,
    fontFamily: theme.font.fontWeight.bold,
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 14,
  },
  dateText: {
    color: theme.colors.primaryBlack,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  reminderNote: {
    color: theme.colors.primaryBlack,
    lineHeight: 20,
    marginVertical: 16,
  },
  measureCard: {
    backgroundColor: "#f4f0fa",
    borderRadius: 12,
    padding: 18,
  },
  countdown: {
    color: theme.colors.primaryPurple,
    fontSize: 23,
    fontFamily: theme.font.fontWeight.bold,
    marginBottom: 16,
  },
  detail: {
    color: theme.colors.primaryBlack,
    marginBottom: 12,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: theme.colors.primaryWhite,
    fontFamily: theme.font.fontWeight.bold,
  },
  disabledButton: {
    opacity: 0.6,
  },
  secondaryButton: {
    padding: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: theme.colors.primaryPurple,
    fontFamily: theme.font.fontWeight.bold,
  },
  loadError: {
    color: theme.colors.primaryBlack,
    margin: 24,
    marginTop: 60,
    textAlign: "center",
  },
});
