// components/FilterOptions.js
const FilterOptions = ({
    addressType,
    setAddressType,
    filterType,
    setFilterType,
    stringFilter,
    setStringFilter,
  }) => (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <h4>Filter Option</h4>
      <p>More Options</p>
      <div className="row">
        <div className="col-md-3">
          <label className="control-label">Type of address to extract:</label>
          <select
            name="address_type"
            className="form-control"
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="web">URL</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="control-label">&nbsp;</label>
          <select
            name="filter_type"
            className="form-control"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="1">Only</option>
            <option value="0">Do not</option>
          </select>
        </div>
        <div className="col-md-7">
          <label className="control-label">
            Extract address containing this string:
          </label>
          <textarea
            name="string"
            className="form-control"
            value={stringFilter}
            onChange={(e) => setStringFilter(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
  
  export default FilterOptions;