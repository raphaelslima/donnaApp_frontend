import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"

const Form = () => {

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }

    return (
        <View style={styles.containerForm}>
            <View>
            <Text style={styles.label}>Digite seu telefone:</Text>
            <TextInput style={styles.input}/>
            </View>

            <View>
            <Text style={styles.label}>Digite sua senha:</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                />
            </View>

            <Text style={styles.forgetPassword}>Esqueceu sua senha?</Text>

            <View style={styles.areaSubmit}>
                <TouchableOpacity style={styles.btnSubmit}>
                <Text style={styles.btnSubmitText}>Acessar</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Form