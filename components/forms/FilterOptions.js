import { useEffect } from 'react';

// Define default keywords
const defaultKeywords = [
  'temp', 'test', 'spam', 'disposable', 'example', 'invalid', 'delete', 'removed', 'fake',
  'whois', 'domain', 'dns', 'proxy', 'priv', 'regi', 'webmaster', 'protc', 'obsc', 
  'anonymiz', '@contac', 'host', 'gandi', 'support', 'qq.com', 'naver.com', 'hxmail.com', 
  'pro.net', 'xell.hk', 'corp.com'
].sort();

export default function FilterOptions({ formData, handleInputChange }) {
  useEffect(() => {
    if (!formData.RemoveKeywords) {
      handleInputChange({
        target: {
          name: 'RemoveKeywords',
          value: defaultKeywords.join(', ')
        }
      });
      handleInputChange({
        target: {
          name: 'UseKeyword',
          type: 'checkbox',
          checked: true
        }
      });
    }
  }, []);

  return (
    <div className="card mb-3">
      <div className="card-header bg-light">
        <h3 className="h6 mb-0">
          <i className="fas fa-filter me-2"></i>
          Filter Options
        </h3>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="UseKeyword"
                name="UseKeyword"
                checked={formData.UseKeyword}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="UseKeyword">
                Enable Keyword Filtering
              </label>
              <small className="text-muted d-block mt-1">
                <i className="fas fa-info-circle me-1"></i>
                Removes emails containing common spam or temporary email keywords
              </small>
            </div>
          </div>
          
          {formData.UseKeyword && (
            <div className="col-12">
              <label htmlFor="RemoveKeywords" className="form-label d-flex justify-content-between">
                <span>Remove emails containing these keywords (comma separated)</span>
                <small className="text-muted">Default keywords provided</small>
              </label>
              <textarea
                id="RemoveKeywords"
                name="RemoveKeywords"
                className="form-control"
                rows="3"
                value={formData.RemoveKeywords}
                onChange={handleInputChange}
                placeholder="e.g., spam, temp, disposable"
              />
              <small className="text-muted d-block mt-1">
                <i className="fas fa-lightbulb me-1"></i>
                Add or modify keywords to customize filtering
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}