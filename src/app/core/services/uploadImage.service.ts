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
  apiService: ApiService;
  jwt: JwtHelper;
  uploadImage: (
    typeUpload: string,
    fileName: string,
    fileType: string,
    image: File
  ) => any;
}

export class UploadImageService implements UploadImageProps {
  apiService: ApiService;
  jwt: JwtHelper;

  constructor(apiService: ApiService, jwt: JwtHelper) {
    this.apiService = apiService;
    this.jwt = jwt;
  }

  async uploadImage(
    typeUpload: string,
    fileName: string,
    fileType: string,
    imageFile: File
  ): Promise<any> {
    try {
      this.apiService.setHeaders(this.jwt.getAuthHeader());
      const params = `?type_upload=${typeUpload}&file_name=${fileName}&file_type=${fileType}}`;
      const res: any = await this.apiService.get([
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
