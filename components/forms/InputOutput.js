export default function InputOutput({ formData, handleInputChange, handleExtract, handleReset, handleCopy, copyMessage }) {
  return (
    <div className="form-group">
      <div className="textarea-container">
        <div className="textarea-wrapper">
          <textarea 
            className="form-control mb-3" 
            rows="10" 
            placeholder="Enter your text here"
            name="input"
            value={formData.input}
            onChange={handleInputChange}
          />
          <div className="d-flex gap-2 mb-3">
            <button 
              type="button" 
              className="btn btn-primary flex-grow-1"
              onClick={handleExtract}
            >
              Extract
            </button>
            <button 
              type="button" 
              className="btn btn-danger flex-grow-1"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="textarea-wrapper">
          <textarea 
            className="form-control mb-3" 
            rows="10" 
            placeholder="The result will show here"
            name="output"
            value={formData.output}
            readOnly
          />
          <div className="d-flex gap-2 mb-3">
            <div className="flex-grow-1">
              <label className="form-label">Number of addresses detected:</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.count} 
                readOnly 
              />
            </div>
            <div className="d-flex flex-column justify-content-end">
              <button 
                type="button" 
                className="btn btn-success"
                onClick={handleCopy}
              >
                Copy Mails
              </button>
              {copyMessage && (
                <small className="text-success mt-1">{copyMessage}</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}