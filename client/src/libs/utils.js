export function formatMessageTime(date) {
  if (!date) {
    console.warn("No date provided to formatMessageTime");
    return "";
  }
  try {
    return new Date(date).toLocaleTimeString("en-In", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (error) {
    console.error("Error formatting time: ", error, "Date: ", date);
    return " ";
  }
}
