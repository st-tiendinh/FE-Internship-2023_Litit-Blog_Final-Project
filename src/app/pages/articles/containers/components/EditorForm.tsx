import DOMPurify from 'dompurify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from '../../../../shared/hooks/useApi';

import TogglePreview from '../../../../shared/components/TogglePreview';
import EditorFormAction from './EditorFormAction';
import EditorTextArea from './EditorTextArea';
import ArticleContent from './ArticleContent';
import { TagInput } from './EditorTagInput';
import DropZone from './DropZone';
import CkEditor from './CkEditor';

import { PostStatus } from '../../../../shared/components/PostList';
import { uploadImage } from '../../../../shared/utils/UploadImage';
import { TypeUpload } from '../../../../core/services/uploadImage.service';
import { ENDPOINT } from '../../../../../config/endpoint';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app.reducers';

export enum PostAction {
  CREATE = 'create',
  UPDATE = 'update',
}

export type Inputs = {
  title: string;
  description: string;
  content: string;
};

interface EditorFormProps {
  type: PostAction;
  postData: any;
  setPostData: (postData: any) => void;
}

function EditorForm({ type, postData, setPostData }: EditorFormProps) {
  const [tagList, setTagList] = useState<string[]>(
    type === PostAction.UPDATE ? postData.tags : []
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<PostStatus>(
    type === PostAction.CREATE ? PostStatus.PUBLIC : postData.status
  );
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);

  const { isLoading, error, postApi } = useApi();
  const navigate = useNavigate();
  const clean = DOMPurify.sanitize(postData?.content);
  const formRef = useRef<HTMLFormElement>(null);
  const currentUserId = useSelector(
    (state: RootState) => state.authReducer.userInfo?.id
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  });

  const handlePreview = useCallback(() => {
    setPostData({
      ...postData,
      tags: [...tagList],
      cover: imageFile ? URL.createObjectURL(imageFile as any) : postData.cover,
      status,
      title: postData.title || watch('title'),
      description: postData.description || watch('description'),
      content: postData.content || watch('content'),
    });
  }, [imageFile, postData, setPostData, status, tagList, watch]);

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      const imageUrl = await uploadImage(TypeUpload.COVER_POST, imageFile);
      const formData = {
        url: `${ENDPOINT.posts.index}`,
        payload: {
          ...data,
          tags: [...tagList],
          cover: imageUrl.toString(),
          status,
        },
      };
      postApi(formData);
      navigate(`/users/${currentUserId}`);
    } catch (error) {
      console.log(error);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    register('content', {
      required: 'content is required',
      minLength: {
        value: 100,
        message: 'content length must be at least 100 characters long',
      },
    });
  });

  useEffect(() => {
    error && window.scrollTo(0, 0);
  }, [error]);

  return (
    <div className="article-editor">
      <div className="editor-header">
        <TogglePreview
          isShowPreview={isShowPreview}
          setIsShowPreview={setIsShowPreview}
          handlePreview={handlePreview}
        />
      </div>
      {!!error && (
        <div className="article-editor-error-wrapper">
          <h3 className="article-editor-error-title">
            Whoops, something went wrong:
          </h3>
          <p className="article-editor-error-message">
            {error.response.data.errors[0]}
          </p>
        </div>
      )}

      <div className={`article-editor-input${isShowPreview ? ' d-none' : ''}`}>
        <TagInput tagList={tagList} setTagList={setTagList} />

        <DropZone
          type={type}
          setImageFile={setImageFile}
          imageSrc={type === PostAction.UPDATE ? postData.cover : ''}
        />
      </div>
      <form
        ref={formRef}
        className="article-editor-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`article-editor-input${isShowPreview ? ' d-none' : ''}`}
        >
          <EditorTextArea
            postData={postData}
            setPostData={setPostData}
            errors={errors}
            type={type}
            placeholder={'Enter post title...'}
            {...register('title', {
              required: 'title is required',
              minLength: {
                value: 20,
                message: 'title length must be at least 20 characters long',
              },
            })}
          />
          <EditorTextArea
            postData={postData}
            setPostData={setPostData}
            errors={errors}
            type={type}
            placeholder={'Enter post description...'}
            {...register('description', {
              required: 'description is required',
              minLength: {
                value: 20,
                message:
                  'description length must be at least 20 characters long',
              },
            })}
          />
          <CkEditor
            type={type}
            errors={errors}
            postData={postData}
            setPostData={setPostData}
            setValue={setValue}
          />
        </div>
        <div className={`article-content${isShowPreview ? '' : ' d-none'}`}>
          <ArticleContent postData={postData} cleanContent={clean} />
        </div>

        <EditorFormAction
          type={type}
          postData={postData}
          isPostLoading={isLoading}
          status={status}
          isDirty={isDirty}
          tagList={tagList}
          imageFile={imageFile}
          setStatus={setStatus}
          getValues={getValues}
        />
      </form>
    </div>
  );
}

export default React.memo(EditorForm);
