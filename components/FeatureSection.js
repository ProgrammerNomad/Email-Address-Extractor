import React from 'react';

const FeatureSection = ({ icon, title, description }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="feature-box text-center">
            <div className="feature-box-icon">
              <i className={`fa ${icon} fa-3x`}></i>
            </div>
            <h3>{title}</h3>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;