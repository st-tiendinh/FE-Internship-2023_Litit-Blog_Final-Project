import { ManagementProvider } from '../../../../context/ManagementContext';
import { ManagementContent } from './components/ManagementContent';
import { Sidebar } from './components/Sidebar';

const Management = () => {
  return (
    <ManagementProvider>
      <div className="management-page">
        <div className="container">
          <div className="row">
            <div className="col col-4">
              <Sidebar />
            </div>
            <div className="col col-8">
              <ManagementContent />
            </div>
          </div>
        </div>
      </div>
    </ManagementProvider>
  );
};

export default Management;
