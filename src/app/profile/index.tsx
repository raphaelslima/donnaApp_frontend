import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardTypeOptions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { getBrazilianNationalPhoneDigits } from "../../helpers/phoneInput";
import { genderTypes } from "../../helpers/genderTypes";
import api from "../../services/axios";
import { clearAuthToken } from "../../services/auth";
import { theme } from "../../theme/theme";
import { styles } from "./style";

interface Profile {
  nome?: string;
  sobrenome?: string;
  dataNascimento?: string;
  genero?: string;
  telefone?: string;
  cep?: string;
  rua?: string;
  estado?: string;
  cidade?: string;
  complemento?: string;
  bairro?: string;
  pontoReferencia?: string;
  numeroCasa?: string;
  email?: string;
}

type ProfileField = Exclude<keyof Profile, "dataNascimento">;

const profileFields: { key: ProfileField; label: string; keyboardType?: KeyboardTypeOptions }[] = [
  { key: "nome", label: "Nome" },
  { key: "sobrenome", label: "Sobrenome" },
  { key: "telefone", label: "Número de telefone com DDD", keyboardType: "phone-pad" },
  { key: "genero", label: "Gênero" },
  { key: "cep", label: "CEP", keyboardType: "numeric" },
  { key: "rua", label: "Rua" },
  { key: "estado", label: "Estado" },
  { key: "cidade", label: "Cidade" },
  { key: "numeroCasa", label: "Número" },
  { key: "complemento", label: "Complemento" },
  { key: "bairro", label: "Bairro" },
  { key: "pontoReferencia", label: "Ponto de referência" },
  { key: "email", label: "E-mail", keyboardType: "email-address" },
];

const emptyProfile = (): Profile => ({
  nome: "",
  sobrenome: "",
  dataNascimento: "",
  genero: "",
  telefone: "",
  cep: "",
  rua: "",
  estado: "",
  cidade: "",
  complemento: "",
  bairro: "",
  pontoReferencia: "",
  numeroCasa: "",
  email: "",
});

const ProfileScreen = () => {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/users/me");
        const user = response.data.user as Profile;
        setProfile({ ...emptyProfile(), ...user });
        if (user.dataNascimento) {
          setDateOfBirth(new Date(user.dataNascimento));
        }
      } catch (error: any) {
        setLoadError(true);
        Alert.alert(
          "Não foi possível carregar o perfil",
          error.response?.data?.error || "Tente novamente."
        );
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const updateField = (key: ProfileField, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const saveProfile = async () => {
    const email = profile.email?.trim() || "";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("E-mail inválido", "Confira o formato do e-mail informado.");
      return;
    }
    const telefone = getBrazilianNationalPhoneDigits(profile.telefone || "");
    if (telefone && !/^\d{10,11}$/.test(telefone)) {
      Alert.alert("Telefone inválido", "Informe um telefone válido com DDD.");
      return;
    }
    const cep = profile.cep?.replace(/\D/g, "") || "";
    if (cep && cep.length !== 8) {
      Alert.alert("CEP inválido", "O CEP deve conter 8 números.");
      return;
    }

    setSaving(true);
    try {
      const response = await api.patch("/users/me", {
        ...profile,
        dataNascimento: dateOfBirth?.toISOString() || "",
        email,
        telefone,
        cep,
      });
      setProfile({ ...emptyProfile(), ...response.data.user });
      Alert.alert("Perfil atualizado", "As informações foram salvas.");
    } catch (error: any) {
      Alert.alert(
        "Não foi possível salvar",
        error.response?.data?.error || "Verifique a conexão e tente novamente."
      );
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await clearAuthToken();
    router.replace("/");
  };

  if (loading) {
    return <ActivityIndicator style={styles.container} color={theme.colors.primaryPurple} />;
  }
  if (loadError) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadError}>Não foi possível carregar seu perfil. Verifique a conexão e tente novamente.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} accessibilityLabel="Voltar" style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.primaryWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Meu perfil</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.introduction}>
          Os campos são opcionais. Preencha o que desejar e salve para atualizar seu perfil.
        </Text>
        <Text style={styles.label}>Data de nascimento</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {dateOfBirth ? dateOfBirth.toLocaleDateString("pt-BR") : "Selecionar data"}
          </Text>
        </TouchableOpacity>
        {dateOfBirth && (
          <TouchableOpacity onPress={() => setDateOfBirth(undefined)} style={styles.dateInput}>
            <Text style={styles.removeDate}>Remover data de nascimento</Text>
          </TouchableOpacity>
        )}
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={dateOfBirth || new Date(2000, 0, 1)}
            maximumDate={new Date()}
            onChange={(_event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDateOfBirth(selectedDate);
            }}
          />
        )}
        {profileFields.map(({ key, label, keyboardType }) => (
          <View key={key} style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            {key === "genero" ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={profile.genero || ""}
                  onValueChange={(value) => updateField("genero", value)}
                >
                  <Picker.Item label="Selecione uma opção" value="" />
                  {genderTypes.map(({ label: optionLabel, value }) => (
                    <Picker.Item key={value} label={optionLabel} value={value} />
                  ))}
                </Picker>
              </View>
            ) : (
              <TextInput
                style={styles.input}
                value={key === "telefone" ? getBrazilianNationalPhoneDigits(profile.telefone || "") : profile[key] || ""}
                onChangeText={(value) =>
                  updateField(
                    key,
                    key === "telefone" ? getBrazilianNationalPhoneDigits(value) : value
                  )
                }
                keyboardType={keyboardType}
                maxLength={key === "telefone" ? 11 : undefined}
                autoCapitalize={key === "email" ? "none" : "sentences"}
              />
            )}
          </View>
        ))}
        <TouchableOpacity
          onPress={saveProfile}
          disabled={saving}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>{saving ? "Salvando..." : "Salvar perfil"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
