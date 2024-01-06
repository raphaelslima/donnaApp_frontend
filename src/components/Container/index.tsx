import { View } from "react-native";
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { styles } from "./styles";

interface containerProps {
    children: React.ReactNode
}

const Container = ({children}: containerProps) => {
    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }
 
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Container;