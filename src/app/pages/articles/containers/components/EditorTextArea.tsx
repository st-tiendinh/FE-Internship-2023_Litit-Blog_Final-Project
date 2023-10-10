import React, {
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { PostAction } from './EditorForm';

interface EditorTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  setPostData: (postData: any) => void;
  postData: any;
  name: string;
  placeholder: string;
  errors: any;
  type: PostAction;
}

const EditorTextArea = forwardRef<HTMLTextAreaElement, EditorTextAreaProps>(
  (
    { name, placeholder, errors, type, postData, setPostData, ...rest },
    ref
  ) => {
    const [textAreaInput, setTextAreaInput] = useState<string>(
      type === PostAction.UPDATE ? postData[name] : ''
    );

    const refs: any = {
      title: useRef<HTMLTextAreaElement>(null),
      description: useRef<HTMLTextAreaElement>(null),
    };

    const handleChange = () => {
      setTextAreaInput((refs[name].current as HTMLTextAreaElement).value);
    };

    const handleBlur = () => {
      setPostData({
        ...postData,
        [name]: refs[name].current?.value.trim(),
      });
    };

    return (
      <>
        <textarea
          ref={type === PostAction.UPDATE ? refs[name] : ref}
          name={name}
          className={`article-editor-${name}-input`}
          placeholder={placeholder}
          {...(type === PostAction.UPDATE
            ? {
                value: textAreaInput,
                onChange: handleChange,
                onBlur: handleBlur,
              }
            : rest)}
        />
        {errors[name]?.message && (
          <p className="text-danger mb-10">{errors[name]?.message}</p>
        )}
      </>
    );
  }
);

export default React.memo(EditorTextArea);
