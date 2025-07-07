export function lettersToHexColor(letter1: string, letter2?: string): string {
  // Validate input
  if (!letter1 || typeof letter1 !== 'string') {
    throw new Error('First letter must be a valid string');
  }

  // Normalize letters to uppercase and get first character
  const l1 = letter1.toUpperCase().charAt(0);
  const l2 = (letter2 || letter1).toUpperCase().charAt(0); // Fallback to letter1 if letter2 missing

  // Get position in alphabet (A=1, B=2, ..., Z=26)
  const code1 = l1.charCodeAt(0) - 64;
  const code2 = l2.charCodeAt(0) - 64;

  // Ensure codes are within valid range (1-26)
  const validCode1 = Math.max(1, Math.min(26, code1));
  const validCode2 = Math.max(1, Math.min(26, code2));

  // Calculate RGB components with different multipliers for variety
  const red = Math.floor((validCode1 * 10) % 256);
  const green = Math.floor((validCode2 * 7) % 256); // Different multiplier than red
  const blue = Math.floor(((validCode1 + validCode2) * 5) % 256);

  // Convert to 2-digit hex and pad with zero if needed
  const toHex = (value: number) => value.toString(16).padStart(2, '0');

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
}

