import { FlatList, Text, View } from "react-native"
import { services } from "../../mock/services"
import { styles } from "./style"
import UnitService from "../UnitsServices"
import Separator from "../Separator"

const ServiceWithUnit = () => {

    const service = services[1]
    const units = services[1].units

    return (
        <View style={styles.containerService}>

            <View>
                <Text style={styles.title}>{service.descriptionName}</Text>
                <Text style={styles.description} >{service.descriptionService}</Text>
            </View>

            <View>
                <Text>{service.site}</Text>
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    data={units}
                    keyExtractor={(item) => item.name}
                    renderItem={(item) => <UnitService {...item}/>}
                    ItemSeparatorComponent={() => <Separator/>}
                    ListFooterComponent={<View style={{height: 200}}/>}
                />
            </View>
            
        </View>
    )
}

export default ServiceWithUnit