'use client'

import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, HTMLSelect } from '@blueprintjs/core';

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
      {fields.map(field => (
        <FormGroup key={field.id} label={field.label} labelFor={field.id}>
          {field.type === 'select' ? (
            <HTMLSelect
              id={field.id}
              fill
              value={formData[field.id]}
              onChange={e => handleChange(field.id, e.target.value)}
              options={field.options || []}
            />
          ) : (
            <InputGroup
              id={field.id}
              value={formData[field.id]}
              onChange={e => handleChange(field.id, e.target.value)}
            />
          )}
        </FormGroup>
      ))}
      <Button type="submit" text="Submit" intent="primary" fill />
    </form>
  );
};
