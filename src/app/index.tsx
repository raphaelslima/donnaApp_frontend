import { Text, TouchableOpacity, View } from "react-native"
import Container from "../components/Container";
import { styles } from "./style";
import Form from "../components/LoginForm";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";

const Home = () => {

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }

    return(
        <Container>
            <Text style={styles.title}>Para acessar:</Text>
            <Form/>
            <View style={styles.space}></View>
            <View style={styles.areaRegister}>
                <Text style={styles.subTitle}>Ainda não tem cadastro?</Text>
                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.RegisterText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Home