// components/FeatureSection.js
const FeatureSection = ({ icon, title, description }) => (
    <div className="content-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-sm-6">
            <hr className="section-heading-spacer" />
            <div className="clearfix"></div>
            <h2 className="section-heading payment">{title}</h2>
            <p
              className="lead payment_dec"
              dangerouslySetInnerHTML={{ __html: description }} // Important: Use with caution!
            ></p>
          </div>
          <div className="col-lg-5 col-lg-offset-2 col-sm-6">
            <i className={`fa ${icon} payment_image`}></i>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default FeatureSection;