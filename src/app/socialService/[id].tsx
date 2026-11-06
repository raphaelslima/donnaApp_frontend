import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './style';
import ServiceWithoutUnit from '../../components/ServiceWithoutUnit';
import { services } from '../../mock/services';

const SocialService = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const service = services.find((item) => item.id === id);
    return(
        <ScrollView contentContainerStyle={styles.containerService}>
            <Link href={'/listSocialServices'} asChild>
                <TouchableOpacity style={styles.btnBack}>
                    <Ionicons name="arrow-back" style={styles.iconBack}/> 
                    <Text style={styles.TextBack}>Serviços</Text>
                </TouchableOpacity>
            </Link>

            {service ? (
                <ServiceWithoutUnit service={service}/>
            ) : (
                <Text>Serviço não encontrado.</Text>
            )}
            
        </ScrollView>
    )
}

export default SocialService