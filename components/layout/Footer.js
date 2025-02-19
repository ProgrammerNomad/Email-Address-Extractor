import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer py-4 ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <h5 className={`h6 mb-3 ${isDark ? 'text-light' : ''}`}>Email Address Extractor</h5>
            <p className={`small mb-0 ${isDark ? 'text-light opacity-75' : 'text-muted'}`}>
              A free tool to extract email addresses from any text. Fast, secure, and easy to use.
            </p>
          </div>
          <div className="col-md-3">
            <h5 className={`h6 mb-3 ${isDark ? 'text-light' : ''}`}>Quick Links</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link 
                  href="/" 
                  className={`text-decoration-none ${isDark ? 'text-light opacity-75 hover-opacity-100' : 'text-muted'}`}
                >
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <a 
                  href="https://github.com/ProgrammerNomad/Email-Address-Extractor"
                  className={`text-decoration-none ${isDark ? 'text-light opacity-75 hover-opacity-100' : 'text-muted'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github me-2"></i>Source Code
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="https://github.com/ProgrammerNomad/Email-Address-Extractor/issues"
                  className={`text-decoration-none ${isDark ? 'text-light opacity-75 hover-opacity-100' : 'text-muted'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-bug me-2"></i>Report Issues
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className={`h6 mb-3 ${isDark ? 'text-light' : ''}`}>Connect</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a 
                  href="https://github.com/ProgrammerNomad"
                  className={`text-decoration-none ${isDark ? 'text-light opacity-75 hover-opacity-100' : 'text-muted'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github me-2"></i>Follow
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className={`my-4 ${isDark ? 'border-secondary opacity-25' : ''}`} />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className={`small mb-0 ${isDark ? 'text-light opacity-75' : 'text-muted'}`}>
              © {currentYear} Email Address Extractor. Made with <i className="fas fa-heart text-danger"></i> by{' '}
              <a 
                href="https://github.com/ProgrammerNomad"
                className={`text-decoration-none ${isDark ? 'text-light hover-opacity-100' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ProgrammerNomad
              </a>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <p className={`small mb-0 ${isDark ? 'text-light opacity-75' : 'text-muted'}`}>
              <i className="fas fa-code me-2"></i>
              Open Source Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}