import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerForm:{
        marginTop: 46,
        display: "flex",
        flexDirection: 'column',
        gap: 15
    },
    label:{
        fontFamily: theme.font.fontWeight.regular,
        color: theme.colors.primaryWhite
    },
    input:{
        width: '100%',
        backgroundColor: theme.colors.primaryWhite,
        borderRadius: 8,
        marginTop: 5,
        padding: 8
    },
    forgetPassword:{
        fontFamily: theme.font.fontWeight.regular,
        color: theme.colors.primaryWhite,
        fontSize: 12,
        textDecorationLine: 'underline'
    },
    areaSubmit:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSubmit:{
        width: '50%',
        backgroundColor: theme.colors.primaryWhite,
        padding: 10,
        textAlign: 'center',
        borderRadius: 8,
    },
    btnSubmitText:{
        fontFamily: theme.font.fontWeight.bold,
        color: theme.colors.primaryPurple,
        width: '100%',
        textAlign: "center",
    },
})