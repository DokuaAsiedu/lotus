type Options = {
  monthFirst?: boolean,
  separator?: string,
}

export function getFormattedDate(date: Date, options = <Options>{}) {
  const { monthFirst, separator = "/" } = options
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formatted = monthFirst ? `${month}${separator}${day}${separator}${year}` : `${day}${separator}${month}${separator}${year}`

  return formatted;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  const countryCode = "+233";
  const areaCode = cleaned.substring(1, 3);
  const firstPart = cleaned.substring(3, 6);
  const secondPart = cleaned.substring(6); 

  return `${countryCode} (0)${areaCode} ${firstPart} ${secondPart}`;
}

export function formatDateString(date: string) {
  const [year, month, day] = date.split("-")
  const formatted = `${month}/${day}/${year}`

  return formatted
}

export function formatMonthFirstDateString(date: string) {
  const [month, day, year] = date.split("/")
  const formatted = `${day}/${month}/${year}`

  return formatted
}

export function getTime(dateString: string) {
  const date = new Date(dateString)

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
}

export function getValueFromCurrency(value: string) {
  const [, amountStr] = value.split(" ")
  const amount = parseFloat(amountStr.replace(/,/g, "")) || 0

  return amount
}
