const DateHelper =  {
  date2DateString: (date, format) => {
    let dateString = date.toDateString()
    if(format="YYYY-MM-DD") {
      return dateString = date.getFullYear() + '-'
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2)
    }
    return dateString
  },
  dateString2Date: (dateStr) => {
    //Note, dateStr has to be in the format YYYY-MM-DD
    let [yr, mon, day] = dateStr.toString().split('-')
    return new Date(yr, mon-1, day)
  },
  areDatesSame: (d1, d2) => {
    return d1.toDateString() === d2.toDateString()
  },
  getTomorrow: (today) => {
    return new Date(today.getTime()+1000*60*60*24);
  },
  getAllDates: (startDate, duration) => {
    //TODO: Need to add logic here if startDate is greater than endDate, then return. Something's wrong
    //TODO: convert this ugly imperative code to map then a reduce
    let getTomorrow = (today) => {
      return new Date(today.getTime()+1000*60*60*24);
    };
    var curr = startDate
    var arr = []
    for(i=0; i < duration; i++) {
      arr = arr.concat(curr)
      curr = getTomorrow(curr)
    }
    return arr
  },
  getElapsedDates: (startDate, endDate) => {
    //TODO: Need to add logic here if startDate is greater than endDate, then return. Something's wrong
    //TODO: convert this ugly imperative code to map then a reduce

    //TODO: is there a way to not have to copy the getTomorrow and areDatesSane functions into this function?
    let getTomorrow = (today) => {
      return new Date(today.getTime()+1000*60*60*24);
    };
    let areDatesSame = (d1, d2) => {
      return d1.toDateString() === d2.toDateString()
    };
    var start = startDate
    var arr = []
    while(!areDatesSame(start, endDate)) {
      arr = arr.concat(start)
      start = getTomorrow(start)
    }
    return arr
  },
}
export default DateHelper;
