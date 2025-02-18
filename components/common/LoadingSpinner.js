const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  className = '',
  variant = 'primary'
}) => {
  const spinnerSizes = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  return (
    <div className={`loading-wrapper d-flex flex-column align-items-center justify-content-center p-4 ${className}`}>
      <div 
        className={`spinner-border text-${variant} ${spinnerSizes[size]}`} 
        role="status"
        aria-label={message}
      >
        <span className="visually-hidden">{message}</span>
      </div>
      {message && (
        <p className="mt-3 text-muted loading-message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;