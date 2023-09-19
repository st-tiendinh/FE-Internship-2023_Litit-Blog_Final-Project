import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

const apiService = new ApiService();
const jwt = new JwtHelper();

export const ArticleEditor = () => {
  const [titleValue, setTitleValue] = useState<string>('');
  const [descValue, setDescValue] = useState<string>('');
  const [tagItems, setTagItems] = useState<string[]>([]);
  const [tagItemValue, SetTagItemValue] = useState('');
  const [contentValue, setContentValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('public');

  const navigate = useNavigate();

  const tagInputRef = useRef<any>(null);
  const titleInputRef = useRef<any>('');
  const descInputRef = useRef<any>('');

  const [nameImage, setNameImage] = useState<string | 0 | undefined>(undefined);
  const [fileExtension, setFileExtension] = useState<string | 0 | undefined>(
    undefined
  );
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [binaryImg, setBinaryImg] = useState<any>(undefined); // 1
  const uploadType = 'cover-post';
  const params = `?type_upload=${uploadType}&file_name=${nameImage}&file_type=image/png}`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    const filenameParts = file?.name.split('.');
    const getExtension = filenameParts?.length && filenameParts.pop();
    setFileExtension(getExtension);
    const firstElement = filenameParts?.shift();
    setNameImage(firstElement);
    const reader = new FileReader();
    reader.onloadend = async function () {
      if (reader.result) {
        const base64String = reader.result.toString().split(',')[1];
        const base64Response = await fetch(
          `data:image/png;base64,${base64String}`
        );
        const blob = await base64Response.blob();
        setBinaryImg(blob);
      }
    };
    reader.readAsDataURL(file);
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
      } catch (error) {
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    const getImage = async () => {
      if (nameImage && fileExtension) {
        try {
          apiService.setHeaders(jwt.getAuthHeader());
          const res: any = await apiService.get([
            `https://fe-internship.liveonce.online/api/v1/signatures${params}`,
          ]);
          if (res && res.url && res.signedRequest) {
            await axios
              .put(res.signedRequest, binaryImg)
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
  }, [binaryImg]);

  return (
    <div className="article-editor">
      <div className="article-editor-form">
        <label
          htmlFor="article-editor-cover-upload"
          className="article-editor-upload-label"
        >
          Add a cover image
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

        <textarea
          className="article-editor-title-input"
          placeholder="New post title here..."
          ref={titleInputRef}
          onBlur={handleSubmitTitle}
        ></textarea>

        <textarea
          className="article-editor-desc-input"
          placeholder="Enter post description..."
          ref={descInputRef}
          onBlur={handleSubmitDesc}
        ></textarea>

        <div className="article-editor-form-group">
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
                  <span className="badge badge-primary">
                    {item} <span className="close-btn">&times;</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

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
          config={{ placeholder: 'Write your post content here..' }}
          onBlur={(_, editor) => {
            console.log(editor.getData());
            setContentValue(editor.getData());
          }}
        />
        <div className="article-editor-form-action">
          <button className="btn btn-primary" onClick={handleSubmitData}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
