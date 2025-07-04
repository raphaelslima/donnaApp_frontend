import { Text, TouchableOpacity, View } from "react-native";
import Container from "../../components/Container";
import { styles } from "./style";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../../theme/theme";

const ForgetPassword = () => {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <Container>
      <View style={styles.areaTitle}>
        <Link href="/" asChild>
          <Ionicons
            name="arrow-back"
            size={32}
            color={theme.colors.primaryWhite}
          />
        </Link>
        <Text style={styles.title}>Cadastrar nova senha:</Text>
      </View>
      <View style={styles.ForgetPasswordArea}>
        <ForgotPasswordForm />
      </View>
    </Container>
  );
};

export default ForgetPassword;
