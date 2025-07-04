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

const schema = yup.object({
  password: yup
    .string()
    .required("Informe sua senha.")
    .min(5, "A senha deve ter no minimo 5 caracteres."),
  passwordAgain: yup
    .string()
    .required("Informe sua senha.")
    .min(5, "A senha deve ter no minimo 5 caracteres.")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  const handleSign = (data: any) => {
    console.log(data);
    Alert.alert("Bem vindo (a)", "Você logou no donaApp.");
    router.push("/home");
    return;
  };

  return (
    <View style={styles.containerForm}>
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

      <View>
        <Text style={styles.label}>Digite sua senha de novo:</Text>

        <Controller
          control={control}
          name="passwordAgain"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
            />
          )}
        />
        {errors.passwordAgain && (
          <Text style={styles.msgError}>{errors.passwordAgain.message}</Text>
        )}
      </View>

      <View style={styles.areaSubmit}>
        <Link href={"/home"} asChild>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleSubmit(handleSign)}
          >
            <Text style={styles.btnSubmitText}>Redefinir senha</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Form;
