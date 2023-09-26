import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../../redux/actions/modal';
import { ModalType } from '../components/Modal';

export const useConfirmOnload = (unsavedChanges: any, handleSaveDraft: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const linkTags = document.querySelectorAll('a');
    const handleConfirm = (e: any) => {
      if (unsavedChanges) {
        e.preventDefault();
        dispatch(
          setShowModal({
            type: ModalType.INFO,
            message:
              'You have unsaved changes. Are you sure you want to leave this page?',
            onConfirm: handleSaveDraft,
          })
        );
      }
      return;
    };
    linkTags.forEach((link) => {
      link.addEventListener('click', handleConfirm);
    });

    return () => {
      linkTags.forEach((link) => {
        link.removeEventListener('click', handleConfirm);
      });
    };
  }, [unsavedChanges]);
};
