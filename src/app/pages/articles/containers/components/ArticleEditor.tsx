import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPlugin } from '../../../../../config/ckEditorConfig';
import history from '../../../../core/modules/custom-router-dom/history';

import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { PostStatus } from '../../../../shared/components/PostList';
import BlankPostImg from '../../../../../assets/images/blank-post.png';
import {
  TypeUpload,
  UploadImageService,
} from '../../../../core/services/uploadImage.service';
import { setShowToast } from '../../../../../redux/actions/toast';
import { setShowModal } from '../../../../../redux/actions/modal';

import { ModalType } from '../../../../shared/components/Modal';
import { ToastTypes } from '../../../../shared/components/Toast';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import { ToggleButton } from '../../../../shared/components';
import { RootState } from '../../../../app.reducers';

const apiService = new ApiService();
const jwt = new JwtHelper();

export enum PostAction {
  CREATE = 'create',
  UPDATE = 'update',
}

interface ArticleEditorProps {
  type: PostAction;
  data?: any;
  setArticleData: any;
}

export const ArticleEditor = ({
  type,
  data,
  setArticleData,
}: ArticleEditorProps) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaveDraftLoading, setIsSaveDraftLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const [titleInput, setTitleInput] = useState<string>(
    type === PostAction.UPDATE ? data.title : ''
  );
  const [titleValue, setTitleValue] = useState<string>(
    type === PostAction.UPDATE ? data.title : ''
  );
  const [descInput, setDescInput] = useState<string>(
    type === PostAction.UPDATE ? data.description : ''
  );
  const [descValue, setDescValue] = useState<string>(
    type === PostAction.UPDATE ? data.description : ''
  );
  const [tagItems, setTagItems] = useState<string[]>(
    type === PostAction.UPDATE ? data.tags : []
  );
  const [tagItemValue, SetTagItemValue] = useState('');
  const [contentValue, setContentValue] = useState<string>(
    type === PostAction.UPDATE ? data.content : ''
  );
  const [contentInput, setContentInput] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(
    type === PostAction.UPDATE
      ? data.status === PostStatus.PUBLIC
        ? true
        : false
      : true
  );
  const [isDraft, setIsDraft] = useState<boolean>(
    type === PostAction.UPDATE
      ? data.status === PostStatus.DRAFT
        ? true
        : false
      : false
  );
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    type === PostAction.UPDATE ? data.cover : undefined
  );

  const [imageFile, setImageFile] = useState<any>(null);
  const [isValidCover, setIsValidCover] = useState(false);
  const [body, setBody] = useState<any>({});

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const tagInputRef = useRef<any>(null);
  const titleInputRef = useRef<any>(null);
  const descInputRef = useRef<any>(null);
  const currentUserId = useSelector(
    (state: RootState) => state.authReducer.userInfo?.id
  );
  const [isPublish, setIsPublish] = useState<boolean>(false);

  useEffect(() => {
    if (type === PostAction.UPDATE) {
      isImageUrlValid(data.cover).then((isValid) => {
        isValid ? setIsValidCover(true) : setIsValidCover(false);
      });
    }
  }, [isValidCover, data?.cover]);

  const handleImage = (file: File | null) => {
    if (file) {
      setImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    handleImage(file);
    setUnsavedChanges(true);
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleChangeTitle = () => {
    setTitleInput(titleInputRef.current.value);
    setUnsavedChanges(true);
  };

  const handleChangeDesc = () => {
    setDescInput(descInputRef.current.value);
    setUnsavedChanges(true);
  };

  const handleSubmitTitle = () => {
    if (titleInputRef.current.value.trim()) {
      setTitleValue(titleInputRef.current.value.trim());
    }
  };

  const handleSubmitDesc = () => {
    if (descInputRef.current.value.trim()) {
      setDescValue(descInputRef.current.value.trim());
    }
  };

  const handleTagChange = () => {
    SetTagItemValue(tagInputRef.current.value);
    setUnsavedChanges(true);
  };

  const handleTagBlur = () => {
    if (tagInputRef.current.value.trim()) {
      const isContain = tagItems.includes(tagInputRef.current.value.trim());
      if (isContain) {
        dispatch(
          setShowToast({
            type: ToastTypes.ERROR,
            title: 'Tag error',
            message: 'Tag already exists',
          })
        );
      } else {
        setTagItems((prev) => [...prev, tagInputRef.current.value.trim()]);
        SetTagItemValue('');
      }
    }
  };

  const handleTagEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleTagBlur();
    }
  };

  const handleDeleteTagItem = (id: number) => {
    setTagItems(
      tagItems.filter((_, index) => {
        return index !== id;
      })
    );
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
      setUnsavedChanges(true);
      return url;
    }
    return imageUrl;
  };

  const handleSubmitData = () => {
    (async () => {
      try {
        setIsPublish(true);
        setUnsavedChanges(false);
        setIsLoading(true);
        const url = await handleUploadImage(TypeUpload.COVER_POST);
        const postData = {
          title: titleValue,
          cover: url,
          content: contentValue,
          status:
            isPublic || data.status === PostStatus.DRAFT
              ? PostStatus.PUBLIC
              : PostStatus.PRIVATE,
          description: descValue,
          tags: tagItems,
        };
        apiService.setHeaders(jwt.getAuthHeader());
        await apiService.post([ENDPOINT.posts.index], postData);
        setIsLoading(false);
        navigate(`/users/${currentUserId}`);
      } catch (error: any) {
        setError(error.response.data.errors[0]);
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    })();
  };

  const handleUpdateData = () => {
    (async () => {
      try {
        setIsUpdateLoading(true);
        const url = await handleUploadImage(TypeUpload.COVER_POST);
        const postUpdated = {
          title: titleValue,
          cover: url,
          content: contentValue,
          status: isPublic
            ? PostStatus.PUBLIC
            : data.status === PostStatus.PRIVATE
            ? PostStatus.PRIVATE
            : PostStatus.DRAFT,
          description: descValue,
          tags: tagItems,
        };
        apiService.setHeaders(jwt.getAuthHeader());
        await apiService.put(
          [ENDPOINT.posts.index, `${location.pathname.split('/').pop()}`],
          postUpdated
        );
        setIsUpdateLoading(false);
        navigate(-1);
      } catch (error) {
        setIsUpdateLoading(false);
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    const coverUrl = imageFile ? URL.createObjectURL(imageFile) : imageUrl;
    const body = {
      title: titleValue || '',
      cover: coverUrl || '',
      content: contentValue || '',
      status: isPublic
        ? PostStatus.PUBLIC
        : isDraft
        ? PostStatus.DRAFT
        : PostStatus.PRIVATE,
      description: descValue || '',
      tags: tagItems || '',
    };
    setBody(body);
    setArticleData(body);
  }, [
    titleValue,
    titleInput,
    descValue,
    descInput,
    isPublic,
    isDraft,
    imageUrl,
    imageFile,
    tagItems,
    tagItemValue,
    contentValue,
    setArticleData,
    data?.status,
  ]);

  const handleSaveDraft = () => {
    (async () => {
      try {
        setIsDraft(true);
        setIsSaveDraftLoading(true);
        apiService.setHeaders(jwt.getAuthHeader());
        await apiService.post([ENDPOINT.posts.draft], body);
        setIsSaveDraftLoading(false);
        setUnsavedChanges(false);
      } catch (error) {
        console.log(error);
        setIsSaveDraftLoading(false);
        setUnsavedChanges(false);
      }
    })();
  };

  useEffect(() => {
    let unblock: any;
    if (unsavedChanges && type === PostAction.CREATE && !isPublish) {
      unblock = history.block((tx: any) => {
        const confirmFunc = () => {
          handleSaveDraft();
          unblock();
          tx.retry();
        };
        const cancelFunc = () => {
          setUnsavedChanges(false);
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
  }, [body]);

  useEffect(() => {
    if (
      !titleInput &&
      !descInput &&
      !imageFile &&
      !contentInput &&
      !tagItems.length &&
      !tagItemValue
    ) {
      setUnsavedChanges(false);
    }
  }, [
    contentInput,
    descInput,
    imageFile,
    tagItemValue,
    tagItems.length,
    titleInput,
  ]);

  const onSaveDraft = () => {
    handleSaveDraft;
    navigate('/settings/drafts');
  };

  return (
    <div className="article-editor">
      {!!error && (
        <div className="article-editor-error-wrapper">
          <h3 className="article-editor-error-title">
            Whoops, something went wrong:
          </h3>
          <p className="article-editor-error-message">{error}</p>
        </div>
      )}
      <div className="article-editor-form">
        <div
          className="article-editor-drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            className="article-editor-upload-input"
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleInputChange}
          />
          {type === PostAction.CREATE
            ? (!!imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded"
                  className="article-editor-image"
                  onClick={handleImageClick}
                />
              )) || (
                <div
                  className="article-editor-drop-zone-wrapper"
                  onClick={handleImageClick}
                >
                  <i className="icon icon-cover-uploader"></i>
                  <h4 className="article-editor-drop-zone-title">
                    DROP FILE HERE
                  </h4>
                  <p className="article-editor-drop-zone-text">
                    Drag and drop photo here or click to select photo
                  </p>
                </div>
              )
            : ''}
          {type === PostAction.UPDATE
            ? (!!imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded"
                  className="article-editor-image"
                  onClick={handleImageClick}
                />
              )) ||
              (!!imageUrl && (
                <img
                  src={isValidCover ? imageUrl : BlankPostImg}
                  alt="Uploaded"
                  className="article-editor-image"
                  onClick={handleImageClick}
                />
              )) || (
                <div
                  className="article-editor-drop-zone-wrapper"
                  onClick={handleImageClick}
                >
                  <i className="icon icon-cover-uploader"></i>
                  <h4 className="article-editor-drop-zone-title">
                    DROP FILE HERE
                  </h4>
                  <p className="article-editor-drop-zone-text">
                    Drag and drop photo here or click to select photo
                  </p>
                </div>
              )
            : ''}
        </div>

        <textarea
          className="article-editor-title-input"
          value={titleInput}
          placeholder="New post title here..."
          ref={titleInputRef}
          onChange={handleChangeTitle}
          onBlur={handleSubmitTitle}
        ></textarea>

        <textarea
          className="article-editor-desc-input"
          placeholder="Enter post description..."
          value={descInput}
          onChange={handleChangeDesc}
          ref={descInputRef}
          onBlur={handleSubmitDesc}
        ></textarea>

        <div className="article-editor-tags-search-group">
          {tagItems.length < 4 && (
            <input
              type="text"
              className="article-editor-tags-search"
              placeholder="Add up to 4 tags..."
              value={tagItemValue}
              ref={tagInputRef}
              onChange={handleTagChange}
              onKeyUp={handleTagEnter}
              onBlur={handleTagBlur}
              onSubmit={(e) => e.preventDefault()}
            />
          )}

          <ul className="article-editor-tag-list">
            {tagItems.map((item, index) => (
              <li
                key={index}
                className="article-editor-tag-item"
                onClick={() => handleDeleteTagItem(index)}
              >
                <span className="badge badge-primary text-truncate">
                  {item + ` ×`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <CKEditor
          editor={ClassicEditor}
          config={{
            extraPlugins: [uploadPlugin],
            placeholder: 'Write your post here...',
          }}
          data={contentValue}
          onBlur={(_, editor) => {
            setUnsavedChanges(true);
            setContentValue(editor.getData().trim());
          }}
          onChange={(_, editor) => {
            setUnsavedChanges(true);
            setContentInput(editor.getData().trim());
          }}
        />
        <div className="article-editor-form-action">
          <div className="article-editor-post-status">
            {type === PostAction.UPDATE && !isDraft ? (
              <ToggleButton isPublic={isPublic} setIsPublic={setIsPublic} />
            ) : null}
          </div>
          <div className="article-editor-form-save-button-wrapper">
            {type === PostAction.CREATE && unsavedChanges && (
              <button
                className={`btn btn-default ${
                  isSaveDraftLoading ? 'loading' : ''
                }`}
                onClick={onSaveDraft}
              >
                Save As Draft
              </button>
            )}
            {isDraft && (
              <button
                className={`btn btn-default ${
                  isUpdateLoading ? 'loading' : ''
                }`}
                disabled={isLoading}
                onClick={handleUpdateData}
              >
                Update Draft
              </button>
            )}
            {type === PostAction.CREATE && (
              <button
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
                onClick={handleSubmitData}
              >
                Publish
              </button>
            )}
            {type === PostAction.UPDATE && (
              <button
                className={`btn btn-primary ${
                  isUpdateLoading ? 'loading' : ''
                }`}
                disabled={isUpdateLoading}
                onClick={handleUpdateData}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
