export const capitalize = (s: string): string => {
  if (!s || s.length === 0) {
    return s;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
