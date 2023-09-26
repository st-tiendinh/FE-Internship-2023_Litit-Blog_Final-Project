import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ConfirmModal } from './ConfirmModal';

import { RootState } from '../../app.reducers';
import { setHideModal } from '../../../redux/actions/modal';

export enum ModalType {
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
}

export const Modal = () => {
  const isShow = useSelector((state: RootState) => state.modalReducer.isShow);
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.modalReducer.type);
  const message = useSelector((state: RootState) => state.modalReducer.message);
  const onConfirm = useSelector((state: RootState) => state.modalReducer.onConfirm);
  const content = useSelector((state: RootState) => state.modalReducer.content);

  const handleClose = () => {
    dispatch(setHideModal());
  };
  return (
    <div className={`modal-wrapper ${isShow ? 'd-block' : 'd-none'}`}>
      <div className={content ? 'modal' : 'modal-confirm'}>
        {content !== undefined && (
          <>
            <span className="modal-close" onClick={handleClose}>
              &times;
            </span>
            {content}
          </>
        )}
        {onConfirm !== undefined ? (
          <>
            <div className="modal-header">
              <div className="modal-message">
                {<i className={`icon icon-${type}`}></i>}
                <h4 className="modal-title">{message}</h4>
              </div>
            </div>
            <div className="modal-body">
              <ConfirmModal />
            </div>
          </>
        ) : undefined}
      </div>
    </div>
  );
};
