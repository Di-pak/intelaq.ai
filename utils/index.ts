export function fileToDataURL(file: File, callback: (result: any) => void) {
  const reader = new FileReader();
  reader.onloadend = function () {
    const base64Url = reader.result;
    if (base64Url) {
      callback(base64Url.toString());
    }
  };
  reader.readAsDataURL(file);
}
