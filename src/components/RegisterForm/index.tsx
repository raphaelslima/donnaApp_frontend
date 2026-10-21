import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useRouter } from "expo-router";
import api from "../../services/axios";
import { saveAuthToken } from "../../services/auth";
import { getBrazilianNationalPhoneDigits } from "../../helpers/phoneInput";
import { styles } from "./style";

interface RegisterFormValues {
  phone: string;
  password: string;
}

const schema = yup.object({
  phone: yup
    .string()
    .required("Informe seu telefone com DDD.")
    .test("Phone", "Informe um telefone válido com DDD.", (value) => {
      return /^\d{10,11}$/.test(value || "");
    }),
  password: yup
    .string()
    .required("Informe sua senha.")
    .min(5, "A senha deve ter no mínimo 5 caracteres."),
});

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { phone: "", password: "" },
  });
  const router = useRouter();
  const [fontLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  const handleRegister = async ({ phone, password }: RegisterFormValues) => {
    try {
      const response = await api.post("/users", {
        phone: `+55${phone}`,
        password,
      });
      await saveAuthToken(response.data.token);
      Alert.alert("Bem-vinda", "Sua conta foi criada.");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert(
        "Não foi possível cadastrar",
        error.response?.data?.error || "Verifique a conexão e tente novamente."
      );
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.containerFormRegister}>
      <View style={styles.containerFields}>
        <View style={styles.labelAndInputOnly}>
          <Text style={styles.label}>Telefone com DDD:</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <View style={[styles.inputHeight, { flexDirection: "row", alignItems: "center" }]}>
                <Text style={{ marginRight: 6 }}>+55</Text>
                <TextInput
                  style={{ flex: 1, padding: 0 }}
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={(text) => onChange(getBrazilianNationalPhoneDigits(text))}
                  maxLength={11}
                />
              </View>
            )}
          />
          {errors.phone && <Text style={styles.erroMsg}>{errors.phone.message}</Text>}
        </View>
        <View style={styles.labelAndInputOnly}>
          <Text style={styles.label}>Senha:</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.inputHeight}
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.erroMsg}>{errors.password.message}</Text>}
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnSubimit}
        onPress={handleSubmit(handleRegister)}
        disabled={isSubmitting}
      >
        <Text style={styles.btnSubimitText}>
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
