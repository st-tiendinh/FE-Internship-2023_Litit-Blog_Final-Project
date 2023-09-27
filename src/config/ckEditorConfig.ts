import axios from 'axios';
import JwtHelper from '../app/core/helpers/jwtHelper';
import { ApiService } from '../app/core/services/api.service';
import { ENDPOINT } from './endpoint';

const apiService = new ApiService();
const jwt = new JwtHelper();

export function uploadAdapter(loader: any) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        let signUrl: any;
        let imgUrl: any;
        loader.file.then((file: any) => {
          const filenameParts = file?.name.split('.');
          const firstNameElement = filenameParts?.shift();
          const params = `?type_upload=content-post&file_name=${firstNameElement}&file_type=image/png}`;
          apiService.setHeaders(jwt.getAuthHeader());
          apiService
            .get([ENDPOINT.signatures.index, `${params}`])
            .then((res: any) => {
              signUrl = res.signedRequest;
              imgUrl = res.url;
            })
            .then(() =>
              axios.put(signUrl, file).then((err) => console.log(err))
            )
            .then(() => resolve({ default: imgUrl }))
            .catch((err) => reject(err));
        });
      });
    },
  };
}

export function uploadPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return uploadAdapter(loader);
  };
}
