import addZeroToDigit from "./addZeroToDigit";

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const makeDateDaysAfter = (days) => {
  if (!days) return null;

  const dateInMilli = new Date().getTime();

  const givenDaysInMilli = days * 24 * 60 * 60 * 1000;

  const finalDateInMilli = dateInMilli + givenDaysInMilli;

  const finalDate = new Date(finalDateInMilli);

  const date = finalDate.getDate();
  const month = finalDate.getMonth();
  const year = finalDate.getFullYear();

  return `${addZeroToDigit(date)} ${monthsList[month]} ${year}`;
};

export default makeDateDaysAfter;
