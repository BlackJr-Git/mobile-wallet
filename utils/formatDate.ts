export function formatDateTimeFR(dateString: string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const datePart = date.toLocaleDateString("fr-FR", options);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${datePart} - ${hours}:${minutes}`;
}
