export default function OutputOptions({ formData, handleInputChange }) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4 className="mb-0">Output Options</h4>
        <p className="text-muted small mb-0">Data output control for refining much better</p>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Separator:</label>
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
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">&nbsp;</label>
            <input 
              type="text" 
              name="othersep" 
              placeholder="Other Separator" 
              className="form-control"
              value={formData.othersep}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <div className="form-check mt-4">
              <input 
                type="checkbox" 
                name="sort" 
                className="form-check-input" 
                id="sortbox"
                checked={formData.sort}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="sortbox">
                Sort Alphabetically
              </label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check mt-4">
              <input 
                type="checkbox" 
                name="RemoveNumeric" 
                className="form-check-input" 
                id="RemoveNumeric"
                checked={formData.RemoveNumeric}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="RemoveNumeric">
                Remove numeric domains
              </label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check mt-4">
              <input 
                type="checkbox" 
                name="lowcase" 
                className="form-check-input" 
                id="casebox"
                checked={formData.lowcase}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="casebox">
                Convert to lowercase
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}