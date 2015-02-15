import defaultFor from 'trailblazer/utils/default-for';

export default function uncapitalize(string) {
  var firstLetter = string.charAt(0);

  if (firstLetter) {
    return firstLetter.toLowerCase() + string.substring(1);
  } else {
    return null;
  }
}
