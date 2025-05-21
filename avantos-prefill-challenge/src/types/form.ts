// Represents a mapping from one form's field to another form's field
export interface PrefillMapping {
  targetFieldId: string; // e.g., 'email' on Form D
  sourceType: 'form' | 'global'; // where the data comes from
  sourceFormId?: string; // if sourceType === 'form'
  sourceFieldId?: string; // e.g., 'email' from Form A
  globalKey?: string; // if sourceType === 'global'
}

// src/types/forms.ts

export type FormField = {
  id: string;       // required based on error
  name: string;
  label?: string;
  type: string;
};

export type Form = {
  id: string;
  name: string;
  fields: FormField[];
  children: string[]; // use 'children' if you've renamed from 'dependencies'
};

export interface FormNode {
  id: string;
  name: string;
  fields: FormField[];
  children?: string[];
}

export type PrefillMap = {
  [formId: string]: {
    [fieldName: string]: string; // format: FormX.fieldY
  }
};
