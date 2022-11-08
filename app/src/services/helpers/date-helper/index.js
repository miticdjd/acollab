import moment from 'moment';

const dateFormats = {
    basicFormat: 'DD.MM.YYYY',
    basicFormatDB: 'YYYY-MM-DD',
    dateAndTime: 'DD.MM.YYYY HH:mm:ss'
}
export function returnDefaultMomentFormatForDB(date) {
    return moment(date).format(dateFormats.basicFormatDB);
}

export function returnDefaultMomentFormat(date) {
    const dateForMoment = date && new Date(date)
    return moment(dateForMoment).format(dateFormats.basicFormat);
}

export function returnDateAndTimeFormat(date) {
    const dateForMoment = date && new Date(date)
    return moment(dateForMoment).format(dateFormats.dateAndTime);
}