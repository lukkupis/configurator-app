export default function saveBase64AsFile(base64, fileName) {
  var link = document.createElement('a');

  link.setAttribute('href', base64);
  link.setAttribute('download', fileName);
  link.style.display = 'none';
  document.querySelector('body').appendChild(link);
  link.click();
  link.remove();
}
