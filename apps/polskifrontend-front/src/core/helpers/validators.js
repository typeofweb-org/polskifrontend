export function isUrlValid(url) {
  const pattern = /^((ftp|http|https):\/\/)?(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return pattern.test(url);
}

export function isRequired(value) {
  return value.length > 3;
}
