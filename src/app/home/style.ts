import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerHome: {
        backgroundColor: theme.colors.primaryWhite,
        width: '100%',
        height: '100%',
    },
    headerHome: {
        backgroundColor: theme.colors.primaryPurple,
        height: '50%',
        padding: 16
    },
    sessionBtn: {
        height: '50%',
        padding: 16
    },
    titleSessionBtn: {
        fontFamily: theme.font.fontWeight.bold,
        fontSize: 18,
        marginBottom: 20
    },
    sessionImg:{
        display: 'flex',
        flexDirection: 'column',
        gap: 24
    },
    ImgTopic:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    img:{
        marginRight: 15,
        width: 118
    },
    textImg:{
        fontFamily: theme.font.fontWeight.bold,
        textAlign: 'left',
        width: '100%'
    }
})