import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/img/icon.png"
            alt="Email Extractor"
            width={32}
            height={32}
            priority={true} // Use priority instead of fetchPriority
            className="me-2"
          />
          <span>Email Extractor</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://github.com/ProgrammerNomad/Email-Address-Extractor/wiki/About"
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://github.com/ProgrammerNomad/Email-Address-Extractor/issues/new"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-nav ms-auto">
          <a 
            className="nav-link" 
            href="https://github.com/ProgrammerNomad/Email-Address-Extractor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}