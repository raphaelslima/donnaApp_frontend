export const services = [
    {
        id: '1',
        name: 'DEAM',
        descriptionName: 'Delegacia especializada em atendimento a mulher',
        descriptionService: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat a augue ac euismod. Cras ut urna a nisi commodo laoreet ',
        category: 'security',
        phoneNumber: 3132577817,
        address: {
            street: 'Avenida João Pinheiro da Silva',
            district: 'Esplanada',
            number: 25,
            city: 'Sabará',
            uf: 'MG',
            cep: 34515440
        },
        site: '',
        email: '',
    },
    {
        id: '2',
        name: 'CRAS',
        descriptionName: 'Centro de referência de Assistência Social',
        descriptionService: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat a augue ac euismod. Cras ut urna a nisi commodo laoreet r',
        category: 'assistance',
        phoneNumber: 3136729046,
        address: {
            street: 'R. Santos Dumont',
            district: ' Gen. Carneiro',
            number: 588,
            city: 'Sabará',
            uf: 'MG',
            cep: 34580320
        },
        site: '',
        email: '',
        units: [
            {
                name: 'CRAS - Unidade Centro',
                descriptionName: 'Centro de referência de Assistência Social',
                descriptionService: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat a augue ac euismod. Cras ut urna a nisi commodo laoreet r',
                phoneNumber: 3136729046,
                address: {
                    street: ' R. Mestra Ritinha',
                    district: 'Centro',
                    number: 255,
                    city: 'Sabará',
                    uf: 'MG',
                    cep: 34505020
                },
                site: '',
                email: '',
            },
            {
                name: 'CRAS - Unidade Roça Grande',
                descriptionName: 'Centro de referência de Assistência Social',
                descriptionService: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat a augue ac euismod. Cras ut urna a nisi commodo laoreet r',
                phoneNumber: 3136745496,
                address: {
                    street: ' R. Santa Maria',
                    district: 'Santana',
                    number: 63,
                    city: 'Sabará',
                    uf: 'MG',
                    cep: 34545760
                },
                site: '',
                email: '',
            },
        ]
    }
// 2 -  Delegacias (3 unidades)
// 3 - Polícia Militar (2 unidades)
// 5 - CREAS
// 6 - Conselho Tutelar
// 7 - UBS (3 unidades)
//  8 - Ministério Público de Sabará
]