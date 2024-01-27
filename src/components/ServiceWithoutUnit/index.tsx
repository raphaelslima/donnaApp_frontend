import { Linking, Text, TouchableOpacity, View } from "react-native"
import { services } from "../../mock/services"
import { styles } from "./style"
import { formatCEP } from "../../helpers/formatCEP"
import { formatFixPhoneNumber } from "../../helpers/formatFixPhoneNumber"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Foundation } from '@expo/vector-icons';
import { theme } from "../../theme/theme"

const ServiceWithoutUnit = () => {

    const service = services[0]

    const formatAddress = () => {
        return `${service.address.street}, ${service.address.number} - ${service.address.district}, ${service.address.city} - ${service.address.uf}, ${formatCEP(service.address.cep)}`
    }

    return (
        <View style={styles.containerService}>

            <View>
                <Text style={styles.title}>{service.descriptionName}</Text>
                <Text style={styles.description} >{service.descriptionService}</Text>
            </View>

            <View>
                <Text>{service.site}</Text>
            </View>

            <View>
                <Text style={styles.subtitle}  >Como chegar:</Text>
                <Text style={styles.textInfo}>{formatAddress()}</Text>
                <Text style={styles.textMaps} onPress={()=> Linking.openURL(`${service.googleMaps}`)}>Ir para o Google maps</Text>
            </View>

            <View>
            <Text style={styles.subtitle}  >Contatos</Text>
            <Text>{formatFixPhoneNumber(service.phoneNumber)}</Text>
            <Text style={styles.textInfo}>{service.email}</Text>
            </View>

            <View style={styles.btnSession}>

            <TouchableOpacity 
                    style={styles.btnCellphone} 
                    onPress={() => Linking.openURL(`tel:${service.phoneNumber}`)}>
                    <Text style={{color: theme.colors.primaryWhite}}>Ligar</Text>
                    <Foundation name="telephone" style={styles.iconCellphone} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.btnWpp} 
                    onPress={() => Linking.openURL('whatsapp://send?text=teste&phone=31996001712')}>
                    <Text style={{color: theme.colors.primaryWhite}}>WhatsApp</Text>
                    <Ionicons name="logo-whatsapp" style={styles.iconWpp}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default ServiceWithoutUnit