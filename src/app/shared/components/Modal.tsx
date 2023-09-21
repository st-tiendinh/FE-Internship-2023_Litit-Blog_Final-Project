import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ConfirmModal } from './ConfirmModal';

import { RootState } from '../../app.reducers';
import { setHideModal } from '../../../redux/actions/modal';

export enum ModalType {
  CONFIRM_DELETE,
}

interface ModalPropTypes {
  type: ModalType;
  title: string;
  action?: any;
  button?: ReactElement;
}

export const Modal = ({ title, button, type, action }: ModalPropTypes) => {
  const isShow = useSelector((state: RootState) => state.modalReducer.isShow);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setHideModal());
  };

  return (
    <div className={`modal-wrapper ${isShow ? 'd-block' : 'd-none'}`}>
      <div className="modal">
        <div className="modal-header">
          {type === ModalType.CONFIRM_DELETE && (
            <i className="icon icon-danger"></i>
          )}
          <h4 className="modal-title">{title}</h4>
          {type !== ModalType.CONFIRM_DELETE && (
            <span className="modal-close" onClick={handleClose}>
              &times;
            </span>
          )}
        </div>
        <div className="modal-body">
          {type === ModalType.CONFIRM_DELETE && (
            <ConfirmModal action={action} />
          )}
        </div>
        <div className="modal-footer">{button}</div>
      </div>
    </div>
  );
};
