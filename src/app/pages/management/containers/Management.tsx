import React from 'react';
import { Sidebar } from './components/Sidebar';

const Management = () => {
  return (
    <div className="management-page">
      <div className="container">
        <div className="row">
          <div className="col col-4">
            <Sidebar />
          </div>
          <div className="col col-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Management;
