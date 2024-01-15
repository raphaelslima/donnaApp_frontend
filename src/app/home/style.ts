import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerHome: {
        backgroundColor: theme.colors.primaryWhite,
        width: '100%',
        height: '100%',
    },
    headerHome: {
        backgroundColor: theme.colors.primaryWhite,
        height: '50%',
    },
    backgroundImg:{
        width: '100%',
        height: '100%',
        opacity: 1
    },
    headerContent:{
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.primaryPurple,
        opacity: .2,
        zIndex: 5
    },
    title:{
        color: theme.colors.primaryWhite,
        fontFamily: theme.font.fontWeight.bold,
        fontSize: 24,
        marginBottom: 16
    },
    subtitle:{
        color: theme.colors.primaryWhite,
        fontFamily: theme.font.fontWeight.bold,
        fontSize: 20,
        marginBottom: 30
    },
    headerTextAndActions:{
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        padding: 16
    },
    btnSeachService:{
        marginBottom: 24,
        width: 180,
        backgroundColor: theme.colors.primaryWhite,
        padding: 16,
        borderRadius: 8,
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconSearch:{
        fontSize: 24
    },
    iconWpp:{
        color: theme.colors.primaryWhite,
        fontSize: 24
    },
    btnWpp:{
        width: 180,
        backgroundColor: theme.colors.primaryGreen,
        padding: 16,
        borderRadius: 8,
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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