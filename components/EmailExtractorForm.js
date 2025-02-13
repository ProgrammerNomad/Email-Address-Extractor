// components/EmailExtractorForm.js
import { useState, useRef } from 'react';
import InputOutput from './InputOutput';
import SeparatorOptions from './SeparatorOptions';
import CheckboxOptions from './CheckboxOptions';
import GroupingOptions from './GroupingOptions';
import FilterOptions from './FilterOptions';
import KeywordFilter from './KeywordFilter';
import FormButtons from './FormButtons';

const EmailExtractorForm = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [emailCount, setEmailCount] = useState(0);
    const [separator, setSeparator] = useState('new');
    const [otherSeparator, setOtherSeparator] = useState('');
    const [sort, setSort] = useState(false);
    const [removeNumeric, setRemoveNumeric] = useState(false);
    const [groupByValue, setGroupByValue] = useState('');
    const [addressType, setAddressType] = useState('email');
    const [filterType, setFilterType] = useState('1');
    const [stringFilter, setStringFilter] = useState('');
    const [useKeyword, setUseKeyword] = useState(false);
    const [removeKeywordsText, setRemoveKeywordsText] = useState(
        'whois,domain,dns,proxy,priv,regi,webmaster,protc,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com'
    );
    const outputRef = useRef(null);

    const findEmails = (input) => {
        const sep = separator === 'new'? '\n': separator === 'other'? otherSeparator: separator;
        const removeKeywords = removeKeywordsText.replace(/ /g, '').split(',');

        let emailRegex;
        if (addressType === 'web') {
            emailRegex = /([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_%&\?\/.=]+)/gi;
        } else {
            emailRegex = removeNumeric
              ? /([a-zA-Z._-]+@[a-zA-Z._-]+\.[a-zA-Z._-]+)/gi
              : /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        }

        const rawEmails = input.match(emailRegex) ||;
        const uniqueEmails = [...new Set(rawEmails)];

        const filteredEmails = uniqueEmails.filter((email) => {
            const shouldInclude = filterType === '1'? email.includes(stringFilter):!email.includes(stringFilter);
            let shouldKeep = true;
            if (useKeyword) {
                shouldKeep =!removeKeywords.some((keyword) => email.includes(keyword));
            }
            return shouldInclude && shouldKeep;
        });

        if (sort) {
            filteredEmails.sort();
        }

        let email = '';
        let inGroup = 0;

        for (const emailAddress of filteredEmails) {
            if (inGroup!== 0) {
                email += sep;
            }
            email += emailAddress;
            inGroup++;

            if (groupByValue && inGroup === parseInt(groupByValue, 10)) {
                // Parse to int
                email += '\n\n';
                inGroup = 0;
            }
        }

        return email;
    };

    const handleExtractEmails = () => {
        const extracted = findEmails(inputText);
        setOutputText(extracted);
        setEmailCount(extracted.split('\n').length);
    };

    const handleCopyMails = () => {
        if (outputText.length < 1) {
            alert('No mails to copy');
            return;
        }
        navigator.clipboard.writeText(outputText)
          .then(() => {
                alert('The addresses have been copied to clipboard');
            })
          .catch((err) => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy');
            });
    };

    const handleReset = () => {
        setInputText('');
        setOutputText('');
        setEmailCount(0);
        setSeparator('new');
        setOtherSeparator('');
        setSort(false);
        setRemoveNumeric(false);
        setGroupByValue('');
        setAddressType('email');
        setFilterType('1');
        setStringFilter('');
        setUseKeyword(false);
        setRemoveKeywordsText(
            'whois,domain,dns,proxy,priv,regi,webmaster,protc,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com'
        );
    };

    const handleOtherSeparatorChange = (e) => {
        setOtherSeparator(e.target.value);
        if (e.target.value) {
            setSeparator('other');
        }
    };

    const handleGroupByChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setGroupByValue(value);
        }
    };

    return (
        <form name="extractor">
            <InputOutput
                inputText={inputText}
                setInputText={setInputText}
                outputText={outputText}
                outputRef={outputRef}
            />

            <FormButtons
                handleExtractEmails={handleExtractEmails}
                handleReset={handleReset}
                handleCopyMails={handleCopyMails}
                emailCount={emailCount}
            />

            <SeparatorOptions
                separator={separator}
                setSeparator={setSeparator}
                otherSeparator={otherSeparator}
                handleOtherSeparatorChange={handleOtherSeparatorChange}
            />

            <CheckboxOptions
                sort={sort}
                setSort={setSort}
                removeNumeric={removeNumeric}
                setRemoveNumeric={setRemoveNumeric}
            />

            <GroupingOptions groupByValue={groupByValue} handleGroupByChange={handleGroupByChange} />

            <FilterOptions
                addressType={addressType}
                setAddressType={setAddressType}
                filterType={filterType}
                setFilterType={setFilterType}
                stringFilter={stringFilter}
                setStringFilter={setStringFilter}
            />

            <KeywordFilter
                useKeyword={useKeyword}
                setUseKeyword={setUseKeyword}
                removeKeywordsText={removeKeywordsText}
                setRemoveKeywordsText={setRemoveKeywordsText}
            />
        </form>
    );
};

export default EmailExtractorForm;