import { address } from "./address"
import { unitService } from "./unitService"

export interface socialService {
    id: string,
    name: string,
    descriptionName: string
    descriptionService: string,
    category: string,
    phoneNumber: number,
    address: address,
    site: string,
    email: string,
    units?: unitService[],
    googleMaps: string
}