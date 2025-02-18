import FeatureSection from './FeatureSection';

export default function Features() {
  const features = [
    {
      title: 'No duplicates',
      description: 'This tool extracts email addresses <strong>without repeating</strong> the same email, <strong>100% no duplication</strong>',
      icon: 'fa-fingerprint', // Changed from fa-files-o to fa-fingerprint for uniqueness
      variant: 'a',
      isReverse: false
    },
    {
      title: 'Counts of emails',
      description: 'After email address extraction, it shows <strong>how many</strong> clean extracted email addresses were found.',
      icon: 'fa-list-ol',
      variant: 'b',
      isReverse: true
    },
    {
      title: 'Different separator',
      description: 'This tool offers you to use many separators as <strong>comma, pipe, colon, space, etc</strong>. Even we have a powerful option here you can use your own separator.',
      icon: 'fa-arrows-alt',
      variant: 'c',
      isReverse: false
    },
    {
      title: 'Generates in groups',
      description: 'Group emails by number specified by you. <strong>Each group</strong> is separated by new line.',
      icon: 'fa-object-group',
      variant: 'd',
      isReverse: true
    },
    {
      title: 'Sort emails alphabetically',
      description: 'This also sorts emails alphabetically. If you want to use this feature, simply check the <strong>Sort Alphabetically</strong> checkbox.',
      icon: 'fa-sort-alpha-asc',
      variant: 'e',
      isReverse: false
    },
    {
      title: 'Advanced Filtering',
      description: 'Option to extract or exclude email containing only <strong>certain string</strong>. Option to extract <strong>web addresses</strong> instead of email addresses.',
      icon: 'fa-filter',
      variant: 'f',
      isReverse: true
    },
    {
      title: 'Keyword Filtering',
      description: 'Remove unwanted emails using keyword filters. Perfect for <strong>cleaning spam</strong> and unwanted domain addresses.',
      icon: 'fa-shield-alt',
      variant: 'g',
      isReverse: false
    },
    {
      title: 'Case Conversion',
      description: 'Convert all email addresses to lowercase for <strong>consistency</strong> and better organization.',
      icon: 'fa-text-height',
      variant: 'h',
      isReverse: true
    }
  ];

  return (
    <section className="features-section py-5">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 text-center">
            <header className="section-heading">
              <h2 className="title-text display-5 fw-bold mb-3">Email Address Extractor</h2>
              <p className="sub-title lead text-secondary">
                Extract email addresses from any text with this free utility. 
                Simply copy, paste and start extracting.
              </p>
            </header>
          </div>
        </div>
        
        {features.map((feature, index) => (
          <FeatureSection key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}