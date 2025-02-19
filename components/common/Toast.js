export default function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`toast show position-fixed bottom-0 end-0 m-3 text-white bg-${type}`} 
         role="alert" 
         aria-live="assertive" 
         aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
          <i className={`fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2`}></i>
          {message}
        </div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
      </div>
    </div>
  );
}