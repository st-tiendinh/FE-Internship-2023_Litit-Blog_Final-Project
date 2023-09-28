import NotFound from '../../../shared/components/NotFound';

const NotFoundSection = () => {
  return (
    <NotFound
      message={`We're sorry, This page is unknown or does not exist the page you are looking for.`}
      typeError="Page"
    />
  );
};

export default NotFoundSection;
