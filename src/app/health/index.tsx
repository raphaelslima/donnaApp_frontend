import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./style";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";

const Health = () => {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/policies" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Saúde para mulheres</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Conteúdo sobre saúde para mulheres será exibido aqui.</Text>
      </View>
    </View>
  );
};

export default Health;
