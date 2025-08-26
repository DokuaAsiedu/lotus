export function getFormattedDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length !== 10 || !cleaned.startsWith("0")) {
    return phone;
  }

  const countryCode = "+233";
  const areaCode = cleaned.substring(1, 3);
  const firstPart = cleaned.substring(3, 6);
  const secondPart = cleaned.substring(6); 

  return `${countryCode} (0)${areaCode} ${firstPart} ${secondPart}`;
}
