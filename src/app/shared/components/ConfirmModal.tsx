import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app.reducers';
import { setConfirmModal, setHideModal } from '../../redux/actions/modal';

export const ConfirmModal = ({ action }: any) => {
  const isShow = useSelector((state: RootState) => state.modalReducer.isShow);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(setConfirmModal(action()));
  };

  const handleCancel = () => {
    dispatch(setHideModal());
  };

  return (
    <div className={`confirm-wrapper ${isShow ? 'd-flex' : 'd-none'} `}>
      <button className="btn btn-primary" onClick={handleConfirm}>
        Yes
      </button>
      <button className="btn btn-outline" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};
