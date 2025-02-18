import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
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
    count: '',
    sep: 'new',
    othersep: '',
    sort: false,
    RemoveNumeric: false,
    lowcase: true,
    groupby: '',
    address_type: 'email',
    filter_type: '1',
    string: '',
    UseKeyword: false,
    RemoveKeywords: 'whois,domain,dns,proxy,priv,regi,webmaster,protc,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com',
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
  const [error, setError] = useState('');

  // Process emails in chunks to prevent UI freezing
  const processEmailsInChunks = (text, chunkSize = 1000) => {
    return new Promise((resolve) => {
      const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
      const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
      const allEmails = new Set();

      let currentChunk = 0;

      const processChunk = () => {
        if (currentChunk >= chunks.length) {
          resolve(Array.from(allEmails));
          return;
        }

        const chunk = chunks[currentChunk];
        const matches = chunk.match(emailPattern) || [];
        matches.forEach(email => allEmails.add(email));

        currentChunk++;
        setTimeout(processChunk, 0); // Allow UI to update between chunks
      };

      processChunk();
    });
  };

  const handleExtract = async () => {
    try {
      setIsProcessing(true);
      setError('');

      const text = formData.input;
      if (!text) {
        setFormData(prev => ({ ...prev, output: '', count: '' }));
        return;
      }

      // Process emails in chunks
      const emails = await processEmailsInChunks(text);

      // Apply filters
      let filteredEmails = emails;

      if (formData.RemoveNumeric) {
        filteredEmails = filteredEmails.filter(email => !/\d/.test(email.split('@')[1]));
      }

      if (formData.UseKeyword && formData.RemoveKeywords) {
        const keywords = formData.RemoveKeywords.toLowerCase().split(',');
        filteredEmails = filteredEmails.filter(email => 
          !keywords.some(keyword => email.toLowerCase().includes(keyword.trim()))
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
      setError('Error processing emails: ' + error.message);
    } finally {
      setIsProcessing(false);
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
    
    if (name === 'input' && value.length > 1000000) {
      setError('Input text is too large. Please reduce the size.');
      return;
    }

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

  const handleCopy = () => {
    if (formData.output.length < 1) {
      setCopyMessage("No mails to copy");
      return;
    }
    navigator.clipboard.writeText(formData.output);
    setCopyMessage("The addresses have been copied to clipboard");
  };

  const handleExport = (format) => {
    if (!EXPORT_FORMATS[format]) {
      setError('Invalid export format');
      return;
    }
  
    const emails = formData.output.split('\n').filter(Boolean);
    if (!emails.length) {
      setError('No emails to export');
      return;
    }
  
    try {
      const { mime, ext } = EXPORT_FORMATS[format];
      const content = format === 'json' 
        ? JSON.stringify(emails, null, 2)
        : format === 'csv' 
          ? emails.join(',')
          : emails.join('\n');
  
      downloadFile(content, `emails${ext}`, mime);
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
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}
      {isProcessing && (
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Processing...</span>
          </div>
          Processing large text... Please wait
        </div>
      )}
      <InputOutput 
        formData={formData}
        handleInputChange={handleInputChange}
        handleExtract={handleExtract}
        handleReset={handleReset}
        handleCopy={handleCopy}
        handleExport={handleExport}
        copyMessage={copyMessage}
        isProcessing={isProcessing}
      />
      <OutputOptions formData={formData} handleInputChange={handleInputChange} />
      <FilterOptions formData={formData} handleInputChange={handleInputChange} />
    </form>
  );
}