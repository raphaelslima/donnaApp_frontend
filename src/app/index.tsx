import { Text, View } from "react-native"
import styled from "styled-components/native"

const TextContainer = styled.Text`
    color: pink;
`

const Home = () => {
    return(
        <View>
            <TextContainer>Teste Home</TextContainer>
        </View>
    )
}

export default Home