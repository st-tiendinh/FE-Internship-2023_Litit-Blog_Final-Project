import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { InputGroup, SelectGroup } from '../../../../shared/components';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';

import { formatDateToString } from '../../../../shared/utils/formatDate';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { KEYS, setLS } from '../../../../core/helpers/storageHelper';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';

const apiService = new ApiService();
const jwt = new JwtHelper();

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  phone: string;
}

export const UserUpdateProfile = (userInfo: any) => {
  const user = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    displayName: userInfo.displayName,
    gender: userInfo.gender,
    phone: userInfo.phone,
    dob: userInfo.dob.split('/').reverse().join('-'),
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: user });

  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileExtension, setFileExtension] = useState<string | 0 | undefined>(
    undefined
  );
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [nameImage, setNameImage] = useState<string | undefined>(undefined);

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  const onSubmit = async (data: FormData) => {
    const newData = { ...data, picture: imageUrl };
    try {
      apiService.setHeaders(jwt.getAuthHeader());
      const res: any = await apiService.put([ENDPOINT.users.me], newData);
      setLS(KEYS.USER_INFO, res);
      setIsLoading(false);
      location.reload();
    } catch (error: any) {
      setError(error?.response?.data?.errors);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isImageUrlValid(userInfo?.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isImageUrlValid, userInfo?.picture]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const filenameParts = file?.name.split('.');
      const getExtension = filenameParts?.length && filenameParts.pop();
      setFileExtension(getExtension);
      const firstElement = filenameParts?.shift();
      setNameImage(firstElement);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (nameImage && fileExtension) {
        setIsUploadLoading(true);
        try {
          apiService.setHeaders(jwt.getAuthHeader());
          const uploadType = 'avatar';
          const params = `?type_upload=${uploadType}&file_name=${nameImage}&file_type=image/png}`;
          const res: any = await apiService.get([
            ENDPOINT.signatures.index,
            `${params}`,
          ]);
          if (res && res.url && res.signedRequest) {
            await axios
              .put(res.signedRequest, imageFile)
              .then((err) => console.log(err));
            setImageUrl(res.url);
          } else {
            console.error('Invalid response from API:', res);
          }
          setIsUploadLoading(false);
        } catch (error) {
          console.error('Error in API call:', error);
          setIsUploadLoading(false);
        }
      }
    };
    getImage();
  }, [imageFile]);

  return (
    <div className="update-profile-wrapper">
      <h4 className="update-profile-title">My Profile</h4>
      <div className="d-flex update-profile-avatar-group">
        <div className="update-profile-avatar-wrapper">
          <img
            src={
              imageUrl
                ? imageUrl
                : isValidUserImg
                ? userInfo?.picture
                : BlankUserImage
            }
            className="update-profile-avatar"
          />
        </div>
        <label
          htmlFor="article-editor-cover-upload"
          aria-disabled={isUploadLoading}
          className={`btn btn-secondary ${
            isUploadLoading ? 'loading' : null
          } update-profile-upload-label`}
        >
          <span className="btn-text">Change image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="article-editor-cover-upload"
            name="image"
            id="article-editor-cover-upload"
          />
        </label>
      </div>
      <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col col-12">
            <InputGroup
              label="Email*"
              readOnly
              id="email"
              type="text"
              defaultValue={userInfo.email}
            />
          </div>
          <div className="col col-12">
            <InputGroup
              label="First Name*"
              id="first-name"
              {...register('firstName', {
                required: 'First name is required!',
              })}
              error={errors.firstName?.message}
              onBlur={(e) => handleTrimInput('firstName', e.target.value)}
            />
          </div>
          <div className="col col-12">
            <InputGroup
              label="Last Name*"
              id="last-name"
              {...register('lastName', {
                required: 'Last name is required!',
              })}
              error={errors.lastName?.message}
              onBlur={(e) => handleTrimInput('lastName', e.target.value)}
            />
          </div>
          <div className="col col-12">
            <InputGroup
              label="Display Name*"
              id="display-name"
              {...register('displayName', {
                required: 'Display name is required!',
                minLength: {
                  value: 6,
                  message: 'Display name must be at least 6 characters!',
                },
              })}
              error={errors.displayName?.message}
              onBlur={(e) => handleTrimInput('displayName', e.target.value)}
            />
          </div>
          <div className="col col-12">
            <SelectGroup
              label="Gender*"
              id="gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              {...register('gender', {
                required: 'Gender is required!',
              })}
              error={errors.gender?.message}
              onBlur={(e) => handleTrimInput('gender', e.target.value)}
            />
          </div>
          <div className="col col-12">
            <InputGroup
              label="Date of Birth*"
              type="date"
              max={formatDateToString(new Date())}
              id="dob"
              {...register('dob', {
                required: 'Date of Birth is required!',
              })}
              error={errors.dob?.message}
              onBlur={(e) => {
                handleTrimInput('dob', e.target.value);
              }}
            />
          </div>
          <div className="col col-12">
            <InputGroup
              label="Phone*"
              type="text"
              id="phone"
              {...register('phone', {
                required: 'Phone is required!',
                pattern: {
                  value: /^[0-9]\d*$/,
                  message: 'Phone must be number!',
                },
              })}
              error={errors.phone?.message}
              onBlur={(e) => handleTrimInput('phone', e.target.value)}
            />
          </div>
        </div>
        <button
          className={`btn btn-primary ${isLoading ? 'loading' : null}`}
          disabled={isUploadLoading || isLoading}
          type="submit"
        >
          <span className="btn-text">Save Profile Information</span>
        </button>
      </form>
      <p className={`update-profile-error text-danger text-center`}>
        {!!error && !isLoading && error}
      </p>
    </div>
  );
};
