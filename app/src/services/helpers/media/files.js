export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        try {
          resolve(fileReader?.result);
        } catch (err) {
          console.warn("Err in convertBase64 func : ", err);
        }
        fileReader.onerror = (error) => {
          reject(error);
        };
      };
    });
  };
  