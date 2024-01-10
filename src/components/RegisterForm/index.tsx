import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import api from "../../services/axios"
import { useState } from "react"

interface respCep {
    data: {
        bairro : string, 
        localidade : string, 
        logradouro : string,
        uf : string
    }
}

const RegisterForm = () => {
    const [street, setStreet] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const searchAdressForCEP = async (cep: string) => {
        if(cep === ''){
            Alert.alert('Atenção', 'Preencha o CEP!')
            return
        }

        if(cep.length === 8){

            try{

                const response : respCep = await api.get(`${cep}/json/`)
                setStreet(response.data.logradouro)
                setDistrict(response.data.bairro)
                setCity(response.data.localidade)
                setState(response.data.uf)

            }catch(error){
                console.log('ERROR' + error)
            }
        }
    }

    return(
        <View style={styles.containerFormRegister} >
            <View style={styles.containerFields} >
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Sobrenme:</Text>
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Data de Nascimento:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>CPF:</Text>
                        <TextInput style={styles.inputHeight} />
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Gênero:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>CEP:</Text>
                        <TextInput style={styles.inputHeight}
                        onChangeText={(cep) => searchAdressForCEP(cep)}
                        keyboardType="phone-pad"
                        maxLength={8}
                        />
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInputOnly}>
                        <Text style={styles.label}>Rua:</Text>
                        <TextInput style={styles.inputHeight}
                            value={street && street}
                        />
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Estado:</Text>
                        <TextInput style={styles.inputShort}
                            value={state && state}
                        />
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Cidade:</Text>
                        <TextInput 
                            style={styles.inputHeight}
                            value={city && city}
                        />
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Número:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Complemento:</Text>
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
                <View style={styles.rowFields}>
                <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Telefone:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                            <Text style={styles.label}>Bairro:</Text>
                            <TextInput 
                                style={styles.inputHeight}
                                value={district && district}
                                />
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInputOnly}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInputOnly}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.btnSubimit}>
                <Text style={styles.btnSubimitText} >Próximo</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterForm