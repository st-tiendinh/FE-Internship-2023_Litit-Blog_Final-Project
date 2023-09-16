import EmptyImage from '../../../assets/icons/ic-empty.svg';

export const EmptyData = () => {
  return (
    <div className="d-flex flex-column empty-wrap">
      <div className="empty-image-wrap">
        <img src={EmptyImage} alt="Empty Image" />
      </div>
      <p className="empty-message">No Post found!</p>
    </div>
  );
};
