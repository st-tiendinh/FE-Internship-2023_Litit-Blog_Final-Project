import { useEffect } from 'react';

import { ManagementProvider } from '../../../../context/ManagementContext';
import { ManagementContent } from './components/ManagementContent';
import { Sidebar } from './components/Sidebar';

const Management = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ManagementProvider>
      <div className="management-page">
        <div className="container">
          <div className="row">
            <div className="col col-4 col-sm-12">
              <Sidebar />
            </div>
            <div className="col col-8 col-sm-12">
              <div className="management-content">
                <ManagementContent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ManagementProvider>
  );
};

export default Management;
