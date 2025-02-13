// components/FormButtons.js
const FormButtons = ({ handleExtractEmails, handleReset, handleCopyMails, emailCount }) => (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <div className="row"> {/* Added a row for better layout */}
        <div className="col-md-3">
          <input
            type="button"
            className="btn btn-info btn-block"
            value="Extract"
            onClick={handleExtractEmails}
          />
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-danger btn-block" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="col-md-3">
          <label className="control-label">Number of addresses detected:</label>
          <input
            name="count"
            size="5"
            readOnly
            className="form-control"
            value={emailCount}
          />
        </div>
        <div className="col-md-3">
          <label className="control-label">&nbsp;</label>
          <button type="button" className="btn btn-success btn-block" onClick={handleCopyMails}>
            Copy Mails
          </button>
        </div>
      </div> {/* Close the row */}
    </div>
  );
  
  export default FormButtons;