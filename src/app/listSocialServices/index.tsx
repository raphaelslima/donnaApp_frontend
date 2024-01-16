import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Container from "../../components/Container"
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from "./style";
import { Link } from "expo-router";
import { services } from "../../mock/services";
import ItemListSocialService from "../../components/ItemListSocialService";

const listSocialServices = () => {
    return (
        <Container>
            <Link href={'/home'} asChild>
                <TouchableOpacity style={styles.btnBack}>
                    <Ionicons name="arrow-back" style={styles.iconBack}/> 
                    <Text style={styles.TextBack} >Home</Text>
                </TouchableOpacity>
            </Link>

            <View style={styles.containerListItemns}>
                <Text style={styles.title} >Serviços assistenciais:</Text>
                <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={(item) => <ItemListSocialService {...item}/>}
                />
            </View>
        </Container>
    )
}

export default listSocialServices