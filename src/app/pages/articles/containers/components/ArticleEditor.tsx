import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';

const apiService = new ApiService();
const jwt = new JwtHelper();

export const ArticleEditor = () => {
  const [tagItems, setTagItems] = useState<string[]>([]);
  const [tagItemValue, SetTagItemValue] = useState('');

  const tagInputRef = useRef<any>(null);
  const titleInputRef = useRef<any>('');

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

  const handleTagChange = () => {
    SetTagItemValue(tagInputRef.current.value);
  };

  const handleTagEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (tagInputRef.current.value.trim()) {
        setTagItems((prev) => [...prev, tagInputRef.current.value.trim()]);
        SetTagItemValue('');
      }
    }
  };

  const handleDelete = (id: number) => {
    setTagItems(
      tagItems.filter((_, index) => {
        return index !== id;
      })
    );
  };

  return (
    <div className="article-editor">
      <form action="" className="article-editor-form">
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
        ></textarea>

        <textarea
          className="article-editor-desc-input"
          placeholder="Enter post description..."
        ></textarea>

        <div className="article-editor-form-group">
          {tagItems.length < 4 && (
            <input
              type="text"
              className="article-editor-tags-search"
              placeholder="Add up to 4 tags..."
              value={tagItemValue}
              ref={tagInputRef}
              onChange={handleTagChange}
              onKeyUp={handleTagEnter}
            />
          )}

          <div className="article-editor-post-status">
            <select name="" id="" className="article-editor-status-select">
              <option value="public" className="article-editor-status-option">
                public
              </option>
              <option value="private" className="article-editor-status-option">
                private
              </option>
            </select>
          </div>
        </div>

        <ul className="article-editor-tag-list">
          {tagItems.map((item, index) => (
            <li
              key={index}
              className="article-editor-tag-item"
              onClick={() => handleDelete(index)}
            >
              <span className="badge badge-primary">
                {item} <span className="close-btn">&times;</span>
              </span>
            </li>
          ))}
        </ul>
      </form>

      <CKEditor
        editor={ClassicEditor}
        // data="<p>Write your post content here...</p>"
        config={{ placeholder: 'Write your post content here..' }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Write your post content here...', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};
