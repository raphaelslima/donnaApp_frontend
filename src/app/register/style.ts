import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    areaTitle:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: '100%',
        marginTop: 30
    },
    title: {
        color: theme.colors.primaryWhite,
        fontFamily: theme.font.fontWeight.regular,
        fontSize: 24,
        textDecorationLine: 'underline',
    }
})