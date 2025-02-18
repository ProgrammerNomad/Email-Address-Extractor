import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image 
            src="/img/icon.png" 
            alt="Email Extractor" 
            width={32} 
            height={32} 
            className="d-inline-block align-text-top"
          />
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
                href="https://github.com/srapsware/email-address-extractor/wiki"
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://github.com/srapsware/email-address-extractor/issues/new"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}