// components/KeywordFilter.js
const KeywordFilter = ({ useKeyword, setUseKeyword, removeKeywordsText, setRemoveKeywordsText }) => (
    <div className="form-group col-xs-12 col-sm-12 col-md-12">
      <div className="row">
        <div className="col-md-2 col-sm-6">
          <label htmlFor="UseKeyword">Use keyword fitter</label>
          <div className="checkbox">
            <input
              type="checkbox"
              name="UseKeyword" // Optional in React
              className="form-control"
              id="UseKeyword"
              checked={useKeyword}
              onChange={(e) => setUseKeyword(e.target.checked)}
            />
          </div>
        </div>
        <div className="col-md-10 col-sm-6">
          <label className="control-label">
            Remove containing keywords address:
          </label>
          <textarea
            name="RemoveKeywords" // Optional in React
            className="form-control"
            value={removeKeywordsText}
            onChange={(e) => setRemoveKeywordsText(e.target.value)}
          >
            whois,domain,dns,proxy,priv,regi,webmaster,protc,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com
          </textarea>{" "}
          <small>
            You can remove existing keywords or add new keyword separating by
            comma.
          </small>
        </div>
      </div>
    </div>
  );
  
  export default KeywordFilter;