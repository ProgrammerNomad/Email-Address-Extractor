import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useTheme } from 'next-themes';

// Update dynamic imports
const Features = dynamic(() => import('../components/features/Features'), {
  loading: () => <LoadingSpinner message="Loading features..." size="lg" />,
  ssr: false // Disable server-side rendering for better performance
});

const EmailForm = dynamic(() => import('../components/forms/EmailForm'), {
  loading: () => <LoadingSpinner message="Initializing..." variant="primary" />,
  ssr: false
});

const quickTips = [
  {
    icon: 'fa-sort-alpha-down',
    title: 'Pro Tip',
    description: 'Sort emails alphabetically for better organization',
    color: 'text-primary'
  },
  {
    icon: 'fa-filter',
    title: 'Quick Filter',
    description: 'Remove unwanted domains instantly',
    color: 'text-success'
  },
  {
    icon: 'fa-file-export',
    title: 'Export Options',
    description: 'Save your results as TXT, CSV, or JSON',
    color: 'text-info'
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Add error handling for bootstrap load
  useEffect(() => {
    const loadApp = async () => {
      try {
        if (typeof window !== 'undefined') {
          await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
      } catch (error) {
        console.error('Failed to load Bootstrap:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadApp();
  }, []);

  if (isLoading) {
    return (
      <div className={`min-vh-100 d-flex align-items-center justify-content-center ${isDark ? 'bg-dark' : 'bg-light'}`}>
        <LoadingSpinner 
          size="lg" 
          message="Loading Email Address Extractor..." 
          variant={isDark ? 'light' : 'primary'}
        />
      </div>
    );
  }

  return (
    <div className={`theme-wrapper ${isDark ? 'dark-theme' : ''}`}>
      <Head>
        <html lang="en" /> {/* Add language attribute */}
        <title>Email Address Extractor - Free Online Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Extract email addresses from any text quickly and easily. Free online tool with advanced filtering and export options." />
        <meta name="author" content="Shiv Singh" />
        <meta name="keywords" content="email extractor, email finder, extract email addresses, email harvester" />
        <link rel="shortcut icon" href="/img/icon.png" />
        <link rel="apple-touch-icon" href="/img/icon.png" />
        <meta property="og:title" content="Email Address Extractor - Free Online Tool" />
        <meta property="og:description" content="Extract email addresses from any text quickly and easily. Free online tool with advanced filtering and export options." />
        <meta property="og:image" content="/img/social-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://your-domain.com" />
      </Head>

      <div className={`d-flex flex-column min-vh-100 ${isDark ? 'bg-dark' : 'bg-light'}`}>
        <a href="#main-content" className="skip-link visually-hidden-focusable">
          Skip to main content
        </a>

        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        
        <main 
          id="main-content" 
          className={`flex-grow-1 py-5 ${isDark ? 'bg-dark text-light' : 'bg-light'}`} 
          role="main"
        >
          <div className="container">
            {/* Hero Section */}
            <section className="hero-section mb-5" aria-label="Email extraction tool">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">
                      Extract Email Addresses Instantly
                    </h1>
                    <p className={`lead mb-4 ${isDark ? 'text-light opacity-75' : 'text-secondary'}`}>
                      Simply paste your text and let our tool find all email addresses. 
                      Perfect for contact list building and data extraction.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mb-4">
                      <span className="badge bg-success px-3 py-2">
                        <i className="fas fa-check me-2"></i>
                        <span>Free to Use</span>
                      </span>
                      <span className="badge bg-primary px-3 py-2">
                        <i className="fas fa-bolt me-2"></i>
                        <span>Instant Results</span>
                      </span>
                      <span className="badge bg-info px-3 py-2">
                        <i className="fas fa-lock me-2"></i>
                        <span>100% Private</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className={`card shadow-lg ${isDark ? 'bg-dark border-secondary' : 'border-0'}`}>
                    <div className="card-body p-4">
                      <ErrorBoundary>
                        <EmailForm />
                      </ErrorBoundary>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="quick-tips py-4 mb-5">
              <div className="container">
                <div className="row g-4">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="col-md-4">
                      <div className={`tip-card h-100 p-4 rounded-3 ${
                        isDark ? 'bg-dark border border-secondary' : 'bg-light border'
                      }`}>
                        <div className="d-flex align-items-center mb-3">
                          <div className={`tip-icon rounded-circle ${tip.color}`}>
                            <i className={`fas ${tip.icon} fa-lg`}></i>
                          </div>
                          <h3 className="h5 mb-0 ms-3">{tip.title}</h3>
                        </div>
                        <p className={`mb-0 ${isDark ? 'text-light opacity-75' : 'text-secondary'}`}>
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <ErrorBoundary>
              <Features />
            </ErrorBoundary>
          </div>
        </main>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </div>
  );
}