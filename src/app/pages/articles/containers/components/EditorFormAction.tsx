import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import { PostAction } from './EditorForm';
import ToggleButton from '../../../../shared/components/ToggleButton';

import { ModalType } from '../../../../shared/components/Modal';
import { uploadImage } from '../../../../shared/utils/UploadImage';
import { PostStatus } from '../../../../shared/components/PostList';
import { TypeUpload } from '../../../../core/services/uploadImage.service';
import { useApi } from '../../../../shared/hooks/useApi';
import { ENDPOINT } from '../../../../../config/endpoint';
import { setShowModal } from '../../../../../redux/actions/modal';
import history from '../../../../core/modules/custom-router-dom/history';
import { PostItemWithIdProps } from '../../../../core/models/post';
import { RootState } from '../../../../app.reducers';

interface EditorFormActionProps {
  type: PostAction;
  postData: PostItemWithIdProps;
  isPostLoading: boolean;
  status: PostStatus;
  isDirty: boolean;
  tagList: string[];
  imageFile: File | null;
  getValues: any;
  setStatus: (status: PostStatus) => void;
}

const EditorFormAction = ({
  type,
  postData,
  isPostLoading,
  isDirty,
  imageFile,
  status,
  tagList,
  getValues,
  setStatus,
}: EditorFormActionProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserId = useSelector(
    (state: RootState) => state.authReducer.userInfo?.id
  );

  const { isLoading, postApi, putApi } = useApi();

  const handleSaveDraft = async () => {
    try {
      const imageUrl = await uploadImage(TypeUpload.COVER_POST, imageFile);
      const draftData = {
        url: `${ENDPOINT.posts.draft}`,
        payload: {
          ...getValues(),
          status,
          cover: imageUrl,
          tags: tagList,
        },
      };
      postApi(draftData);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e: any) => {
    try {
      e.preventDefault();
      const imageUrl = await uploadImage(TypeUpload.COVER_POST, imageFile);
      const updateData = {
        url: `${ENDPOINT.posts.index}/${postData.id}`,
        payload: {
          title: postData.title,
          description: postData.description,
          content: postData.content,
          cover: imageUrl || postData.cover,
          status,
          tags: tagList,
        },
      };
      putApi(updateData);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublishDraft = async (e: any) => {
    try {
      e.preventDefault();
      const imageUrl = await uploadImage(TypeUpload.COVER_POST, imageFile);
      const publishData = {
        url: `${ENDPOINT.posts.index}`,
        payload: {
          title: postData.title,
          description: postData.description,
          content: postData.content,
          cover: imageUrl || postData.cover,
          status: PostStatus.PUBLIC,
          tags: tagList,
        },
      };
      postApi(publishData);
      navigate(`/users/${currentUserId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let unblock: any;
    if (
      type === PostAction.CREATE &&
      Boolean(isDirty || tagList.length || imageFile)
    ) {
      unblock = history.block((tx: any) => {
        const confirmFunc = () => {
          handleSaveDraft();
          unblock();
          tx.retry();
        };
        const cancelFunc = () => {
          unblock();
          tx.retry();
        };
        dispatch(
          setShowModal({
            type: ModalType.INFO,
            message: `Would you like to save a draft?`,
            onConfirm: confirmFunc,
            onCancel: cancelFunc,
          })
        );
      });
    }

    return () => {
      if (typeof unblock === 'function') {
        unblock();
      }
    };
  }, [isDirty, tagList.length, imageFile]);

  return (
    <div className="article-editor-form-action">
      <div className="article-editor-post-status">
        {type === PostAction.UPDATE && status !== PostStatus.DRAFT && (
          <ToggleButton setStatus={setStatus} />
        )}
      </div>
      <div className="article-editor-form-save-button-wrapper">
        {type === PostAction.CREATE &&
          Boolean(isDirty || tagList.length || imageFile) && (
            <button
              className={`btn btn-default ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              onClick={(e: any) => {
                e.preventDefault();
                handleSaveDraft();
              }}
            >
              Save As Draft
            </button>
          )}
        {type === PostAction.UPDATE && status === PostStatus.DRAFT && (
          <button
            className={`btn btn-default ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            onClick={handleUpdate}
          >
            Update Draft
          </button>
        )}
        {(type === PostAction.CREATE || status === PostStatus.DRAFT) && (
          <button
            className={`btn btn-primary ${isPostLoading ? 'loading' : ''}`}
            disabled={isPostLoading}
            type="submit"
            onClick={handlePublishDraft}
          >
            Publish
          </button>
        )}
        {type === PostAction.UPDATE && status !== PostStatus.DRAFT && (
          <button
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            onClick={handleUpdate}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(EditorFormAction);
