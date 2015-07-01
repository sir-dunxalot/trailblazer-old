export default function uncapitalize(string = '') {
  const firstLetter = string.charAt(0);

  if (firstLetter) {
    return firstLetter.toLowerCase() + string.substring(1);
  } else {
    return null;
  }
}
