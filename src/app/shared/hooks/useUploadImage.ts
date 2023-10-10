import { useEffect, useState } from 'react';
import {
  TypeUpload,
  UploadImageService,
} from '../../core/services/uploadImage.service';

export const useUploadImage = (typeUpload: TypeUpload, imageFile: File) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    (async () => {
      const uploadImgService = new UploadImageService();
      if (imageFile) {
        const fileName = imageFile.name.split('.').shift() as string;
        const url = await uploadImgService.uploadImage(
          typeUpload,
          fileName,
          'image/jpg',
          imageFile
        );
        setImageUrl(url);
      }
    })();
  }, [imageFile, typeUpload]);

  return imageUrl;
};
