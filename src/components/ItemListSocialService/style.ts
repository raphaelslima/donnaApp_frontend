import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: theme.colors.primaryWhite,
        width: '100%',
        marginBottom: 20,
        padding: 16,
        borderRadius: 8,
        height: 80,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    TextItem:{
        fontFamily: theme.font.fontWeight.regular,
        fontSize: 14
    },
    iconItem:{
        color: theme.colors.primaryPurple,
        fontSize: 24
    }
})