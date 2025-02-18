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
    // Your email extraction logic here
    // After extraction, update formData.output and formData.count
  };

  const handleReset = () => {
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