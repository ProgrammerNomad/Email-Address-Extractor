// components/CheckboxOptions.js
const CheckboxOptions = ({ sort, setSort, removeNumeric, setRemoveNumeric }) => (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <div className="row">
        <div className="col-md-2 col-sm-6 col-md-2">
          <label htmlFor="sortbox">Sort Alphabetically</label>
          <div className="checkbox">
            <input
              type="checkbox"
              name="sort"
              className="form-control"
              id="sortbox"
              checked={sort}
              onChange={(e) => setSort(e.target.checked)}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-md-6">
          <label htmlFor="RemoveNumeric">Remove numeric domains</label>
          <div className="checkbox">
            <input
              type="checkbox"
              name="RemoveNumeric"
              className="form-control"
              id="RemoveNumeric"
              checked={removeNumeric}
              onChange={(e) => setRemoveNumeric(e.target.checked)}
            />
          </div>
        </div>
        <div className="col-md-2 col-sm-4">
          <label className="control-label">To Lowercase?</label>
          <div className="checkbox">
            <input
              type="checkbox"
              name="lowcase"
              className="form-control"
              id="casebox"
              defaultChecked // You can control this with state if needed
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  export default CheckboxOptions;