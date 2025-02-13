// pages/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import EmailExtractorForm from '../components/EmailExtractorForm';
import FeatureSection from '../components/FeatureSection';

export default function HomePage() {
  return (
    <div className="container">
      {/* Navbar (convert to component later if needed) */}
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a
              className="navbar-brand"
              href="https://email-extractor.whoisextractor.in"
            >
              <img
                alt="Brand"
                src="https://email-extractor.whoisextractor.in/img/icon.png"
                style={{
                  width: '20px',
                }}
              />
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li>
                <a href="https://github.com/srapsware/email-address-extractor/wiki">
                  About
                </a>
              </li>
              <li>
                <a href="https://github.com/srapsware/email-address-extractor/issues/new">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="start_main">
        <div className="example">
          <div className="row">
            <div
              className="col-xs-12 col-sm-12 col-md-12"
              style={{ paddingTop: '100px' }}
            >
              <h4>Email Address Extractor</h4>
              <p>Enter any text data that contain email addresses</p>
            </div>
          </div>
          <EmailExtractorForm /> Use the component here
        </div>
        <div className="clearfix"></div>
        <div className="seprater_new"></div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <header className="section-heading text-center">
              <h2 className="title-text">Email Address Extractor</h2>
              <p className="sub-title">
                Extract email addresses from any text with this free utility.
                Simply copy, paste and start extracting.
              </p>
            </header>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      <FeatureSection
        icon="fa-files-o"
        title="No duplicates"
        description="This tool extract email address <strong>without repeating</strong> the same email, <strong>100% no duplication</strong>"
      />
      <FeatureSection
        icon="fa-list-ol"
        title="Counts of emails"
        description="After email address extraction, it shows <strong>how many</strong> clean exacted email address founded."
      />
      <FeatureSection
        icon="fa-arrows-alt"
        title="Different separator"
        description="This tool offer you to use many separators as <strong>comma, pipe, colon, space, etc</strong>. even we have a powerful option here you can use your own separator."
      />
      <FeatureSection
        icon="fa-object-group"
        title="Generates in groups"
        description="Group emails by number specified by you. <strong>Each group</strong> is separated by new line."
      />
      <FeatureSection
        icon="fa-sort-alpha-asc"
        title="Sort emails alphabetically"
        description="This also sort emails in alphabetically, this is the option tool, if you want to see it then kindly find <strong>Sort Alphabetically</strong> checkbox."
      />
      <FeatureSection
        icon="fa-hashtag"
        title="Certain string and much more"
        description="Option to extract or exclude email containing only <strong>certain string</strong>. Option to extract <strong>web addresses</strong> instead of email addresses."
      />
    </div>
  );
}