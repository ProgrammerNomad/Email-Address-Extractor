import { useState } from 'react';
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'groupby') {
      const numberValue = parseInt(value);
      if (value && (isNaN(numberValue) || numberValue < 1)) {
        setError('Group size must be a positive number');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleExtract = () => {
    setIsProcessing(true);
    setError('');
    
    try {
      const text = formData.input;
      if (!text) {
        setFormData(prev => ({ ...prev, output: '', count: '' }));
        return;
      }

      // Email regex pattern
      const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
      
      // Extract emails
      let matches = text.match(emailPattern) || [];

      // Remove duplicates
      matches = [...new Set(matches)];

      // Apply filters
      if (formData.RemoveNumeric) {
        matches = matches.filter(email => !/\d/.test(email.split('@')[1]));
      }

      if (formData.UseKeyword && formData.RemoveKeywords) {
        const keywords = formData.RemoveKeywords.toLowerCase().split(',');
        matches = matches.filter(email => 
          !keywords.some(keyword => email.toLowerCase().includes(keyword.trim()))
        );
      }

      if (formData.string) {
        const searchString = formData.string.toLowerCase();
        matches = formData.filter_type === '1' 
          ? matches.filter(email => email.toLowerCase().includes(searchString))
          : matches.filter(email => !email.toLowerCase().includes(searchString));
      }

      // Sort if needed
      if (formData.sort) {
        matches.sort();
      }

      // Convert to lowercase if needed
      if (formData.lowcase) {
        matches = matches.map(email => email.toLowerCase());
      }

      // Group if specified
      let finalOutput;
      if (formData.groupby && !isNaN(formData.groupby)) {
        const size = parseInt(formData.groupby);
        const groups = matches.reduce((acc, email, i) => {
          if (i % size === 0) acc.push([]);
          acc[Math.floor(i / size)].push(email);
          return acc;
        }, []);
        finalOutput = groups.map(group => group.join('\n')).join('\n');
      } else {
        // Use selected separator or default to new line
        const separator = formData.sep === 'other' ? formData.othersep : 
                         formData.sep === 'new' ? '\n' : 
                         formData.sep;
        finalOutput = matches.join(separator);
      }

      setFormData(prev => ({
        ...prev,
        output: finalOutput,
        count: matches.length.toString()
      }));
    } catch (error) {
      setError('Error processing emails: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
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
      <InputOutput 
        formData={formData}
        handleInputChange={handleInputChange}
        handleExtract={handleExtract}
        handleReset={handleReset}
        handleCopy={handleCopy}
        handleExport={handleExport}
        copyMessage={copyMessage}
      />
      <OutputOptions formData={formData} handleInputChange={handleInputChange} />
      <FilterOptions formData={formData} handleInputChange={handleInputChange} />
    </form>
  );
}