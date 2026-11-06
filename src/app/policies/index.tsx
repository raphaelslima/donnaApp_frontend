import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./style";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";

const policyOptions = [
  { title: "Agendamento no CRAS", path: "/cras-appointment", icon: "calendar" },
  { title: "Cadastrar medida protetiva", path: "/protective-measure", icon: "shield-checkmark" },
];

const Policies = () => {
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
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Políticas para as mulheres</Text>
      </View>

      <View style={styles.grid}>
        {policyOptions.map((option) => (
          <Link key={option.title} href={option.path as any} asChild>
            <TouchableOpacity style={styles.card}>
              <Ionicons name={option.icon as any} size={28} color="#fff" />
              <Text style={styles.cardText}>{option.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default Policies;
