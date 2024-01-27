import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'expo-router';
import { validateCPF } from "../../helpers/validateCPF"
import { formatCPF } from "../../helpers/formatCPF"

const schema = yup.object({
    cpf: yup.string().required('Informe seu cpf.').test('ValidationCPF', 'CPF inválido.', 
    function(value) { 
        return validateCPF(value)
     }),
    password: yup.string().required('Informe sua senha.').min(5, "A senha deve ter no minimo 5 caracteres.")
})

const Form = () => {
    const { control, handleSubmit, setValue, clearErrors,formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const router = useRouter();

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }

    const handleSign = (data: any) => {  
        console.log(data)
        Alert.alert('Bem vindo (a)', 'Você logou no donaApp.')
        router.push('/home')
        return
    }

    return (
        <View style={styles.containerForm}>
            <View>
            <Text style={styles.label}>Digite seu CPF:</Text>

            <Controller
                control={control}
                name="cpf"
                render={({ field: {onChange, value} }) => (
                    <TextInput 
                        style={styles.input}  
                        keyboardType={'phone-pad'}
                        value={value}
                        onChangeText={(value) => {
                            onChange(value)
                            value.length === 11 && setValue('cpf', formatCPF(value))
                            validateCPF(value) && clearErrors('cpf')
                        }}
                        />
                )}
            />
            {errors.cpf && <Text style={styles.msgError}>{errors.cpf.message}</Text>}
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