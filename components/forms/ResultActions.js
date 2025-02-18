export default function ResultActions({ count, onCopy, onExport, copyMessage }) {
  return (
    <div className="result-actions bg-light rounded p-3 mb-3">
      <div className="row">
        {/* Email Count */}
        <div className="col-12 mb-3">
          <div className="email-count">
            <h6 className="text-muted mb-1">Emails Found</h6>
            <div className="d-flex align-items-center">
              <span className="display-6 fw-bold text-primary">{count || 0}</span>
              <small className="text-muted ms-2">addresses</small>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-12">
          <div className="d-grid gap-2">
            <button 
              type="button" 
              className="btn btn-success btn-lg"
              onClick={onCopy}
              disabled={!count}
            >
              <div className="d-flex align-items-center justify-content-center">
                <i className="fas fa-copy me-2"></i>
                <span>Copy All Emails ({count || 0})</span>
              </div>
            </button>

            <div className="dropdown w-100">
              <button 
                className="btn btn-primary btn-lg w-100"
                type="button"
                data-bs-toggle="dropdown"
                disabled={!count}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <i className="fas fa-download me-2"></i>
                  <span>Export Results</span>
                  <i className="fas fa-chevron-down ms-2"></i>
                </div>
              </button>
              <ul className="dropdown-menu w-100">
                <li>
                  <button 
                    className="dropdown-item py-2"
                    onClick={() => onExport('txt')}
                  >
                    <i className="fas fa-file-alt me-2 text-muted"></i>
                    Text File (.txt)
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item py-2"
                    onClick={() => onExport('csv')}
                  >
                    <i className="fas fa-file-csv me-2 text-muted"></i>
                    CSV File (.csv)
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item py-2"
                    onClick={() => onExport('json')}
                  >
                    <i className="fas fa-file-code me-2 text-muted"></i>
                    JSON File (.json)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {copyMessage && (
            <div className="copy-message mt-2">
              <div className="alert alert-success py-2 px-3 mb-0">
                <i className="fas fa-check-circle me-2"></i>
                {copyMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}