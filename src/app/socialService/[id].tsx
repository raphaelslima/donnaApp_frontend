import { Link, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './style';
import ServiceWithoutUnit from '../../components/ServiceWithoutUnit';
import ServiceWithUnit from '../../components/ServiceWithUnit';

const SocialService = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return(
        <View style={styles.containerService}>
            <Link href={'/listSocialServices'} asChild>
                <TouchableOpacity style={styles.btnBack}>
                    <Ionicons name="arrow-back" style={styles.iconBack}/> 
                    <Text style={styles.TextBack}>Serviços</Text>
                </TouchableOpacity>
            </Link>

            {id === '1' ? <ServiceWithoutUnit/>: <ServiceWithUnit/>}
            
        </View>
    )
}

export default SocialService