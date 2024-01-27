export const validateCellphone = (cellphone: string) => {
    if(cellphone.length > 16) return false

    if(Number(cellphone[7]) !== 9) return false

    if(Number(cellphone[1]) === 0) return false

    if(Number(cellphone[1]) === 1 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 2 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 2 && Number(cellphone[2]) === 3) return false

    if(Number(cellphone[1]) === 2 && Number(cellphone[2]) === 5) return false

    if(Number(cellphone[1]) === 2 && Number(cellphone[2]) === 6) return false

    if(Number(cellphone[1]) === 2 && Number(cellphone[2]) === 9) return false

    if(Number(cellphone[1]) === 3 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 3 && Number(cellphone[2]) === 6) return false

    if(Number(cellphone[1]) === 3 && Number(cellphone[2]) === 9) return false

    if(Number(cellphone[1]) === 4 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 5 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 5 && Number(cellphone[2]) === 2) return false

    if(Number(cellphone[1]) === 5 && Number(cellphone[2]) === 6) return false

    if(Number(cellphone[1]) === 5 && Number(cellphone[2]) === 7) return false

    if(Number(cellphone[1]) === 5 && Number(cellphone[2]) === 8) return false

    if(Number(cellphone[1]) === 5 && Number(cellphone[2]) === 9) return false

    if(Number(cellphone[1]) === 6 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 7 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 7 && Number(cellphone[2]) === 8) return false

    if(Number(cellphone[1]) === 8 && Number(cellphone[2]) === 0) return false

    if(Number(cellphone[1]) === 9 && Number(cellphone[2]) === 0) return false

    return true;
}