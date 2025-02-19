import FeatureSection from './FeatureSection';
import { useTheme } from 'next-themes';

const featuresList = [
  {
    icon: 'fa-bolt',
    title: 'Fast & Efficient',
    description: 'Extract thousands of emails in seconds with our optimized algorithm',
    color: 'text-warning'
  },
  {
    icon: 'fa-shield-alt',
    title: 'Smart Filtering',
    description: 'Remove unwanted and spam emails automatically',
    color: 'text-primary'
  },
  {
    icon: 'fa-file-export',
    title: 'Multiple Formats',
    description: 'Export results in TXT, CSV, or JSON formats',
    color: 'text-success'
  },
  {
    icon: 'fa-sort-alpha-down',
    title: 'Auto Sorting',
    description: 'Organize emails alphabetically with one click',
    color: 'text-info'
  },
  {
    icon: 'fa-fingerprint',
    title: 'Duplicate Prevention',
    description: 'Automatically removes duplicate email addresses',
    color: 'text-purple'
  },
  {
    icon: 'fa-filter',
    title: 'Advanced Filtering',
    description: 'Customize filters to match your exact needs',
    color: 'text-danger'
  }
];

export default function Features() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="features-section py-5" aria-labelledby="features-heading">
      <div className="container">
        <div className="text-center mb-5">
          <h2 id="features-heading" className="display-6 fw-bold mb-3">
            Powerful Features
          </h2>
          <p className={`lead mb-0 ${isDark ? 'text-light' : 'text-secondary'}`}>
            Everything you need to extract and manage email addresses effectively
          </p>
        </div>

        <div className="row g-4">
          {featuresList.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div 
                className={`feature-card h-100 p-4 rounded-3 ${
                  isDark ? 'bg-dark border border-secondary' : 'bg-light'
                }`}
              >
                <div className="d-flex align-items-center mb-3">
                  <div className={`feature-icon rounded-circle ${feature.color}`}>
                    <i className={`fas ${feature.icon} fa-lg`}></i>
                  </div>
                  <h3 className="h5 mb-0 ms-3">{feature.title}</h3>
                </div>
                <p className={`mb-0 ${isDark ? 'text-light' : 'text-secondary'}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}