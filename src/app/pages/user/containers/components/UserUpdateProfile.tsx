import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroup, SelectGroup } from '../../../../shared/components';
import { formatDateToString } from '../../../../shared/utils/formatDate';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  phone: string;
  picture: string;
}

export const UserUpdateProfile = (userInfo: any) => {
  const { email, followers, followings, ...other } = userInfo;
  const newData = {
    ...other,
    dob: userInfo.dob.split('/').reverse().join('-'),
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: newData });

  const [isLoading, setIsLoading] = useState(false);

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="update-profile-wrapper">
      <h4 className="update-profile-title">Update Profile</h4>
      <div className="d-flex update-profile-avatar-group">
        <div className="update-profile-avatar-wrapper">
          <img src={BlankUserImage} className="update-profile-avatar" />
        </div>
        <label
          htmlFor="update-profile-avatar-wrapper"
          className="btn btn-secondary update-profile-upload-label"
        >
          Change image
          <input
            type="file"
            accept="image/*"
            //onChange={handleFileChange}
            className="article-editor-cover-upload"
            name=""
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
          disabled={isLoading}
          type="submit"
        >
          <span className="btn-text">Save Profile Information</span>
        </button>
      </form>
      <p className={`signup-error text-danger text-center`}>
        {/* {!!resError && !isLoading && resError} */}
      </p>
    </div>
  );
};
