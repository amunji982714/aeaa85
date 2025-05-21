export interface PrefillMapping {
  targetFieldId: string;
  sourceType: 'form' | 'global';
  sourceFormId?: string;
  sourceFieldId?: string;
  globalKey?: string;
}

export type FormField = {
  id: string;
  name: string;
  label?: string;
  type: string;
};

export type Form = {
  id: string;
  name: string;
  fields: FormField[];
  children: string[];
};

export type PrefillMap = {
  [formId: string]: {
    [fieldName: string]: string;
  };
};