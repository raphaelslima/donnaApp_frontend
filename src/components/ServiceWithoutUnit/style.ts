import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerService:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'flex-start',
        gap: 20
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
    },
    subtitle:{
        fontFamily: theme.font.fontWeight.bold,
        fontSize: 16,
        marginBottom: 5
    },
    textInfo:{
        fontFamily: theme.font.fontWeight.regular,
        fontSize: 14,
    },
    btnSession:{
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        gap: 20
    },
    btnWpp:{
        width: '80%',
        backgroundColor: theme.colors.primaryGreen,
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    iconWpp: {
        fontSize: 24,
        color: theme.colors.primaryWhite
    },
    btnCellphone:{
        width: '80%',
        backgroundColor: theme.colors.primaryPurple,
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    iconCellphone: {
        fontSize: 24,
        color: theme.colors.primaryWhite
    },
})