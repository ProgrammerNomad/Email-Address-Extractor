export default function FilterOptions({ formData, handleInputChange }) {
  return (
    <div className="card mb-4 filter-options">
      <div className="card-header bg-light">
        <h5 className="mb-0">
          <i className="fas fa-filter text-primary me-2"></i>
          Filter Options
        </h5>
        <p className="text-muted small mb-0">Refine your email extraction results</p>
      </div>
      <div className="card-body">
        <div className="row g-4">
          {/* Address Type Selection */}
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label className="form-label fw-medium">
                <i className="fas fa-at text-info me-2"></i>
                Type of Address
              </label>
              <select 
                name="address_type" 
                className="form-select"
                value={formData.address_type}
                onChange={handleInputChange}
              >
                <option value="email">Email Addresses</option>
                <option value="web">Web URLs</option>
              </select>
            </div>
          </div>

          {/* Filter Type */}
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label className="form-label fw-medium">
                <i className="fas fa-funnel-dollar text-success me-2"></i>
                Filter Type
              </label>
              <select 
                name="filter_type" 
                className="form-select"
                value={formData.filter_type}
                onChange={handleInputChange}
              >
                <option value="1">Include Only</option>
                <option value="0">Exclude All</option>
              </select>
            </div>
          </div>

          {/* String Filter */}
          <div className="col-md-12 col-lg-4">
            <div className="form-group">
              <label className="form-label fw-medium">
                <i className="fas fa-search text-warning me-2"></i>
                Search String
              </label>
              <input 
                type="text"
                name="string"
                className="form-control"
                placeholder="Enter text to filter by"
                value={formData.string}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Keyword Filter */}
          <div className="col-12">
            <div className="keyword-filter-section p-3 bg-light rounded">
              <div className="d-flex align-items-center mb-3">
                <div className="form-check form-switch">
                  <input 
                    type="checkbox"
                    name="UseKeyword"
                    id="useKeywordFilter"
                    className="form-check-input"
                    checked={formData.UseKeyword}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label fw-medium" htmlFor="useKeywordFilter">
                    <i className="fas fa-shield-alt text-danger me-2"></i>
                    Enable Keyword Filtering
                  </label>
                </div>
              </div>
              
              {formData.UseKeyword && (
                <div className="keyword-input-area">
                  <label className="form-label">Remove addresses containing these keywords:</label>
                  <textarea 
                    name="RemoveKeywords"
                    className="form-control"
                    rows="3"
                    placeholder="Enter keywords separated by commas"
                    value={formData.RemoveKeywords}
                    onChange={handleInputChange}
                  />
                  <small className="text-muted mt-2 d-block">
                    <i className="fas fa-info-circle me-1"></i>
                    Separate keywords with commas. Example: spam, temp, proxy
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}