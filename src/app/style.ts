import { StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
    title:{
        marginTop: 27,
        fontSize: 24,
        color: theme.colors.primaryWhite
    },
    space:{
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.primaryWhite,
        marginTop: 40
    },
    areaRegister:{
        display: "flex",
        flexDirection: 'column',
        gap: 30,
        marginTop: 30
    },
    subTitle: {
        fontFamily: theme.font.fontWeight.regular,
        color: theme.colors.primaryWhite,
        textDecorationLine: 'underline'
    },
    RegisterText:{
        fontFamily: theme.font.fontWeight.bold,
        color: theme.colors.primaryPurple,
        width: '100%',
        textAlign: 'center'
    },
    btnRegister:{
        width: '100%',
        backgroundColor: theme.colors.primaryWhite,
        padding: 10,
        textAlign: 'center',
        borderRadius: 8,
    }
})