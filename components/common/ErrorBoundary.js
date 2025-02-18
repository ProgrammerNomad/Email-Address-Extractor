
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 text-center">
          <div className="alert alert-danger">
            <h4 className="alert-heading">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Something went wrong
            </h4>
            <p className="mb-0">We're sorry, but an error occurred. Please try refreshing the page.</p>
          </div>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-redo me-2"></i>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}