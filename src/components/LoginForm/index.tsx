import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    phoneNumber: yup.string().required('Informe seu telefone.').min(11, "Telefone inválido"),
    password: yup.string().required('Informe sua senha.').min(5, "A senha deve ter no minimo 5 caracteres.")
})

const Form = () => {
    const { control, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }

    const handleSign = (data: any) => {  
        console.log(data)
        Alert.alert('Sucesso', 'Bem Vinda ao DonnApp!')
        return
    }

    return (
        <View style={styles.containerForm}>
            <View>
            <Text style={styles.label}>Digite seu telefone:</Text>

            <Controller
                control={control}
                name="phoneNumber"
                render={({ field: {onChange, value} }) => (
                    <TextInput 
                        style={styles.input}  
                        keyboardType={'phone-pad'}
                        value={value?.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")}
                        onChangeText={onChange}
                        />
                )}
            />
            {errors.phoneNumber && <Text style={styles.msgError}>{errors.phoneNumber.message}</Text>}
            </View>

            <View>
            <Text style={styles.label}>Digite sua senha:</Text>

            <Controller
                control={control}
                name="password"
                render={({ field: {onChange, value} }) => (
                    <TextInput 
                        style={styles.input}  
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={true}
                        />
                )}
            />
            {errors.password && <Text style={styles.msgError}>{errors.password.message}</Text>}
            </View>

            <Text style={styles.forgetPassword}>Esqueceu sua senha?</Text>

            <View style={styles.areaSubmit}>
                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit(handleSign)}>
                <Text style={styles.btnSubmitText}>Acessar</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Form