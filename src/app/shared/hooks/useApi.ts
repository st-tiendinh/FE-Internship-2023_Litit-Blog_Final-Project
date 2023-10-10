import { useState } from 'react';
import { ApiService } from '../../core/services/api.service';
import JwtHelper from '../../core/helpers/jwtHelper';

export interface useApiProps {
  url: string | object;
  isNeedToken?: boolean;
  payload?: any;
}

const apiService = new ApiService();
const jwt = new JwtHelper();

export const useApi = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  const getApi = async ({ url, isNeedToken = true }: useApiProps) => {
    try {
      setIsLoading(true);
      isNeedToken && apiService.setHeaders(jwt.getAuthHeader());
      const res: any = await apiService.get([url]);
      setResponse(res);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const postApi = async ({ url, payload }: useApiProps) => {
    try {
      setIsLoading(true);
      apiService.setHeaders(jwt.getAuthHeader());
      const res: any = await apiService.post([url], payload);
      setResponse(res);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const putApi = async ({ url, payload }: useApiProps) => {
    try {
      setIsLoading(true);
      apiService.setHeaders(jwt.getAuthHeader());
      const res: any = await apiService.put([url], payload);
      setResponse(res);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, getApi, postApi, putApi };
};
