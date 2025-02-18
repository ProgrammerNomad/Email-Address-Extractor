export default function FeatureSection({ title, description, icon, variant, isReverse }) {
  return (
    <div className={`content-section-${variant}`}>
      <div className="container">
        <div className={`row align-items-center ${isReverse ? 'flex-row-reverse' : ''}`}>
          <div className="col-lg-6">
            <div className="feature-content">
              <hr className="section-heading-spacer" />
              <div className="clearfix"></div>
              <h2 className="section-heading payment mb-4">{title}</h2>
              <p 
                className="lead payment_dec" 
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="feature-icon text-center">
              <i className={`fa ${icon} payment_image`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}