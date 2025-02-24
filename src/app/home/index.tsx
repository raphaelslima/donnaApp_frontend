import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from "../../theme/theme";
import { Link } from "expo-router";

const Home = () => {

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }

    return(
        <View style={styles.containerHome}>
            <View style={styles.headerHome}>
                <Image source={require('../../assets/img/imgHome.png')} style={styles.backgroundImg}/>
                <View style={styles.headerContent}>
                </View>
                <View style={styles.headerTextAndActions}>
                    <Text style={styles.title}>Sabará</Text>
                    <Text style={styles.subtitle}>Qual serviço de assistência social você está buscando?</Text>
                    <Link href={'/listSocialServices'} asChild>
                    <TouchableOpacity style={styles.btnSeachService}>
                    <Ionicons name="search" style={styles.iconSearch}/>
                        <Text>Buscar serviços</Text>
                    </TouchableOpacity>
                    </Link>
                    <TouchableOpacity 
                        style={styles.btnWpp} 
                        onPress={() => Linking.openURL(`whatsapp://send?text=${`Boa noite, quero entrar em contato com o CRAS`}&phone=31996001712`)}>
                    <Ionicons name="logo-whatsapp" style={styles.iconWpp}/>
                        <Text style={{color: theme.colors.primaryWhite}}>WhatsApp CREAS</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sessionBtn}>
                <Text style={styles.titleSessionBtn}>Canais úteis:</Text>
                <View style={styles.sessionImg}>
                    <TouchableOpacity style={styles.ImgTopic} onPress={()=>{Linking.openURL('tel:180');}}>
                        <View style={styles.img}>
                            <Image source={require('../../assets/img/img180.png')} />
                        </View>
                        <Text style={styles.textImg}>Denuncie violência contra mulher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.ImgTopic, {marginLeft: 20}]} onPress={()=>{Linking.openURL('tel:181');}}>
                    <View style={styles.img}>
                            <Image source={require('../../assets/img/img181.png')} />
                        </View>
                        <Text style={styles.textImg}>Disque denúncia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ImgTopic} onPress={()=>{Linking.openURL('tel:100');}}>
                    <View style={styles.img}>
                            <Image source={require('../../assets/img/img100.png')} />
                        </View>
                        <Text style={styles.textImg}>Disque direitos humanos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home