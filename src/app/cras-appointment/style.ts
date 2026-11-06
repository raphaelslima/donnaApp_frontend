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
    fontSize: 20,
    fontFamily: theme.font.fontWeight.bold,
    marginLeft: 16,
  },
  content: {
    padding: 20,
  },
  loadError: {
    color: theme.colors.primaryBlack,
    margin: 20,
    marginTop: 60,
    textAlign: "center",
  },
  backAction: {
    padding: 16,
    alignItems: "center",
  },
  backActionText: {
    color: theme.colors.primaryPurple,
  },
  field: {
    marginBottom: 16,
  },
  address: {
    color: theme.colors.primaryBlack,
    marginBottom: 16,
  },
  label: {
    color: theme.colors.primaryBlack,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
  },
  valueButton: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 12,
  },
  valueText: {
    color: theme.colors.primaryBlack,
  },
  input: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 12,
    color: theme.colors.primaryBlack,
  },
  telephone: {
    color: theme.colors.primaryBlack,
    marginBottom: 20,
  },
  note: {
    color: theme.colors.primaryBlack,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: theme.colors.primaryWhite,
    fontFamily: theme.font.fontWeight.bold,
  },
});
