import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const listenToScroll = () => {
    const heightToHidden = 50;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);
  return (
    <div className="scroll-button-wrap">
      {isVisible && (
        <button className="d-flex scroll-button" onClick={handleScroll}>
          <i className="icon icon-arrow-up"></i>
        </button>
      )}
    </div>
  );
};
