import Head from 'next/head';
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EmailForm from '../components/forms/EmailForm';
import Features from '../components/features/Features';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Email Address Extractor - Free Online Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Extract email addresses from any text quickly and easily. Free online tool with advanced filtering and export options." />
        <meta name="author" content="Shiv Singh" />
        <meta name="keywords" content="email extractor, email finder, extract email addresses, email harvester" />
        <link rel="shortcut icon" href="/img/icon.png" />
        <link rel="apple-touch-icon" href="/img/icon.png" />
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <div className="container">
            {/* Hero Section */}
            <section className="py-5">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">
                      Extract Email Addresses Instantly
                    </h1>
                    <p className="lead text-secondary mb-4">
                      Simply paste your text and let our tool find all email addresses. 
                      Perfect for contact list building and data extraction.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mb-4">
                      <span className="badge bg-success px-3 py-2">
                        <i className="fas fa-check me-2"></i>Free to Use
                      </span>
                      <span className="badge bg-primary px-3 py-2">
                        <i className="fas fa-bolt me-2"></i>Instant Results
                      </span>
                      <span className="badge bg-info px-3 py-2">
                        <i className="fas fa-lock me-2"></i>100% Private
                      </span>
                    </div>
                  </div>
                  
                  <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                      <EmailForm />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Tips Section */}
            <section className="py-4 mb-5">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <div className="tip-icon">
                      <i className="fas fa-lightbulb text-warning fs-4"></i>
                    </div>
                    <div className="ms-3">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0">Pro Tip:</h5>
                        <span className="text-muted small ms-2">
                          Sort emails alphabetically for better organization
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <div className="tip-icon">
                      <i className="fas fa-filter text-primary fs-4"></i>
                    </div>
                    <div className="ms-3">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0">Quick Filter:</h5>
                        <span className="text-muted small ms-2">
                          Remove unwanted domains instantly
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <div className="tip-icon">
                      <i className="fas fa-file-export text-success fs-4"></i>
                    </div>
                    <div className="ms-3">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0">Export:</h5>
                        <span className="text-muted small ms-2">
                          Save as TXT, CSV, or JSON
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Features />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}