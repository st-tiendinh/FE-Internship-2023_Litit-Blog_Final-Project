import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app.reducers';
import { setConfirmModal, setHideModal } from '../../../redux/actions/modal';

export const ConfirmModal = () => {
  const isShow = useSelector((state: RootState) => state.modalReducer.isShow);
  const dispatch = useDispatch();
  const action = useSelector((state: RootState) => state.modalReducer.onConfirm);
  const type = useSelector((state: RootState) => state.modalReducer.type);

  const handleConfirm = () => {
    dispatch(setConfirmModal(action()));
  };

  const handleCancel = () => {
    dispatch(setHideModal());
  };

  return (
    <div className={`confirm-wrapper ${isShow ? 'd-flex' : 'd-none'} `}>
      <button className={`btn btn-${type}-outline`} onClick={handleCancel}>
        No
      </button>
      <button className={`btn btn-${type}`} onClick={handleConfirm}>
        Yes
      </button>
    </div>
  );
};
