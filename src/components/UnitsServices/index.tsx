import { Linking, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { formatCEP } from "../../helpers/formatCEP"
import { formatFixPhoneNumber } from "../../helpers/formatFixPhoneNumber"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Foundation } from '@expo/vector-icons';
import { theme } from "../../theme/theme"
import { unitService } from "../../interfaces/unitService"

interface props {
    item: unitService
}

const UnitService = ({item}: props) => {

    const formatAddress = () => {
        return `${item.address.street}, ${item.address.number} - ${item.address.district}, ${item.address.city} - ${item.address.uf}, ${formatCEP(item.address.cep)}`
    }

    return (
        <View style={{flex: 1}}>

            <View>
                <Text style={styles.subtitle}>{item.name}</Text>
            </View>
            
            <View>
                <Text>{item.site}</Text>
            </View>

            <View>
                <Text style={styles.subtitle}>Como chegar:</Text>
                <Text style={styles.textInfo}>{formatAddress()}</Text>
                <Text style={styles.textMaps} onPress={()=> Linking.openURL(`${item.googleMaps}`)}>Ir para o Google maps</Text>
            </View>

            <View>
                <Text style={styles.subtitle}  >Contatos</Text>
                <Text>{formatFixPhoneNumber(item.phoneNumber)}</Text>
                <Text style={styles.textInfo}>{item.email}</Text>
            </View>

            <View style={styles.btnSession}>

            <TouchableOpacity 
                    style={styles.btnCellphone} 
                    onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}>
                    <Text style={{color: theme.colors.primaryWhite}}>Ligar</Text>
                    <Ionicons name="person" style={styles.iconCellphone} />
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

export default UnitService