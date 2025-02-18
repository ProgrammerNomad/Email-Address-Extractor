export default function FilterOptions({ formData, handleInputChange }) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4 className="mb-0">Filter Options</h4>
        <p className="text-muted small mb-0">More Options</p>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Type of address to extract:</label>
            <select 
              name="address_type" 
              className="form-select"
              value={formData.address_type}
              onChange={handleInputChange}
            >
              <option value="email">Email</option>
              <option value="web">URL</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            <select 
              name="filter_type" 
              className="form-select"
              value={formData.filter_type}
              onChange={handleInputChange}
            >
              <option value="1">Only</option>
              <option value="0">Do not</option>
            </select>
          </div>
          <div className="col-md-7">
            <label className="form-label">Extract address containing this string:</label>
            <textarea 
              name="string" 
              className="form-control"
              rows="1"
              value={formData.string}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row g-3 mt-2">
          <div className="col-12">
            <div className="form-check">
              <input 
                type="checkbox" 
                name="UseKeyword" 
                className="form-check-input" 
                id="UseKeyword"
                checked={formData.UseKeyword}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="UseKeyword">
                Use keyword filter
              </label>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Remove containing keywords address:</label>
            <textarea 
              name="RemoveKeywords" 
              className="form-control"
              rows="2"
              value={formData.RemoveKeywords}
              onChange={handleInputChange}
            />
            <small className="text-muted">
              You can remove existing keywords or add new keyword separating by comma.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}