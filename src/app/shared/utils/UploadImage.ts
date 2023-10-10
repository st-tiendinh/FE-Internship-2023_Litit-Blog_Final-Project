import {
  UploadImageService,
  TypeUpload,
} from '../../core/services/uploadImage.service';

export const uploadImage = async (
  typeUpload: TypeUpload,
  imageFile: File | null
) => {
  const uploadImgService = new UploadImageService();
  if (imageFile) {
    const fileName = imageFile.name.split('.').shift() as string;
    const url = await uploadImgService.uploadImage(
      typeUpload,
      fileName,
      'image/jpg',
      imageFile
    );

    return url;
  }
};
