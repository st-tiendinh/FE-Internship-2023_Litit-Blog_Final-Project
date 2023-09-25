import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputGroup, SelectGroup } from '../../../../shared/components';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import { formatDateToString } from '../../../../shared/utils/formatDate';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { RootState } from '../../../../app.reducers';
import { updateUser } from '../../../../core/auth/auth.actions';
import {
  TypeUpload,
  UploadImageService,
} from '../../../../core/services/uploadImage.service';

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  phone: string;
}

const apiService = new ApiService();
const jwt = new JwtHelper();

export const UserManagement = () => {
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  const user = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    displayName: userInfo.displayName,
    gender: userInfo.gender,
    phone: userInfo.phone,
    dob: userInfo?.dob.split('/').reverse().join('-'),
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: user });

  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<any>(null);

  const isLoading = useSelector(
    (state: RootState) => state.authReducer.isLoading
  );
  const hasError = useSelector(
    (state: RootState) => state.authReducer.hasError
  );
  const error = useSelector((state: RootState) => state.authReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    isImageUrlValid(userInfo?.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidUserImg, userInfo?.picture]);

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  const onSubmit = async (data: FormData) => {
    const url = await handleUploadImage(TypeUpload.AVATAR);
    const newData = { ...data, picture: url };
    dispatch(updateUser(newData));
  };

  useEffect(() => {
    isImageUrlValid(userInfo?.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidUserImg, userInfo?.picture]);

  const handleImage = (file: File | null) => {
    if (file) {
      setImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleImageClick = () => {
    const inputElement = document.querySelector(
      '.avatar-uploader-input'
    ) as HTMLInputElement;

    if (inputElement) {
      inputElement.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    handleImage(file);
  };

  const handleUploadImage = async (typeUpload: TypeUpload) => {
    const uploadImgService = new UploadImageService(apiService, jwt);
    if (imageFile) {
      const fileName = imageFile.name.split('.').shift();
      const url: string = await uploadImgService.uploadImage(
        typeUpload,
        fileName,
        'image/jpg',
        imageFile
      );
      setImageUrl(url);
      return url;
    }
    return imageUrl;
  };

  return (
    <div className="update-profile-wrapper">
      <h4 className="update-profile-title">My Profile</h4>
      <div className="avatar-uploader">
        <form
          className="avatar-uploader-form"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            className="avatar-uploader-input"
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <img
            className="avatar-uploader-image"
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : isValidUserImg
                ? userInfo?.picture
                : BlankUserImage
            }
            alt="User Avatar"
          />
          <div className="avatar-uploader-icon" onClick={handleImageClick}>
            <i className="icon icon-avatar-uploader"></i>
          </div>
        </form>
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
              onBlur={(e: any) => handleTrimInput('gender', e.target.value)}
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
                  value: /^(?:\+|[0-9])[0-9]{9,10}$/,
                  message: 'Phone number must be between 10 and 11 digits.',
                },
              })}
              error={errors.phone?.message}
              onBlur={(e) => handleTrimInput('phone', e.target.value)}
            />
          </div>
        </div>
        <button
          className={`btn btn-primary ${isLoading ? 'loading' : null}`}
          disabled={isLoading}
          type="submit"
        >
          <span className="btn-text">Save Profile Information</span>
        </button>
      </form>
      <p className={`update-profile-error text-danger text-center`}>
        {hasError && !isLoading && error?.response?.data?.errors}
      </p>
    </div>
  );
};
