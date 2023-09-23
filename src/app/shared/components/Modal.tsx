import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ConfirmModal } from './ConfirmModal';

import { RootState } from '../../app.reducers';
import {
  setConfirmModalId,
  setConfirmModalType,
  setHideModal,
} from '../../../redux/actions/modal';

export enum ModalType {
  CONFIRM_DELETE,
}

interface ModalPropTypes {
  type?: ModalType;
  title: string;
  action?: any;
  button?: ReactElement;
}

export const Modal = ({ button, action }: ModalPropTypes) => {
  const isShow = useSelector((state: RootState) => state.modalReducer.isShow);
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.modalReducer.type);

  const handleClose = () => {
    dispatch(setHideModal());
    dispatch(setConfirmModalId(null));
    dispatch(setConfirmModalType(''));
  };

  return (
    <div className={`modal-wrapper ${isShow ? 'd-block' : 'd-none'}`}>
      <div className="modal">
        <div className="modal-header">
          {type === 'delete' && <i className="icon icon-danger"></i>}
          <h4 className="modal-title">
            {(type === 'delete' && 'Do you want to delete?') ||
              (type === 'restore' && 'Do you want to restore?')}
          </h4>
          {type !== 'delete' && (
            <span className="modal-close" onClick={handleClose}>
              &times;
            </span>
          )}
        </div>
        <div className="modal-body">
          <ConfirmModal action={action} />
        </div>
        <div className="modal-footer">{button}</div>
      </div>
    </div>
  );
};
