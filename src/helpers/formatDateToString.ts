export const formatDateToString = (date: Date) : string => {
    const day = date.getDate()
    let birthDay = day.toString()

    if(day < 10){
        birthDay = `0${day}`.toString()
    }

    const month = date.getMonth() + 1
    let birthMonth = month.toString()

    if(month < 10){
        birthMonth = `0${month}`.toString()
    }

    const year = date.getFullYear()

    return `${birthDay}/${birthMonth}/${year}`
}