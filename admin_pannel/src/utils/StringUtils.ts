export function randomString(length?: number) {
  if (!length) length = 6;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const random = Math.ceil(Math.random() * 122);
    randomString = randomString.concat(
      String.fromCharCode(random > 65 ? random : random + 65)
    );
  }
  return randomString;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
