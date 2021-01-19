import ImageFile from '../interfaces/imageFile';

const readImageFromFile = async (file: File): Promise<ImageFile> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      const image: ImageFile = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: reader.result as string,
        file: file,
      };
      image.base64 = image.base64.split('base64,')[1];
      resolve(image);
    };
  });
  // Convert the file to base64 text
};

export default readImageFromFile;
