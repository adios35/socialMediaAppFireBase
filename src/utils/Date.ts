export function convertUnixTimestamp(unixTimestamp) {
  const dateObj = new Date(unixTimestamp);
  const day = addLeadingZero(dateObj.getDate());
  const month = getMonthName(dateObj.getMonth());
  const hours = addLeadingZero(dateObj.getHours() % 12 || 12);
  const minutes = addLeadingZero(dateObj.getMinutes());
  const ampm = dateObj.getHours() < 12 ? "AM" : "PM";
  return `${day} ${month} ${hours}:${minutes} ${ampm}`;
}
function addLeadingZero(num) {
  return num.toString().padStart(2, "0");
}
function getMonthName(month) {
  const monthNames = [
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
  return monthNames[month];s
}
export function timeAgo(timestamp) {
  // Convert timestamp to seconds and calculate elapsed time
  var elapsed_time = (Date.now() - timestamp) / 1000;

  // Convert elapsed time to hours and format as string
  var hours = Math.floor(elapsed_time / 3600);
  if (hours === 1) {
    return "1 hour ago";
  } else if (hours > 1) {
    return hours + " hours ago";
  }

  // Convert elapsed time to minutes and format as string
  var minutes = Math.floor(elapsed_time / 60);
  if (minutes === 1) {
    return "1 minute ago";
  } else if (minutes > 1) {
    return minutes + " minutes ago";
  }

  // If less than a minute has elapsed, return "just now"
  return "just now";
}
