export const formatFixPhoneNumber = (numberPhone : number)  => {

    const number = numberPhone.toString();

    return '(' + number.slice(0, 2) + ') ' + number.slice(2, 6) + '-' + number.slice(6);
  }