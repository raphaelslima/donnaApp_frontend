import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryWhite,
  },
  header: {
    backgroundColor: theme.colors.primaryPurple,
    padding: 20,
    paddingTop: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  title: {
    color: theme.colors.primaryWhite,
    fontSize: 22,
    fontFamily: theme.font.fontWeight.bold,
    marginLeft: 16,
  },
  content: {
    padding: 20,
  },
  introduction: {
    color: theme.colors.primaryBlack,
    marginBottom: 16,
  },
  loadError: {
    color: theme.colors.primaryBlack,
    margin: 20,
    marginTop: 60,
    textAlign: "center",
  },
  label: {
    color: theme.colors.primaryBlack,
    marginBottom: 6,
    fontFamily: theme.font.fontWeight.bold,
  },
  input: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 12,
    color: theme.colors.primaryBlack,
  },
  field: {
    marginBottom: 12,
  },
  dateInput: {
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    color: theme.colors.primaryBlack,
  },
  removeDate: {
    color: theme.colors.primaryPurple,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: theme.colors.primaryWhite,
    fontFamily: theme.font.fontWeight.bold,
  },
  logoutButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  logoutButtonText: {
    color: theme.colors.primaryPurple,
  },
});
