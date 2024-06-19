export function convert(mon: string) {
  let month;
  if (mon == "01") {
    month = "Jan";
  } else if (mon == "02") {
    month = "Feb";
  } else if (mon == "03") {
    month = "March";
  } else if (mon == "04") {
    month = "April";
  } else if (mon == "05") {
    month = "May";
  } else if (mon == "06") {
    month = "June";
  } else if (mon == "07") {
    month = "July";
  } else if (mon == "08") {
    month = "Aug";
  } else if (mon == "09") {
    month = "Sept";
  } else if (mon == "10") {
    month = "Oct";
  } else if (mon == "11") {
    month = "Nov";
  } else {
    month = "Dec";
  }
  return month;
}
