import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    containerFormRegister:{
        marginTop: 30,
    },
    containerFields:{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 40
    },
    rowFields:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    labelAndInput:{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '50%'
    },
    label:{
        color: theme.colors.primaryWhite,
        fontFamily: theme.font.fontWeight.regular,
        fontSize: 12,
    },
    inputShort: {
        backgroundColor: theme.colors.primaryWhite,
        width: '80%',
        borderRadius: 8,
        height: 30,
        paddingHorizontal: 8
    },
    inputHeight: {
        backgroundColor: theme.colors.primaryWhite,
        width: '100%',
        borderRadius: 8,
        height: 30,
        paddingHorizontal: 8
    },
    labelAndInputOnly: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '100%'
    },
    btnSubimit:{
        width:'100%',
        backgroundColor: theme.colors.primaryWhite,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    btnSubimitText:{
        color: theme.colors.primaryPurple,
        fontFamily: theme.font.fontWeight.bold,
        width:'100%',
        textAlign: 'center'
    },
    labelPassowrd: {
        color: theme.colors.primaryWhite,
        fontFamily: theme.font.fontWeight.regular,
        fontSize: 12,
        width: '80%', 
        display: 'flex', 
        justifyContent: 'flex-start'
    },
    erroMsg:{
        color: theme.colors.primaryRed
    }
})