import { Text, TouchableOpacity, View} from "react-native"
import { socialService } from "../../interfaces/socialService"
import { styles } from "./style"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

interface Props {
    item: socialService
}

const ItemListSocialService = ({item} : Props) => {

    const router = useRouter()

    const handleGetToService = (id: string) => {
        router.push(`/socialService/${id}`)
    }

    return (
        <TouchableOpacity style={styles.containerItem} onPress={() => handleGetToService(item.id)}>
            <View style={styles.item}>
                {item.category === 'security' ? 
                <Ionicons name="shield" style={styles.iconItem}/> 
                : 
                <Ionicons name="person" style={styles.iconItem}/>}
                <Text style={styles.TextItem} >{item.descriptionName} - ({item.name})</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemListSocialService