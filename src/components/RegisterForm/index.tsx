import { Alert, Text, TextInput, ScrollView, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import api from "../../services/axios"
import { respCep } from "../../interfaces/respCep"
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useFonts, Inter_400Regular, Inter_700Bold} from "@expo-google-fonts/inter"
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SetStateAction, useState } from "react"
import { genderTypes } from "../../helpers/genderTypes";

const schema = yup.object({
    firstName: yup.string().required('Informe seu Nome.').min(3, "Campo nome precisa ter pelo mneos 3 caracteres"),
    lastName: yup.string().required('Informe seu sobrenome.').min(2, "Campo sobrenome precisa ter pelo mneos 2 caracteres"),
    dateOfBirth: yup.string(),
    cpf: yup.string().required('Informe seu cpf.'),
    gender: yup.string().required('Informe seu gênero.'),
    cep: yup.string().required('Informe seu CEP.').min(8, "O CEP possui 8 número."),
    street: yup.string().required('Informe sua rua.'),
    state: yup.string().required('Informe seu estado.').min(2, "Por favor, digite a sigla do seu estado."),
    city: yup.string().required('Informe sua cidade.'),
    numberAddress: yup.string().required('Informe o número da sua residencia.'),
    complement: yup.string().required('Informe o complemento do seu endereço.'),
    phoneNumber: yup.string().required('Informe seu telefone celular.').min(11, "O telefone tem 11 número").max(11, "O telefone tem 11 número"),
    distict: yup.string().required('Informe seu bairro.'),
    referencePoint: yup.string(),
    email: yup.string().email('Email inváido'),
    password: yup.string().required('Informe sua senha.').min(5, "A senha deve ter no minimo 5 caracteres."),
})

const RegisterForm = () => {
    const { control, handleSubmit, formState: {errors}, setValue, clearErrors } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            city: 'Sabará',
            state: 'MG'
        }
    })

    const [gender, setGender] = useState([
        {label: 'Cisgênero', value: 'cisgênero'},
        {label: 'Transgênero', value: 'transgênero'},
        {label: 'Gênero neutro', value: 'gênero neutro'},
        {label: 'Não-binário', value: 'não-binário'},
    ]);

    const [valueGender, setValueGender] = useState<SetStateAction<string>>('');

    const formatDateInput = (date: string) : string => {
        let dateFormat = ''
        if(date !== ''){
            if(date.length === 2){
                dateFormat = date
                dateFormat = [date.slice(0, 2), '/', dateFormat.slice(3)].join('')
                setValue('dateOfBirth', dateFormat)
            } else if (date.length  === 5) {
                dateFormat = date
                dateFormat = [date.slice(0, 5), '/', dateFormat.slice(5)].join('')
                setValue('dateOfBirth', dateFormat)
            }
        }
        return dateFormat
    }

    const searchAdressForCEP = async (cep: string) => {

        if(cep.length === 8){
            const cepFormat = cep.replace(/\D/g, '')
            try{

                const response : respCep = await api.get(`${cepFormat}/json/`)
                setValue('street',response.data.logradouro)
                setValue('distict',response.data.bairro)
                setValue('city',response.data.localidade)
                setValue('state',response.data.uf)

                clearErrors(['street', 'distict', 'city', 'state'])

            }catch(error){
                Alert.alert('Atenção', 'CEP inválido')
            }
        }     
    }

    const handleRegister = (data: any) => {
        console.log(data)
        Alert.alert('Bem vindo(a)', 'Seu usuário foi registrado no donaApp.')
    }

    // const updateGender = () => {
    //     valueGender && setValue('gender', valueGender)
    //     clearErrors('gender')
    // }

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold
    })

    if(!fontLoaded){
        return null
    }

    return(
        <ScrollView style={styles.containerFormRegister} >
            <View style={styles.containerFields} >
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Nome:</Text>
                        
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputShort}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                
                            )}
                        />
                        {errors.firstName && <Text style={styles.erroMsg}>{errors.firstName.message}</Text>}
                    </View>

                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Sobrenme:</Text>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                
                            )}
                        />
                        {errors.lastName && <Text style={styles.erroMsg}>{errors.lastName.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Data de Nascimento:</Text>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            render={({ field}) => (
                                <TextInput 
                                    style={styles.inputShort}
                                    value={field.value}
                                    onChangeText={(value) => {
                                        field.onChange(value)
                                        formatDateInput(value)
                                    }}
                                    maxLength={10}
                                    placeholder="DD/MM/AAAA"
                                    keyboardType="numeric"
                                />
                            )}
                        />
                         {errors.dateOfBirth && <Text style={styles.erroMsg}>{errors.dateOfBirth.message}</Text>}
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>CPF:</Text>
                        <Controller
                            control={control}
                            name="cpf"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                />
                                
                            )}
                        />
                        {errors.cpf && <Text style={styles.erroMsg}>{errors.cpf.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Gênero:</Text>
                        <Controller
                            control={control}
                            name="gender"
                            render={({field}) => (
                                <Dropdown
                                    style={styles.inputShort}
                                    data={gender}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={field.value}
                                    onChange={item => {
                                        field.onChange(item.value)
                                        setValueGender(item.value)
                                    }}
                                    placeholder=""
                                    />
                            )}
                        />
                        {errors.gender && <Text style={styles.erroMsg}>{errors.gender.message}</Text>}
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>CEP:</Text>
                        <Controller
                            control={control}
                            name="cep"
                            render={({ field }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={field.value}
                                    keyboardType="numeric"
                                    onChangeText={(value) => {
                                        field.onChange(value)
                                        searchAdressForCEP(value)
                                    }}
                                    maxLength={8}
                                />
                            )}
                        />
                        {errors.cep && <Text style={styles.erroMsg}>{errors.cep.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInputOnly}>
                        <Text style={styles.label}>Rua:</Text>
                        <Controller
                            control={control}
                            name="street"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.street && <Text style={styles.erroMsg}>{errors.street.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Número:</Text>
                        <Controller
                            control={control}
                            name="numberAddress"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputShort}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                         {errors.numberAddress && <Text style={styles.erroMsg}>{errors.numberAddress.message}</Text>}
                    </View>
                    <View style={styles.labelAndInput}>
                            <Text style={styles.label}>Bairro:</Text>
                            <Controller
                                control={control}
                                name="distict"
                                render={({ field: {value, onChange} }) => (
                                    <TextInput 
                                        style={styles.inputHeight}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.distict && <Text style={styles.erroMsg}>{errors.distict.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Cidade:</Text>
                        <Controller
                            control={control}
                            name="city"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputShort}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.city && <Text style={styles.erroMsg}>{errors.city.message}</Text>}
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Complemento:</Text>
                        <Controller
                            control={control}
                            name="complement"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.complement && <Text style={styles.erroMsg}>{errors.complement.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Telefone:</Text>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputShort}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.phoneNumber && <Text style={styles.erroMsg}>{errors.phoneNumber.message}</Text>}
                    </View>
                    
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Ponto de referência:</Text>
                        <Controller
                            control={control}
                            name="referencePoint"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.referencePoint && <Text style={styles.erroMsg}>{errors.referencePoint.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Email:</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputHeight}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.email && <Text style={styles.erroMsg}>{errors.email.message}</Text>}
                    </View>
                    <View style={[styles.labelAndInput, {alignItems: 'flex-end'}]}>
                        <Text style={styles.labelPassowrd}>Senha:</Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: {value, onChange} }) => (
                                <TextInput 
                                    style={styles.inputShort}
                                    value={value}
                                    onChangeText={onChange}
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.password && <Text style={styles.erroMsg}>{errors.password.message}</Text>}
                    </View>
                </View>
                <View style={styles.rowFields}>
                    
                </View>
            </View>

            <TouchableOpacity style={styles.btnSubimit} onPress={handleSubmit(handleRegister)}>
                <Text style={styles.btnSubimitText} >Próximo</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default RegisterForm