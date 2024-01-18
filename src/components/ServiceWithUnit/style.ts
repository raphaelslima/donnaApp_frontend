import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerService:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        gap: 20,
        height: '100%',
    },
    title:{
        fontFamily: theme.font.fontWeight.bold,
        fontSize: 24,
        marginBottom: 10
    },
    description:{
        fontFamily: theme.font.fontWeight.regular,
        fontSize: 14,
        textAlign: 'justify'
    }
})