export default function OutputOptions({ formData, handleInputChange }) {
  return (
    <div className="card mb-4 output-options">
      <div className="card-header bg-light">
        <h5 className="mb-0">
          <i className="fas fa-cog text-primary me-2"></i>
          Output Options
        </h5>
        <p className="text-muted small mb-0">Customize how your extracted emails appear</p>
      </div>
      <div className="card-body">
        <div className="row g-4">
          {/* Separator Options */}
          <div className="col-md-6 col-lg-3">
            <div className="form-group">
              <label className="form-label fw-medium">
                <i className="fas fa-list text-primary me-2"></i>
                Separator
              </label>
              <select 
                name="sep" 
                className="form-select"
                value={formData.sep}
                onChange={handleInputChange}
              >
                <option value="new">New Line</option>
                <option value=", ">Comma</option>
                <option value="|">Pipe</option>
                <option value=" : ">Colon</option>
                <option value="other">Custom</option>
              </select>
              {formData.sep === 'other' && (
                <input 
                  type="text" 
                  name="othersep" 
                  className="form-control mt-2"
                  placeholder="Enter custom separator"
                  value={formData.othersep}
                  onChange={handleInputChange}
                />
              )}
            </div>
          </div>

          {/* Group Options */}
          <div className="col-md-6 col-lg-3">
            <div className="form-group">
              <label className="form-label fw-medium">
                <i className="fas fa-layer-group text-success me-2"></i>
                Group Size
              </label>
              <input 
                type="number" 
                name="groupby"
                className="form-control"
                placeholder="Enter group size"
                value={formData.groupby}
                onChange={handleInputChange}
                min="1"
              />
              <small className="text-muted d-block mt-1">
                Leave empty for no grouping
              </small>
            </div>
          </div>

          {/* Formatting Options */}
          <div className="col-md-12 col-lg-6">
            <label className="form-label fw-medium mb-3">
              <i className="fas fa-text-height text-info me-2"></i>
              Formatting Options
            </label>
            <div className="d-flex flex-wrap gap-4">
              <div className="form-check">
                <input 
                  type="checkbox"
                  name="sort"
                  id="sortCheckbox"
                  className="form-check-input"
                  checked={formData.sort}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="sortCheckbox">
                  Sort Alphabetically
                </label>
              </div>
              
              <div className="form-check">
                <input 
                  type="checkbox"
                  name="RemoveNumeric"
                  id="numericCheckbox"
                  className="form-check-input"
                  checked={formData.RemoveNumeric}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="numericCheckbox">
                  Remove Numeric Domains
                </label>
              </div>
              
              <div className="form-check">
                <input 
                  type="checkbox"
                  name="lowcase"
                  id="lowcaseCheckbox"
                  className="form-check-input"
                  checked={formData.lowcase}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="lowcaseCheckbox">
                  Convert to Lowercase
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}