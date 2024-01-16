export const formatCEP = (numeroCEP: number): string => {
    var cepString = numeroCEP.toString();

    cepString = cepString.slice(0, 5) + '-' + cepString.slice(5);

    return cepString;
}