import { Linking, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { socialService } from "../../interfaces/socialService"

interface Props {
    service: socialService
}

const ServiceWithoutUnit = ({ service }: Props) => {

    const getDialableNumber = (phoneNumber: string) => {
        return phoneNumber.replace(/\s*\((?:Ramal|Ramais).*$/i, "").replace(/\D/g, "")
    }

    return (
        <View style={styles.containerService}>
            <Text style={styles.title}>{service.name}</Text>

            {service.address && (
                <View>
                    <Text style={styles.subtitle}>Endereço</Text>
                    <Text style={styles.textInfo}>{service.address}</Text>
                    <Text
                        style={styles.textMaps}
                        onPress={() => Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address!)}`
                        )}
                    >
                        Ver no Google Maps
                    </Text>
                </View>
            )}

            {service.coordinator && (
                <View>
                    <Text style={styles.subtitle}>Coordenadora</Text>
                    <Text style={styles.textInfo}>{service.coordinator}</Text>
                </View>
            )}

            <View>
                <Text style={styles.subtitle}>Telefone</Text>
                {service.phoneNumbers.map((phoneNumber) => (
                    <TouchableOpacity
                        key={phoneNumber}
                        onPress={() => Linking.openURL(`tel:${getDialableNumber(phoneNumber)}`)}
                    >
                        <Text style={styles.textInfo}>{phoneNumber}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {service.email && (
                <View>
                    <Text style={styles.subtitle}>E-mail</Text>
                    <Text
                        style={styles.textMaps}
                        onPress={() => Linking.openURL(`mailto:${service.email}`)}
                    >
                        {service.email}
                    </Text>
                </View>
            )}
        </View>
    )
}

export default ServiceWithoutUnit