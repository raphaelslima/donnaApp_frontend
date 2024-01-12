import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";

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
                    <TouchableOpacity style={styles.ImgTopic} onPress={()=>{Linking.openURL('tel:181');}}>
                    <View style={styles.img}>
                            <Image source={require('../../assets/img/img181.png')} />
                        </View>
                        <Text style={styles.textImg}>Disque denúncia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ImgTopic} onPress={()=>{Linking.openURL('tel:180');}}>
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