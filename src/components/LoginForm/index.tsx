import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useRouter } from "expo-router";
import api from "../../services/axios";
import { saveAuthToken } from "../../services/auth";
import { getBrazilianNationalPhoneDigits } from "../../helpers/phoneInput";

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
    .min(5, "A senha deve ter no minimo 5 caracteres."),
});

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phone: "", password: "" },
  });

  const router = useRouter();

  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  const handleSign = async (data: any) => {
    try {
      const response = await api.post("/auth/login", {
        phone: `+55${data.phone}`,
        password: data.password,
      });
      await saveAuthToken(response.data.token);
      Alert.alert("Bem vindo(a)", "Login realizado com sucesso.");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert(
        "Não foi possível entrar",
        error.response?.data?.error || "Verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <View style={styles.containerForm}>
      <View>
        <Text style={styles.label}>Digite seu telefone com DDD:</Text>

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <View style={[styles.input, { flexDirection: "row", alignItems: "center" }]}>
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
        {errors.phone && (
          <Text style={styles.msgError}>{errors.phone.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Digite sua senha:</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.msgError}>{errors.password.message}</Text>
        )}
      </View>

      <Link href={"/forgetPassword"} asChild>
        <Text style={styles.forgetPassword}>Esqueceu sua senha?</Text>
      </Link>

      <View style={styles.areaSubmit}>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={handleSubmit(handleSign)}
        >
          <Text style={styles.btnSubmitText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;
