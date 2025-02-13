// components/SeparatorOptions.js
const SeparatorOptions = ({ separator, setSeparator, otherSeparator, handleOtherSeparatorChange }) => (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <div className="row">
        <div className="col-md-3">
          <label className="control-label">Separator:</label>
          <select
            name="sep" // Optional in React
            className="form-control"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          >
            <option value="new">New Line</option>
            <option value=", ">Comma</option>
            <option value="|">Pipe</option>
            <option value=": ">Colon</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="control-label">&nbsp;</label>
          <input
            type="text"
            name="othersep" // Optional in React
            placeholder="Other Separator"
            className="form-control"
            size="3"
            value={otherSeparator}
            onChange={handleOtherSeparatorChange}
            disabled={separator!== 'other'}
          />
        </div>
      </div>
    </div>
  );
  
  export default SeparatorOptions;