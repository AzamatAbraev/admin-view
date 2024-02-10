function dateTimeFormatter(timestamp: string): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const normalDate = date.toLocaleString("en-US", options);

  return normalDate;
}

export default dateTimeFormatter;
