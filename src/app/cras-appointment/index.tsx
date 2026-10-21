import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { services } from "../../mock/services";
import api from "../../services/axios";
import { theme } from "../../theme/theme";
import { styles } from "./style";

interface ProfileContact {
  email?: string;
  telefone: string;
}

const getInitialDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0);
  return date;
};

const AppointmentScreen = () => {
  const crasUnits = useMemo(() => services.filter((service) => service.name.startsWith("CRAS ")), []);
  const [profile, setProfile] = useState<ProfileContact>();
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [dateTime, setDateTime] = useState(getInitialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadContact = async () => {
      try {
        const response = await api.get("/users/me");
        const user = response.data.user as ProfileContact;
        setProfile(user);
        setEmail(user.email || "");
      } catch (error: any) {
        setLoadError(true);
        Alert.alert(
          "Não foi possível carregar seus dados",
          error.response?.data?.error || "Tente novamente."
        );
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, []);

  const submitAppointment = async () => {
    const unit = crasUnits.find((item) => item.id === selectedUnitId);
    if (!unit) {
      Alert.alert("Selecione uma unidade", "Escolha a unidade do CRAS desejada.");
      return;
    }
    if (dateTime <= new Date()) {
      Alert.alert("Data inválida", "Selecione uma data e um horário futuros.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("E-mail inválido", "Informe um e-mail válido para o contato.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post("/appointments", {
        crasId: unit.id,
        crasName: unit.name,
        crasAddress: unit.address || "",
        dateTime: dateTime.toISOString(),
        email: email.trim(),
        telephone: profile?.telefone,
      });
      Alert.alert(
        "Solicitação registrada",
        response.data.message || "A disponibilidade deverá ser confirmada pelo CRAS.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error: any) {
      Alert.alert(
        "Não foi possível enviar",
        error.response?.data?.error || "Verifique a conexão e tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.container} color={theme.colors.primaryPurple} />;
  }
  if (loadError || !profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadError}>Não foi possível carregar os dados da sua conta. Verifique a conexão e tente novamente.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backAction}>
          <Text style={styles.backActionText}>Voltar</Text>
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
        <Text style={styles.title}>Agendamento no CRAS</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Escolha uma unidade:</Text>
          <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedUnitId} onValueChange={setSelectedUnitId}>
            <Picker.Item label="Selecione uma unidade" value="" />
            {crasUnits.map((unit) => (
              <Picker.Item
                key={unit.id}
                label={`${unit.name} — ${unit.address || "Endereço não informado"}`}
                value={unit.id}
              />
            ))}
          </Picker>
          </View>
        </View>
        {selectedUnitId && (
          <Text style={styles.address}>
            {crasUnits.find((unit) => unit.id === selectedUnitId)?.address || "Endereço não informado"}
          </Text>
        )}
        <View style={styles.field}>
          <Text style={styles.label}>Data:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.valueButton}>
            <Text style={styles.valueText}>{dateTime.toLocaleDateString("pt-BR")}</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            minimumDate={new Date()}
            value={dateTime}
            onChange={(_event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                selectedDate.setHours(dateTime.getHours(), dateTime.getMinutes(), 0, 0);
                setDateTime(selectedDate);
              }
            }}
          />
        )}
        <View style={styles.field}>
          <Text style={styles.label}>Horário:</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.valueButton}>
            <Text style={styles.valueText}>
              {dateTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </TouchableOpacity>
        </View>
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            value={dateTime}
            onChange={(_event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                const nextDate = new Date(dateTime);
                nextDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
                setDateTime(nextDate);
              }
            }}
          />
        )}
        <View style={styles.field}>
          <Text style={styles.label}>E-mail para contato:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.telephone}>
          Telefone informado no cadastro: {profile.telefone}
        </Text>
        <Text style={styles.note}>
          Esta tela registra uma solicitação. A data e o horário ainda precisam ser confirmados com a unidade.
        </Text>
        <TouchableOpacity
          onPress={submitAppointment}
          disabled={submitting}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? "Enviando..." : "Solicitar agendamento"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AppointmentScreen;
