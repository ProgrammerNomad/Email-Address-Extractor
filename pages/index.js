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
        <title>Email Address Extractor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Email Address Extractor" />
        <meta name="author" content="Shiv Singh" />
        <link rel="shortcut icon" href="/img/icon.png" />
        <link rel="apple-touch-icon" href="/img/icon.png" />
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <div className="container">
            <section className="py-5">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold mb-3">Email Address Extractor</h1>
                    <p className="lead text-secondary">
                      Enter any text data that contains email addresses
                    </p>
                  </div>
                  
                  <EmailForm />
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