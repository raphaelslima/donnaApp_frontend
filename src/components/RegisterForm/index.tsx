import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useRouter } from "expo-router";
import api from "../../services/axios";
import { saveAuthToken } from "../../services/auth";
import { styles } from "./style";
import { validateCPF } from "../../helpers/validateCPF";

interface RegisterFormValues {
  cpf: string;
  password: string;
}

const schema = yup.object({
  cpf: yup
    .string()
    .required("Informe seu CPF.")
    .test("CPF", "Informe um CPF válido.", (value) => validateCPF(value || "")),
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
    defaultValues: { cpf: "", password: "" },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fontLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  const handleRegister = async ({ cpf, password }: RegisterFormValues) => {
    try {
      const response = await api.post("/users", {
        cpf: cpf.replace(/\D/g, ""),
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
          <Text style={styles.label}>CPF:</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.inputHeight}
                keyboardType="numeric"
                value={value}
                onChangeText={(text) => onChange(text.replace(/\D/g, "").slice(0, 11))}
                maxLength={11}
              />
            )}
          />
          {errors.cpf && <Text style={styles.erroMsg}>{errors.cpf.message}</Text>}
        </View>
        <View style={styles.labelAndInputOnly}>
          <Text style={styles.label}>Senha:</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View style={[styles.inputHeight, { flexDirection: "row", alignItems: "center" }]}>
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
