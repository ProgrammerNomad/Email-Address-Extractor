import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-4 bg-light border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-dark mb-3">Email Address Extractor</h5>
            <p className="text-muted small">
              A free tool to extract email addresses from any text. 
              Simple, fast, and efficient.
            </p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-dark mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <a 
                  href="https://github.com/ProgrammerNomad/Email-Address-Extractor/wiki"
                  className="text-muted text-decoration-none"
                >
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="https://github.com/ProgrammerNomad/Email-Address-Extractor/issues"
                  className="text-muted text-decoration-none"
                >
                  Report Issues
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-dark mb-3">Connect With Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="https://github.com/srapsware/email-address-extractor"
                  className="text-muted text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github me-2"></i>
                  GitHub Repository
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="https://github.com/srapsware/email-address-extractor/issues"
                  className="text-muted text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-bug me-2"></i>
                  Report Issues
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted mb-0">
              © {currentYear} Email Address Extractor. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="text-muted mb-0">
              Made with <i className="fas fa-heart text-danger"></i> by Shiv Singh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}