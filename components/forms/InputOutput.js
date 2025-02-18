import ResultActions from './ResultActions';

export default function InputOutput({ formData, handleInputChange, handleExtract, handleReset, handleCopy, handleExport, copyMessage }) {
  return (
    <div className="form-group">
      <div className="textarea-container">
        {/* Input textarea */}
        <div className="textarea-wrapper">
          <textarea 
            className="form-control mb-3" 
            rows="10" 
            placeholder="Enter your text here"
            name="input"
            value={formData.input}
            onChange={handleInputChange}
          />
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-primary flex-grow-1"
              onClick={handleExtract}
            >
              <i className="fas fa-magic me-2"></i>
              Extract
            </button>
            <button 
              type="button" 
              className="btn btn-outline-danger flex-grow-1"
              onClick={handleReset}
            >
              <i className="fas fa-undo me-2"></i>
              Reset
            </button>
          </div>
        </div>

        {/* Output textarea */}
        <div className="textarea-wrapper">
          <textarea 
            className="form-control mb-3" 
            rows="10" 
            placeholder="The result will show here"
            name="output"
            value={formData.output}
            readOnly
          />
          <ResultActions 
            count={parseInt(formData.count) || 0}
            onCopy={handleCopy}
            onExport={handleExport}
            copyMessage={copyMessage}
          />
        </div>
      </div>
    </div>
  );
}