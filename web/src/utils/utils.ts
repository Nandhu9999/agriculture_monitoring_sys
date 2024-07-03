export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
