import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputGroup } from '../../../../shared/components';
import { Dropdown } from '../../../../shared/components/Dropdown';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import { formatDateToString } from '../../../../shared/utils/formatDate';
import { RootState } from '../../../../app.reducers';
import { updateUser } from '../../../../core/auth/auth.actions';
import {
  TypeUpload,
  UploadImageService,
} from '../../../../core/services/uploadImage.service';
import { ToastTypes } from '../../../../shared/components/Toast';
import { setShowToast } from '../../../../../redux/actions/toast';

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  dob: string;
  phone: string;
}

const UserProfile = () => {
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  const user = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    displayName: userInfo.displayName,
    phone: userInfo.phone,
    dob: userInfo?.dob?.split('/').join('-'),
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: user });

  const [gender, setGender] = useState(userInfo.gender);

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
    try {
      const url = await handleUploadImage(TypeUpload.AVATAR);
      const newData = {
        ...data,
        dob: data.dob.split('-').join('/'),
        gender: gender,
        picture: url,
      };

      dispatch(updateUser(newData));

      dispatch(
        setShowToast({
          type: ToastTypes.SUCCESS,
          title: 'Change successfully!',
          message: 'Your profile have been changed!',
        })
      );
    } catch (error) {
      dispatch(
        setShowToast({
          type: ToastTypes.ERROR,
          title: 'Something went wrong!',
          message: "Can't change your profile now!",
        })
      );
    }
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
    const uploadImgService = new UploadImageService();
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
            <Dropdown
              label="Gender"
              options={Object.values(GenderType)}
              option={gender}
              setOption={setGender}
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
        <div className="d-flex button-wrapper">
          <button
            className={`btn btn-primary ${isLoading ? 'loading' : null}`}
            disabled={isLoading}
            type="submit"
          >
            <span className="btn-text">Save</span>
          </button>
        </div>
      </form>
      <p className={`update-profile-error text-danger text-center`}>
        {hasError && !isLoading && error?.response?.data?.errors}
      </p>
    </div>
  );
};

export default UserProfile;
