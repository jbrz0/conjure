'use client'

import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Box from '@mui/joy/Box';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select';
  options?: string[];
  defaultValue?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialState: Record<string, string> = {};
    fields.forEach(field => {
      initialState[field.id] = field.defaultValue || '';
    });
    return initialState;
  });

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map(field => (
          <FormControl key={field.id}>
            <FormLabel>{field.label}</FormLabel>
            {field.type === 'select' ? (
              <Select
                value={formData[field.id]}
                onChange={(_, newValue) => handleChange(field.id, newValue || '')}
              >
                {(field.options || []).map(option => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            ) : (
              <Input
                value={formData[field.id]}
                onChange={e => handleChange(field.id, e.target.value)}
              />
            )}
          </FormControl>
        ))}
        <Button type="submit" sx={{ mt: 2 }}>Submit</Button>
      </Box>
    </form>
  );
};
