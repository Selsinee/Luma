export default function capitalizeFirstLetter(string: string) {
  if (typeof string !== 'string' || string.length === 0) {
    return ''; // Handle empty or non-string inputs
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
