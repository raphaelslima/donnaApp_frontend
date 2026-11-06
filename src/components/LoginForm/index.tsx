import { useState } from "react";
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
import { validateCPF } from "../../helpers/validateCPF";

const schema = yup.object({
  cpf: yup
    .string()
    .required("Informe seu CPF.")
    .test("CPF", "Informe um CPF válido.", (value) => validateCPF(value || "")),
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
    defaultValues: { cpf: "", password: "" },
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  const handleSign = async (data: { cpf: string; password: string }) => {
    try {
      const response = await api.post("/auth/login", {
        cpf: data.cpf.replace(/\D/g, ""),
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
        <Text style={styles.label}>Digite seu CPF:</Text>

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => onChange(text.replace(/\D/g, "").slice(0, 11))}
              maxLength={11}
            />
          )}
        />
        {errors.cpf && (
          <Text style={styles.msgError}>{errors.cpf.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Digite sua senha:</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={[styles.input, { flexDirection: "row", alignItems: "center" }]}>
              <TextInput
                style={{ flex: 1, padding: 0 }}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <Text>{showPassword ? "Ocultar" : "Mostrar"}</Text>
              </TouchableOpacity>
            </View>
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
