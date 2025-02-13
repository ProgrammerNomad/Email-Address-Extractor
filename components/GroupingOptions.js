// components/GroupingOptions.js
const GroupingOptions = ({ groupByValue, handleGroupByChange }) => (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <div className="row">
        <div className="col-md-4">
          <label className="control-label">Group:</label>
          <input
            type="text"
            size="3"
            placeholder="Ex. 50"
            name="groupby" // You might not need this name attribute in React
            className="form-control"
            value={groupByValue}
            onChange={handleGroupByChange}
          />{" "}
          Addresses <small>(groups will be seperated by new paragraph)</small>
        </div>
      </div>
    </div>
  );
  
  export default GroupingOptions;