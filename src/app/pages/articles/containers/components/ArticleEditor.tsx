import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

const apiService = new ApiService();
const jwt = new JwtHelper();

export enum PostAction {
  CREATE = 'create',
  UPDATE = 'update',
}

interface ArticleEditorProps {
  type: PostAction;
  data?: any;
}

export const ArticleEditor = ({ type, data }: ArticleEditorProps) => {
  const [error, setError] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>(
    type === PostAction.UPDATE ? data.title : ''
  );

  const [titleValue, setTitleValue] = useState<string>('');
  const [descValue, setDescValue] = useState<string>('');
  const [tagItems, setTagItems] = useState<string[]>([]);
  const [tagItemValue, SetTagItemValue] = useState('');
  const [contentValue, setContentValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>(
    type === PostAction.CREATE ? 'public' : data.status
  );

  const navigate = useNavigate();
  const location = useLocation();

  const tagInputRef = useRef<any>(null);
  const titleInputRef = useRef<any>(null);
  const descInputRef = useRef<any>(null);

  const [nameImage, setNameImage] = useState<string | undefined>(undefined);
  const [fileExtension, setFileExtension] = useState<string | undefined>(
    undefined
  );
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<any>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    setImageFile(file);
    const filenameParts = file?.name.split('.');
    const getExtension = filenameParts?.length && filenameParts.pop();
    setFileExtension(getExtension);
    const firstElement = filenameParts?.shift();
    setNameImage(firstElement);
  };

  const handleChangeTitle = () => {
    setTitleInput(titleInputRef.current.value);
  };

  const handleSubmitTitle = () => {
    if (titleInputRef.current.value.trim()) {
      setTitleValue(titleInputRef.current.value);
    }
  };

  const handleSubmitDesc = () => {
    if (descInputRef.current.value.trim()) {
      setDescValue(descInputRef.current.value.trim());
    }
  };

  const handleTagChange = () => {
    SetTagItemValue(tagInputRef.current.value);
  };

  const handleTagEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (tagInputRef.current.value.trim()) {
        setTagItems((prev) => [...prev, tagInputRef.current.value.trim()]);
        SetTagItemValue('');
      }
    }
  };

  const handleDeleteTagItem = (id: number) => {
    setTagItems(
      tagItems.filter((_, index) => {
        return index !== id;
      })
    );
  };

  const handleSubmitData = () => {
    (async () => {
      try {
        apiService.setHeaders(jwt.getAuthHeader());
        const postData = {
          title: titleValue,
          cover: imageUrl,
          content: contentValue,
          status: statusValue,
          description: descValue,
          tags: tagItems,
        };
        const response = await apiService.post(
          [ENDPOINT.posts.index],
          postData
        );
        navigate('/');
        return response;
      } catch (error: any) {
        setError(error.response.data.errors[0]);
        window.scrollTo(0, 0);
      }
    })();
  };

  const handleUpdateData = () => {
    (async () => {
      try {
        apiService.setHeaders(jwt.getAuthHeader());
        const postUpdated = {
          title: titleValue,
          content: contentValue,
          status: statusValue,
        };
        const response = await apiService.put(
          [ENDPOINT.posts.index, `${location.pathname.split('/').pop()}`],
          postUpdated
        );
        navigate(-1);
        return response;
      } catch (error) {
        console.log(error);
      }
    })();
  };

  function uploadAdapter(loader: any) {
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

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  useEffect(() => {
    const getImage = async () => {
      if (nameImage && fileExtension) {
        try {
          apiService.setHeaders(jwt.getAuthHeader());
          const uploadType = 'cover-post';
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
        } catch (error) {
          console.error('Error in API call:', error);
        }
      }
    };
    getImage();
  }, [imageFile]);

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
        {type === PostAction.CREATE && (
          <>
            <label
              htmlFor="article-editor-cover-upload"
              className="article-editor-upload-label"
            >
              {imageUrl ? 'Change image' : 'Add a cover image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="article-editor-cover-upload"
                name=""
                id="article-editor-cover-upload"
              />
            </label>

            {!!imageUrl && (
              <div className="article-editor-preview-cover">
                <img src={imageUrl} className="article-editor-image" />
              </div>
            )}
          </>
        )}

        <textarea
          className="article-editor-title-input"
          value={titleInput}
          placeholder="New post title here..."
          ref={titleInputRef}
          onChange={handleChangeTitle}
          onBlur={handleSubmitTitle}
        ></textarea>

        {type === PostAction.CREATE && (
          <textarea
            className="article-editor-desc-input"
            placeholder="Enter post description..."
            ref={descInputRef}
            onBlur={handleSubmitDesc}
          ></textarea>
        )}

        <div className="article-editor-form-group">
          {type === PostAction.CREATE && (
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
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="article-editor-post-status">
            <select
              name=""
              id=""
              className="article-editor-status-select"
              onChange={(choice: any) => setStatusValue(choice.target.value)}
            >
              <option value="public" className="article-editor-status-option">
                public
              </option>
              <option value="private" className="article-editor-status-option">
                private
              </option>
            </select>
          </div>
        </div>

        <CKEditor
          editor={ClassicEditor}
          config={{
            extraPlugins: [uploadPlugin],
            placeholder: 'Write your post here...',
          }}
          data={type === PostAction.CREATE ? '' : data.content}
          onBlur={(_, editor) => {
            setContentValue(editor.getData());
          }}
        />
        <div className="article-editor-form-action">
          {(type === PostAction.CREATE && (
            <button className="btn btn-primary" onClick={handleSubmitData}>
              Publish
            </button>
          )) ||
            (type === PostAction.UPDATE && (
              <button className="btn btn-primary" onClick={handleUpdateData}>
                Update
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
