export const initialExtract = (name: string) => {
  if (!name) {
    return '';
  }
  const parts = name.split(' ');
  return parts.map(part => part.charAt(0)).join('');
}