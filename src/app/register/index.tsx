import { Text, View} from "react-native"
import Container from "../../components/Container";
import { styles } from "./style";
import RegisterForm from "../../components/RegisterForm";
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from "../../theme/theme";
import { Link } from "expo-router";

const Register = () => {
    return(
        <Container>
                <View style={styles.areaTitle}>
                    <Link href='/' asChild>
                        <Ionicons name="arrow-back" size={32} color={theme.colors.primaryWhite} />
                    </Link>
                    <Text style={styles.title}>Realize seu cadastro:</Text>
                </View>
                <RegisterForm/>
        </Container>
        
    )
}

export default Register;