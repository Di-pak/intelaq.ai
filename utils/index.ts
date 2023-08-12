// export function fileToDataURL(file: File, callback: (result: any) => void) {
//   const reader = new FileReader();
//   reader.onloadend = function () {
//     const base64Url = reader.result;
//     if (base64Url) {
//       callback(base64Url.toString());
//     }
//   };
//   reader.readAsDataURL(file);
// }

export async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64Url = reader.result;
      if (base64Url) {
        resolve(base64Url.toString());
      } else {
        reject(new Error("Failed to read file."));
      }
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
