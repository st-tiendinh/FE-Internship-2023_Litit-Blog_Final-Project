import { useEffect } from 'react';

export const useConfirmOnload = (unsavedChanges: any, handleSaveDraft: any) => {
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'You have unsaved changes. Are you sure you want to leave this page?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    const linkTags = document.querySelectorAll('a');
    const handleConfirm = (e: any) => {
      if (unsavedChanges) {
        if (
          window.confirm(
            'You have unsaved changes. Are you sure you want to leave this page?'
          )
        ) {
          handleSaveDraft();
        } else {
          e.preventDefault();
        }
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
