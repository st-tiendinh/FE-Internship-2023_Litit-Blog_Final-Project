import axios from 'axios';
import { ENDPOINT } from '../../../config/endpoint';
import JwtHelper from '../helpers/jwtHelper';
import { ApiService } from './api.service';

export enum TypeUpload {
  AVATAR = 'avatar',
  COVER_POST = 'cover-post',
  CONTENT_POST = 'content-post',
}

export interface UploadImageProps {
  uploadImage: (
    typeUpload: string,
    fileName: string,
    fileType: string,
    image: File
  ) => any;
}

export class UploadImageService implements UploadImageProps {
  async uploadImage(
    typeUpload: string,
    fileName: string,
    fileType: string,
    imageFile: File
  ): Promise<any> {
    try {
      const jwt = new JwtHelper();
      const apiService = new ApiService();
      apiService.setHeaders(jwt.getAuthHeader());
      const params = `?type_upload=${typeUpload}&file_name=${fileName}&file_type=${fileType}}`;
      const res: any = await apiService.get([
        ENDPOINT.signatures.index,
        `${params}`,
      ]);
      await axios.put(res.signedRequest, imageFile);
      return res.url;
    } catch (error) {
      console.error(error);
    }
  }
}
