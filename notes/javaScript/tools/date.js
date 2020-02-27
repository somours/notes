/*计算某一个月有多少天*/
export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};
/*计算一年多少天*/
export const getDayCountOfYear = function(year) {
  const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  return isLeapYear ? 366 : 365;
};

/*计算某个月的第一天是星期几*/
export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};
