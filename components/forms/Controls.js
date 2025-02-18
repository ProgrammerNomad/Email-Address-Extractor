export default function Controls({ formData, setCopyMessage }) {
  const handleExtract = () => {
    // Add your email extraction logic here
  };

  const handleCopy = () => {
    if (formData.output.length < 1) {
      setCopyMessage("No mails to copy");
      return;
    }
    navigator.clipboard.writeText(formData.output);
    setCopyMessage("The addresses have been copied to clipboard");
  };

  return (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <div className="col-md-3">
        <label className="control-label">
          <a href="#" onClick={() => alert('Help content here')}>
            <em>Need help?</em>
          </a>
        </label>
        <button 
          type="button" 
          className="btn btn-info btn-block"
          onClick={handleExtract}
        >
          Extract
        </button>
      </div>
      <div className="col-md-3">
        <label className="control-label">&nbsp;</label>
        <button 
          type="reset" 
          className="btn btn-danger btn-block"
        >
          Reset
        </button>
      </div>
      <div className="col-md-3">
        <label className="control-label">Number of addresses detected:</label>
        <input 
          name="count" 
          value={formData.count}
          readOnly 
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <label className="control-label">&nbsp;</label>
        <button 
          type="button" 
          className="btn btn-success btn-block"
          onClick={handleCopy}
        >
          Copy Mails
        </button>
      </div>
    </div>
  );
}