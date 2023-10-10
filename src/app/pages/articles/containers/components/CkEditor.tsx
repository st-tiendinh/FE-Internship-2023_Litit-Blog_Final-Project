import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { PostAction } from './EditorForm';

import { uploadPlugin } from '../../../../../config/ckEditorConfig';
import { PostItemWithIdProps } from '../../../../core/models/post';

interface CkEditorProps {
  type: PostAction;
  errors: any;
  setValue: any;
  postData: PostItemWithIdProps;
  setPostData: (postData: PostItemWithIdProps) => void;
}

const CkEditor = ({
  type,
  errors,
  postData,
  setValue,
  setPostData,
}: CkEditorProps) => {
  const handleChange = (editor: any) => {
    setValue('content', editor.getData().trim(), { shouldDirty: true });
  };

  const handleBlur = (editor: any) => {
    setPostData({
      ...postData,
      content: editor.getData().trim(),
    });
  };

  return (
    <div className="myck-editor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
          placeholder: 'Write your post here...',
        }}
        data={postData ? postData.content : ''}
        onChange={(_, editor) => handleChange(editor)}
        {...(type === PostAction.UPDATE
          ? {
              onBlur: (_, editor) => handleBlur(editor),
            }
          : null)}
      />
      {errors.content?.message && (
        <p className="text-danger mt-10 mb-10">{errors.content?.message}</p>
      )}
    </div>
  );
};

export default React.memo(CkEditor);
