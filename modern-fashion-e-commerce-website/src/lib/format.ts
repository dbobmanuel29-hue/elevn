export function formatNaira(value: number): string {
  const rounded = Math.round(value);
  return `₦${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function formatPrice(value: number): string {
  return formatNaira(value);
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export const SHIPPING_THRESHOLD = 150000;
export const SHIPPING_FLAT_RATE = 4500;
