import Head from 'next/head';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Dynamically import components with loading states
const Features = dynamic(() => import('../components/features/Features'), {
  loading: () => <LoadingSpinner message="Loading features..." />
});

const EmailForm = dynamic(() => import('../components/forms/EmailForm'), {
  loading: () => <LoadingSpinner message="Initializing email extractor..." />
});

export default function Home() {
  // Move useEffect inside the component
  useEffect(() => {
    const loadBootstrap = async () => {
      if (typeof window !== 'undefined') {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
    };
    loadBootstrap();
  }, []);

  return (
    <>
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

      <div className="d-flex flex-column min-vh-100">
        <a href="#main-content" className="skip-link visually-hidden-focusable">
          Skip to main content
        </a>

        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        
        <main id="main-content" className="flex-grow-1" role="main">
          <div className="container">
            {/* Hero Section */}
            <section className="py-5" aria-label="Email extraction tool">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="text-center mb-5">
                    <h1 id="main-heading" className="display-4 fw-bold mb-3">
                      Extract Email Addresses Instantly
                    </h1>
                    <p className="lead text-secondary mb-4" role="doc-subtitle">
                      Simply paste your text and let our tool find all email addresses. 
                      Perfect for contact list building and data extraction.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mb-4" role="list">
                      <span className="badge bg-success px-3 py-2" role="listitem">
                        <i className="fas fa-check me-2" aria-hidden="true"></i>
                        <span>Free to Use</span>
                      </span>
                      <span className="badge bg-primary px-3 py-2" role="listitem">
                        <i className="fas fa-bolt me-2" aria-hidden="true"></i>
                        <span>Instant Results</span>
                      </span>
                      <span className="badge bg-info px-3 py-2" role="listitem">
                        <i className="fas fa-lock me-2" aria-hidden="true"></i>
                        <span>100% Private</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="card shadow-sm border-0">
                    <div className="card-body p-4" role="form" aria-label="Email extraction form">
                      <ErrorBoundary>
                        <EmailForm />
                      </ErrorBoundary>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ErrorBoundary>
              <section className="quick-tips py-4 mb-5" aria-labelledby="tips-heading">
                <h2 id="tips-heading" className="visually-hidden">Quick Tips</h2>
                <div className="row g-4" role="list">
                  <div className="col-md-4" role="listitem">
                    <div className="tip-card h-100 p-3 rounded">
                      <div className="d-flex">
                        <div className="tip-icon rounded-circle" aria-hidden="true">
                          <i className="fas fa-lightbulb text-warning"></i>
                        </div>
                        <div className="tip-content ms-3">
                          <h3 className="tip-title h5 mb-2">Pro Tip</h3>
                          <p className="tip-text mb-0">
                            Sort emails alphabetically for better organization
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" role="listitem">
                    <div className="tip-card h-100 p-3 rounded">
                      <div className="d-flex">
                        <div className="tip-icon rounded-circle" aria-hidden="true">
                          <i className="fas fa-filter text-primary"></i>
                        </div>
                        <div className="tip-content ms-3">
                          <h3 className="tip-title h5 mb-2">Quick Filter</h3>
                          <p className="tip-text mb-0">
                            Remove unwanted domains instantly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" role="listitem">
                    <div className="tip-card h-100 p-3 rounded">
                      <div className="d-flex">
                        <div className="tip-icon rounded-circle" aria-hidden="true">
                          <i className="fas fa-file-export text-success"></i>
                        </div>
                        <div className="tip-content ms-3">
                          <h3 className="tip-title h5 mb-2">Export Options</h3>
                          <p className="tip-text mb-0">
                            Save your results as TXT, CSV, or JSON
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </ErrorBoundary>

            <ErrorBoundary>
              <Features />
            </ErrorBoundary>
          </div>
        </main>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </>
  );
}