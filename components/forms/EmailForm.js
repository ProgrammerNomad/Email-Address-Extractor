import { useState } from 'react';
import InputOutput from './InputOutput';
import OutputOptions from './OutputOptions';
import FilterOptions from './FilterOptions';

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
    RemoveKeywords: 'whois,domain,dns,proxy,priv,regi,webmaster,protc,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com'
  });

  const [copyMessage, setCopyMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExtract = () => {
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

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputOutput 
        formData={formData}
        handleInputChange={handleInputChange}
        handleExtract={handleExtract}
        handleReset={handleReset}
        handleCopy={handleCopy}
        copyMessage={copyMessage}
      />
      <OutputOptions formData={formData} handleInputChange={handleInputChange} />
      <FilterOptions formData={formData} handleInputChange={handleInputChange} />
    </form>
  );
}