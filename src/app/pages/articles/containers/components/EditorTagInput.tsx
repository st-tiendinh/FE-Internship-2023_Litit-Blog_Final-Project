import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ToastTypes } from '../../../../shared/components/Toast';
import { setShowToast } from '../../../../../redux/actions/toast';

interface TagInputProps {
  tagList: string[];
  setTagList: (tagList: string[]) => void;
}

export const TagInput = ({ tagList, setTagList }: TagInputProps) => {
  const tagInputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const handleTagBlur = () => {
    if (tagInputRef.current.value.trim()) {
      const isContain = tagList.includes(tagInputRef.current.value.trim());
      if (isContain) {
        dispatch(
          setShowToast({
            type: ToastTypes.ERROR,
            title: 'Tag error',
            message: 'Tag already exists',
          })
        );
      } else {
        setTagList([...tagList, tagInputRef.current.value.trim()]);
        tagInputRef.current.value = '';
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
    setTagList(
      tagList.filter((_, index) => {
        return index !== id;
      })
    );
  };

  return (
    <div className="article-editor-tags-search-group">
      {tagList.length < 4 && (
        <input
          type="text"
          className="article-editor-tags-search"
          placeholder="Add up to 4 tags..."
          ref={tagInputRef}
          onKeyUp={handleTagEnter}
          onBlur={handleTagBlur}
          onSubmit={(e) => e.preventDefault()}
        />
      )}

      <ul className="article-editor-tag-list">
        {tagList.map((item, index) => (
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
  );
};
