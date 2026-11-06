import { useEffect, useState } from "react";
import {
  AppState,
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import api from "../../services/axios";
import { scheduleProtectiveMeasureNotifications } from "../../services/protectiveMeasureNotifications";
import { theme } from "../../theme/theme";
import { styles } from "./style";

interface ProtectiveMeasure {
  dataDeferimento: string;
  dataVigencia: string;
  extensivaAosFilhos: boolean;
}

const dateFromApi = (value: string) => {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
};

const dateForApi = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfDay = (value: Date) =>
  new Date(value.getFullYear(), value.getMonth(), value.getDate());

const formatDate = (value: string) => dateFromApi(value).toLocaleDateString("pt-BR");

const getDaysRemaining = (expiryDate: string, referenceDate: Date) => {
  const [year, month, day] = expiryDate.slice(0, 10).split("-").map(Number);
  const end = Date.UTC(year, month - 1, day);
  const start = Date.UTC(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  return Math.round((end - start) / 86_400_000);
};

const ProtectiveMeasureScreen = () => {
  const [measure, setMeasure] = useState<ProtectiveMeasure | null>(null);
  const [grantDate, setGrantDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [extendsToChildren, setExtendsToChildren] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showGrantPicker, setShowGrantPicker] = useState(false);
  const [showExpiryPicker, setShowExpiryPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [today, setToday] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 60_000);
    const appStateSubscription = AppState.addEventListener("change", (state) => {
      if (state === "active") setToday(new Date());
    });
    return () => {
      clearInterval(interval);
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const loadMeasure = async () => {
      try {
        const response = await api.get("/users/me/protective-measure");
        const savedMeasure = response.data.measure as ProtectiveMeasure | null;
        setMeasure(savedMeasure);
        if (savedMeasure) {
          setGrantDate(dateFromApi(savedMeasure.dataDeferimento));
          setExpiryDate(dateFromApi(savedMeasure.dataVigencia));
          setExtendsToChildren(savedMeasure.extensivaAosFilhos);
        } else {
          setEditing(true);
        }
      } catch (error: any) {
        setLoadError(true);
        Alert.alert(
          "Não foi possível carregar",
          error.response?.data?.error || "Verifique sua conexão e tente novamente."
        );
      } finally {
        setLoading(false);
      }
    };
    loadMeasure();
  }, []);

  const saveMeasure = async () => {
    if (!grantDate || !expiryDate) {
      Alert.alert("Datas obrigatórias", "Informe a data de deferimento e o prazo de vigência.");
      return;
    }
    if (dateForApi(grantDate) > dateForApi(startOfDay(new Date()))) {
      Alert.alert("Data inválida", "A data de deferimento não pode ser futura.");
      return;
    }
    if (dateForApi(expiryDate) < dateForApi(grantDate)) {
      Alert.alert("Data inválida", "O prazo de vigência deve ser igual ou posterior à data de deferimento.");
      return;
    }

    setSaving(true);
    try {
      const response = await api.put("/users/me/protective-measure", {
        dataDeferimento: dateForApi(grantDate),
        dataVigencia: dateForApi(expiryDate),
        extensivaAosFilhos: extendsToChildren,
      });
      const savedMeasure = response.data.measure as ProtectiveMeasure;
      const savedUserId = response.data.userId as string;
      setMeasure(savedMeasure);
      setEditing(false);

      try {
        const reminderDays = await scheduleProtectiveMeasureNotifications(
          savedUserId,
          dateFromApi(savedMeasure.dataVigencia)
        );
        Alert.alert(
          "Medida cadastrada",
          reminderDays.length
            ? `O prazo foi salvo. Lembretes configurados para ${reminderDays.join(", ")} dia(s) antes do vencimento.`
            : "O prazo foi salvo. Como a data está próxima ou já passou, não há lembretes futuros para configurar."
        );
      } catch (notificationError: any) {
        Alert.alert(
          "Medida salva; lembretes não configurados",
          notificationError.message || "Não foi possível configurar os lembretes neste aparelho."
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Não foi possível salvar",
        error.response?.data?.error || "Verifique sua conexão e tente novamente."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} color={theme.colors.primaryPurple} />;
  }

  if (loadError) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadError}>Não foi possível carregar a medida protetiva.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const daysRemaining = measure ? getDaysRemaining(measure.dataVigencia, today) : 0;
  const countdownText = daysRemaining > 0
    ? `Faltam ${daysRemaining} ${daysRemaining === 1 ? "dia" : "dias"}`
    : daysRemaining === 0
      ? "O prazo termina hoje"
      : `Prazo encerrado há ${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? "dia" : "dias"}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel="Voltar para políticas"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.primaryWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Medida protetiva</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.introduction}>
          Cadastre as datas da sua medida para acompanhar o prazo e receber lembretes antes do fim da vigência.
        </Text>

        {measure && !editing ? (
          <View style={styles.measureCard}>
            <Text style={styles.countdown}>{countdownText}</Text>
            <Text style={styles.detail}>
              Data em que foi deferida: {formatDate(measure.dataDeferimento)}
            </Text>
            <Text style={styles.detail}>
              Prazo de vigência: {formatDate(measure.dataVigencia)}
            </Text>
            <Text style={styles.detail}>
              Extensiva aos filhos: {measure.extensivaAosFilhos ? "Sim" : "Não"}
            </Text>
            <Text style={styles.reminderNote}>
              Os avisos são notificações locais deste aparelho, programadas para 14, 7 e 3 dias antes do prazo quando essas datas ainda estiverem no futuro.
            </Text>
            <TouchableOpacity onPress={() => setEditing(true)} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Editar medida</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>Medida deferida em:</Text>
              <TouchableOpacity onPress={() => setShowGrantPicker(true)} style={styles.dateButton}>
                <Text style={styles.dateText}>
                  {grantDate ? grantDate.toLocaleDateString("pt-BR") : "Selecionar data"}
                </Text>
              </TouchableOpacity>
            </View>
            {showGrantPicker && (
              <DateTimePicker
                mode="date"
                value={grantDate || new Date()}
                maximumDate={new Date()}
                onChange={(_event, selectedDate) => {
                  setShowGrantPicker(false);
                  if (selectedDate) setGrantDate(startOfDay(selectedDate));
                }}
              />
            )}

            <View style={styles.field}>
              <Text style={styles.label}>Prazo de vigência:</Text>
              <TouchableOpacity onPress={() => setShowExpiryPicker(true)} style={styles.dateButton}>
                <Text style={styles.dateText}>
                  {expiryDate ? expiryDate.toLocaleDateString("pt-BR") : "Selecionar data"}
                </Text>
              </TouchableOpacity>
            </View>
            {showExpiryPicker && (
              <DateTimePicker
                mode="date"
                value={expiryDate || grantDate || new Date()}
                minimumDate={grantDate}
                onChange={(_event, selectedDate) => {
                  setShowExpiryPicker(false);
                  if (selectedDate) setExpiryDate(startOfDay(selectedDate));
                }}
              />
            )}

            <View style={styles.switchRow}>
              <Text style={styles.label}>Extensiva aos filhos?</Text>
              <Switch
                value={extendsToChildren}
                onValueChange={setExtendsToChildren}
                trackColor={{ true: theme.colors.primaryPurple }}
              />
            </View>
            <Text style={styles.reminderNote}>
              Você receberá notificações neste aparelho 14, 7 e 3 dias antes do fim da vigência, se essas datas ainda estiverem no futuro. É necessário permitir notificações.
            </Text>

            <TouchableOpacity
              onPress={saveMeasure}
              disabled={saving}
              style={[styles.primaryButton, saving && styles.disabledButton]}
            >
              <Text style={styles.primaryButtonText}>
                {saving ? "Salvando..." : measure ? "Salvar alterações" : "Cadastrar medida"}
              </Text>
            </TouchableOpacity>
            {measure && (
              <TouchableOpacity onPress={() => setEditing(false)} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ProtectiveMeasureScreen;
