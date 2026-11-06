export const getBrazilianNationalPhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const includesCountryCode =
    digits.startsWith("55") && (digits.length === 12 || digits.length === 13);
  return (includesCountryCode ? digits.slice(2) : digits).slice(0, 11);
};
