import { useState } from 'react';
import ResultActions from './ResultActions';

export default function InputOutput({ 
  formData, 
  handleInputChange, 
  handleExtract,
  handleReset,
  handleCopy,
  handleExport,
  isProcessing 
}) {
  const [copyMessage, setCopyMessage] = useState('');
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      handleInputChange({
        target: {
          name: 'input',
          value: text
        }
      });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const handleExportFormat = (format) => {
    const emails = formData.output.split('\n').filter(Boolean);
    let content = '';
    let filename = `emails-${new Date().toISOString().slice(0,10)}`;
    let mimeType = '';

    switch(format) {
      case 'txt':
        content = emails.join('\n');
        filename += '.txt';
        mimeType = 'text/plain';
        break;
      case 'csv':
        content = 'Email Address\n' + emails.join('\n');
        filename += '.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify({ emails }, null, 2);
        filename += '.json';
        mimeType = 'application/json';
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {formData.UseKeyword && formData.RemoveKeywords && (
        <div className="alert alert-info mb-3">
          <i className="fas fa-filter me-2"></i>
          Filtering emails containing: {formData.RemoveKeywords.split(',').map(k => k.trim()).join(', ')}
        </div>
      )}
      
      {/* Input Section */}
      <div className="mb-4">
        <label htmlFor="inputText" className="form-label">
          Paste your text containing email addresses
        </label>
        <textarea
          id="inputText"
          name="input"
          className="form-control mb-3"
          rows="8"
          value={formData.input}
          onChange={handleInputChange}
          placeholder="Paste your text here or use the upload button below to load content from a file..."
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text mb-3">
          <i className="fas fa-info-circle me-1"></i>
          The tool will automatically extract all email addresses from your text.
        </div>

        <div className="d-flex flex-wrap gap-2 align-items-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExtract}
            disabled={!formData.input.trim() || isProcessing}
          >
            <i className="fas fa-search me-2"></i>
            Extract Email Addresses
          </button>

          <label className="btn btn-outline-secondary mb-0" role="button">
            <i className="fas fa-file-upload me-2"></i>
            Upload File (.txt, .csv)
            <input
              type="file"
              className="d-none"
              accept=".txt,.csv"
              onChange={handleFileUpload}
              aria-label="Upload text or CSV file"
            />
          </label>
        </div>
      </div>

      {/* Output Section - Only shown when there are results */}
      {formData.output && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label htmlFor="outputText" className="form-label mb-0">
              Extracted Email Addresses ({formData.count})
            </label>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-success"
                onClick={handleCopy}
              >
                <i className="fas fa-copy me-2"></i>
                Copy All
              </button>
              <div className="btn-group">
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-download me-2"></i>
                  Export
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleExportFormat('txt')}
                    >
                      <i className="fas fa-file-alt me-2"></i>
                      Text File (.txt)
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleExportFormat('csv')}
                    >
                      <i className="fas fa-file-csv me-2"></i>
                      CSV File (.csv)
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleExportFormat('json')}
                    >
                      <i className="fas fa-file-code me-2"></i>
                      JSON File (.json)
                    </button>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={handleReset}
              >
                <i className="fas fa-trash me-2"></i>
                Reset
              </button>
            </div>
          </div>
          <textarea
            id="outputText"
            className="form-control"
            rows="8"
            value={formData.output}
            readOnly
            aria-label="Extracted email addresses"
          />
          {copyMessage && (
            <div className="text-success mt-2 small">
              <i className="fas fa-check me-1"></i>
              {copyMessage}
            </div>
          )}
        </div>
      )}
    </>
  );
}