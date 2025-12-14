// 1st task
const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

checkStringLength();
checkStringLength('My custom string', 100);

// 2nd task
const checkIsPalindrome = (string = '') => {
  const formattedString = string.trim().toLocaleLowerCase();
  const reverseString = [...formattedString].reverse().join('');

  return formattedString === reverseString;
};

checkIsPalindrome('madam');
checkIsPalindrome('string');

// 3rd task
const getNumbersFromString = (string = '') => {
  const originalArray = [...string];
  const numbersArray = [];

  originalArray.forEach((item) => {
    if (!isNaN(item)) {
      numbersArray.push(item);
    }
  });

  return Number(numbersArray.join('')) || NaN;
};

getNumbersFromString('1my2string3');
getNumbersFromString('');
getNumbersFromString('строка без чисел');

// 4th task
const checkMeetingByWorkingHours = (startTime, endTime, startMeetingTime, meetingDuration) => {
  const HOURS_IN_DAY = 24;
  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

  const removeZeroFromTime = (item) => {
    let itemWithoutZero = item;
    if (item[0] === '0' && item[1] !== undefined) {
      itemWithoutZero = item[1];
    }
    return +itemWithoutZero;
  };

  const convertTimeInMinutes = (time) => {
    const hoursAndMinutes = time.split(':');
    const hour = removeZeroFromTime(hoursAndMinutes[0]);
    const minute = removeZeroFromTime(hoursAndMinutes[1]);

    return hour * MINUTES_IN_HOUR + minute;
  };

  const starTimeInMinutes = convertTimeInMinutes(startTime);
  const endTimeInMinutes = convertTimeInMinutes(endTime);
  const starMeetingTimeInMinutes = convertTimeInMinutes(startMeetingTime);

  const workDay = endTimeInMinutes - starTimeInMinutes;
  if (workDay < 0) {
    return 'Время окончания дня не может быть раньше времени начала';
  } else if (workDay > MINUTES_IN_DAY) {
    return 'Рабочий день не может длиться больше суток';
  } else if (starMeetingTimeInMinutes < starTimeInMinutes) {
    return 'Митинг не может начаться раньше начала рабочего дня';
  }

  const endOfMeeting = starMeetingTimeInMinutes + meetingDuration;
  if (endOfMeeting <= endTimeInMinutes) {
    return true;
  }
  return false;
};

checkMeetingByWorkingHours('8:0', '10:0', '8:0', 120);
checkMeetingByWorkingHours('08:00', '14:30', '14:00', 90);
checkMeetingByWorkingHours('08:00', '17:30', '14:00', 90);
checkMeetingByWorkingHours('14:00', '17:30', '08:0', 90);
checkMeetingByWorkingHours('8:00', '17:30', '08:00', 900);
