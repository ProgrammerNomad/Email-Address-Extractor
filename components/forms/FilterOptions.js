import { useState, useEffect } from 'react';

// Move defaultKeywords to the top level outside the component
const defaultKeywords = [
  'temp', 'test', 'spam', 'disposable', 'example', 'invalid', 'delete', 'removed', 'fake',
  'whois', 'domain', 'dns', 'proxy', 'priv', 'regi', 'webmaster', 'protc', 'obsc', 
  'anonymiz', '@contac', 'host', 'gandi', 'support', 'qq.com', 'naver.com', 'hxmail.com', 
  'pro.net', 'xell.hk', 'corp.com'
].sort();

import {
  Card,
  CardHeader,
  CardContent,
  Switch,
  TextField,
  Chip,
  Stack,
  Typography,
  Tooltip,
  Zoom
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function FilterOptions({ formData, handleInputChange }) {
  const [keywords, setKeywords] = useState(
    formData.RemoveKeywords ? 
    formData.RemoveKeywords.split(',').map(k => k.trim()) : 
    defaultKeywords
  );

  useEffect(() => {
    // Initialize with default keywords if none present
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

  const handleKeywordDelete = (keywordToDelete) => {
    const newKeywords = keywords.filter(keyword => keyword !== keywordToDelete);
    setKeywords(newKeywords);
    handleInputChange({
      target: {
        name: 'RemoveKeywords',
        value: newKeywords.join(', ')
      }
    });
  };

  const handleKeywordAdd = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      const newKeyword = event.target.value.trim();
      if (!keywords.includes(newKeyword)) {
        const newKeywords = [...keywords, newKeyword];
        setKeywords(newKeywords);
        handleInputChange({
          target: {
            name: 'RemoveKeywords',
            value: newKeywords.join(', ')
          }
        });
      }
      event.target.value = '';
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader
        avatar={<FilterListIcon color="primary" />}
        title="Filter Options"
        sx={{ bgcolor: 'background.paper' }}
      />
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch
              checked={formData.UseKeyword}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'UseKeyword',
                  checked: e.target.checked,
                  type: 'checkbox'
                }
              })}
              name="UseKeyword"
            />
            <Typography>Enable Keyword Filtering</Typography>
            <Tooltip
              title="Removes emails containing common spam or temporary email keywords"
              TransitionComponent={Zoom}
              arrow
            >
              <InfoOutlinedIcon fontSize="small" color="action" />
            </Tooltip>
          </Stack>

          {formData.UseKeyword && (
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type keyword and press Enter"
                onKeyPress={handleKeywordAdd}
                helperText="Add keywords to filter out matching email addresses"
                size="small"
              />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {keywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    onDelete={() => handleKeywordDelete(keyword)}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}