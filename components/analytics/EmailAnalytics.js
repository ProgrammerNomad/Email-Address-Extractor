export default function EmailAnalytics({ emails }) {
  const domains = emails.reduce((acc, email) => {
    const domain = email.split('@')[1];
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="email-analytics mt-4">
      <h4>Email Analysis</h4>
      <div className="row">
        <div className="col-md-6">
          <h5>Top Domains</h5>
          {Object.entries(domains)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([domain, count]) => (
              <div key={domain} className="d-flex justify-content-between">
                <span>{domain}</span>
                <span>{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}