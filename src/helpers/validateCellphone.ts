export const validateCellphone = (cellphone: string) => {
    const digits = cellphone.replace(/\D/g, "");
    return /^\d{2}9\d{8}$/.test(digits) && digits.slice(0, 2) !== "00";
}