import { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { chunk } from 'lodash';
import InputOutput from './InputOutput';
import OutputOptions from './OutputOptions';
import FilterOptions from './FilterOptions';

const customFilters = {
  removeTemp: (email) => !email.includes('temp') && !email.includes('disposable'),
  removeRole: (email) => !(/^(admin|info|support|contact|sales)@/).test(email),
  removeShort: (email) => email.split('@')[0].length > 3,
  removeFree: (email) => !/(gmail|yahoo|hotmail|outlook)\.com$/.test(email)
};

const applyCustomFilters = (emails, selectedFilters) => {
  return emails.filter(email => 
    selectedFilters.every(filterName => customFilters[filterName](email))
  );
};

const EXPORT_FORMATS = {
  csv: { mime: 'text/csv', ext: '.csv' },
  json: { mime: 'application/json', ext: '.json' },
  txt: { mime: 'text/plain', ext: '.txt' }
};

export default function EmailForm() {
  const [formData, setFormData] = useState({
    input: '',
    output: '',
    count: '0',
    sep: 'new',
    othersep: '',
    sort: false,
    RemoveNumeric: false,
    lowcase: true,
    groupby: '',
    address_type: 'email',
    filter_type: '1',
    string: '',
    UseKeyword: true, // Enable by default
    RemoveKeywords: 'whois,domain,dns,proxy,priv,regi,webmaster,protc,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com', // Default keywords
    showDomainStats: false,
    excludeDomains: [],
    minDomainFrequency: 1,
    searchText: '',
    replaceText: '',
    useRegex: false,
    caseSensitive: false,
  });

  const [copyMessage, setCopyMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const abortController = useRef(null);

  const processEmailsInChunks = async (text) => {
    const chunkSize = 100000; // Increased chunk size for better performance
    const totalLength = text.length;
    const emailSet = new Set();
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  
    for (let i = 0; i < totalLength; i += chunkSize) {
      if (abortController.current?.signal.aborted) {
        throw new Error('Processing cancelled');
      }
  
      const chunk = text.slice(i, i + chunkSize);
      const matches = chunk.match(emailPattern) || [];
      matches.forEach(email => emailSet.add(email));
  
      // Update progress
      setProgress(Math.round((i + chunkSize) / totalLength * 100));
  
      // Allow UI to update and garbage collection
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  
    return Array.from(emailSet);
  };

  const handleExtract = async () => {
    try {
      setIsProcessing(true);
      setProgress(0);
      
      // Create new abort controller
      abortController.current = new AbortController();

      const text = formData.input;
      if (!text) {
        setFormData(prev => ({ ...prev, output: '', count: '' }));
        return;
      }

      const emails = await processEmailsInChunks(text);

      // Apply filters
      let filteredEmails = emails;

      // Apply keyword filtering if enabled
      if (formData.UseKeyword && formData.RemoveKeywords.trim()) {
        const keywords = formData.RemoveKeywords.toLowerCase().split(',').map(k => k.trim());
        filteredEmails = filteredEmails.filter(email => 
          !keywords.some(keyword => email.toLowerCase().includes(keyword))
        );
      }

      // Sort if needed
      if (formData.sort) {
        filteredEmails.sort();
      }

      // Convert to lowercase if needed
      if (formData.lowcase) {
        filteredEmails = filteredEmails.map(email => email.toLowerCase());
      }

      // Format output
      const separator = formData.sep === 'other' ? formData.othersep 
        : formData.sep === 'new' ? '\n' 
        : formData.sep;

      const finalOutput = filteredEmails.join(separator);

      setFormData(prev => ({
        ...prev,
        output: finalOutput,
        count: filteredEmails.length.toString()
      }));
    } catch (error) {
      if (error.message !== 'Processing cancelled') {
        setError('Error processing emails: ' + error.message);
      }
    } finally {
      setIsProcessing(false);
      setProgress(0);
      abortController.current = null;
    }
  };

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
  };

  // Debounce input changes for better performance
  const debouncedHandleInputChange = useCallback(
    debounce((name, value) => {
      setFormData(prev => ({ ...prev, [name]: value }));
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    // Remove size limit check and directly update state
    debouncedHandleInputChange(name, finalValue);
  };

  const getDomainStats = (emails) => {
    try {
      const domainCounts = emails.reduce((acc, email) => {
        const domain = email.split('@')[1]?.toLowerCase();
        if (domain) {
          acc[domain] = (acc[domain] || 0) + 1;
        }
        return acc;
      }, {});
      
      const stats = Object.entries(domainCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([domain, count]) => ({ 
          domain, 
          count,
          percentage: ((count / emails.length) * 100).toFixed(1)
        }));

      return {
        stats,
        totalDomains: Object.keys(domainCounts).length,
        topDomain: stats[0]
      };
    } catch (error) {
      console.error('Error calculating domain stats:', error);
      return null;
    }
  };

  const handleReset = (e) => {
    e.preventDefault(); // Prevent form submission
    setFormData(prev => ({
      ...prev,
      input: '',
      output: '',
      count: ''
    }));
    setCopyMessage('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formData.output);
      return true;
    } catch (error) {
      console.error('Copy failed:', error);
      return false;
    }
  };

  const handleExport = (format) => {
    if (!EXPORT_FORMATS[format]) {
      setError('Invalid export format');
      return;
    }
  
    const emails = formData.output.split(/[\n,]/).filter(Boolean);
    if (!emails.length) {
      setError('No emails to export');
      return;
    }
  
    try {
      const { mime, ext } = EXPORT_FORMATS[format];
      let content = '';
      
      switch (format) {
        case 'json':
          content = JSON.stringify({ emails }, null, 2);
          break;
        case 'csv':
          content = 'Email Address\n' + emails.join('\n');
          break;
        default:
          content = emails.join('\n');
      }
  
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `email-addresses-${timestamp}${ext}`;
      
      downloadFile(content, filename, mime);
    } catch (error) {
      setError('Error exporting file: ' + error.message);
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    try {
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
    } finally {
      window.URL.revokeObjectURL(url);
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }
  };

  const handleSearchReplace = () => {
    let emails = formData.output.split('\n');
    const { searchText, replaceText, useRegex, caseSensitive } = formData;
    
    if (useRegex) {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(searchText, flags);
      emails = emails.map(email => email.replace(regex, replaceText));
    } else {
      emails = emails.map(email => {
        if (caseSensitive) {
          return email.replaceAll(searchText, replaceText);
        }
        return email.replace(new RegExp(searchText, 'gi'), replaceText);
      });
    }
    
    setFormData(prev => ({
      ...prev,
      output: emails.join('\n')
    }));
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      if (file.type === 'application/json') {
        const text = await file.text();
        const emails = JSON.parse(text);
        setFormData(prev => ({
          ...prev,
          input: Array.isArray(emails) ? emails.join('\n') : emails
        }));
      } else {
        const text = await file.text();
        setFormData(prev => ({
          ...prev,
          input: text
        }));
      }
    } catch (error) {
      console.error('Error importing file:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      setFormData(prev => ({
        ...prev,
        input: text
      }));
    } catch (error) {
      setError('Error reading file. Please make sure it\'s a valid text or CSV file.');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleExtract();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {isProcessing && (
        <div className="alert alert-info mb-3">
          <div className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Processing...</span>
            </div>
            <div>Processing emails... {progress}%</div>
          </div>
          <div className="progress mt-2" style={{ height: '3px' }}>
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${progress}%` }}
              aria-valuenow={progress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            />
          </div>
        </div>
      )}

      <InputOutput
        formData={formData}
        handleInputChange={handleInputChange}
        handleExtract={handleExtract}
        handleReset={handleReset}
        onCopy={handleCopy}
        handleExport={handleExport}
        isProcessing={isProcessing}
      />

      <div className="form-text mt-3 mb-3 p-2 bg-light rounded">
        <i className="fas fa-keyboard me-2"></i>
        Pro tip: &nbsp; Use <kbd className="ms-1 me-1">Ctrl</kbd> + <kbd>Enter</kbd> to extract emails quickly
      </div>

      <OutputOptions formData={formData} handleInputChange={handleInputChange} />
      <FilterOptions formData={formData} handleInputChange={handleInputChange} />
    </form>
  );
}