export const trimText = (text: string, length: number = 100) => {
  return text.length > length ? text.substring(0, length - 3) + "..." : text;
};
