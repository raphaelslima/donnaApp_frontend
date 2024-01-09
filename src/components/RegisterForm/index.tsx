import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./style"

const RegisterForm = () => {
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
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Gênero:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>CEP:</Text>
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Estado:</Text>
                        <TextInput style={styles.inputShort}/>
                    </View>
                    <View style={styles.labelAndInput}>
                        <Text style={styles.label}>Cidade:</Text>
                        <TextInput style={styles.inputHeight}/>
                    </View>
                </View>
                <View style={styles.rowFields}>
                    <View style={styles.labelAndInputOnly}>
                        <Text style={styles.label}>Endereço:</Text>
                        <TextInput style={styles.inputHeight}/>
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
                    <View style={styles.labelAndInputOnly}>
                        <Text style={styles.label}>Telefone:</Text>
                        <TextInput style={styles.inputHeight}/>
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