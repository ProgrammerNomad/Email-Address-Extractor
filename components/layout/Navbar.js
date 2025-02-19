import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import ThemeToggle from '../common/ThemeToggle';

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/img/icon.png"
            alt="Email Extractor"
            width={32}
            height={32}
            priority={true}
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
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://github.com/ProgrammerNomad/Email-Address-Extractor/wiki"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-book me-2"></i>
                Documentation
              </a>
            </li>
            <li className="nav-item">
              <ThemeToggle />
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://github.com/ProgrammerNomad/Email-Address-Extractor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github me-2"></i>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}