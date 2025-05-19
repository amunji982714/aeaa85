export interface FormNode {
  id: string;
  name: string;
  fields: FormField[];
  children?: string[];
}

export interface FormField {
  name: string;
  type: string;
}

export type PrefillMap = {
  [formId: string]: {
    [fieldName: string]: string; // format: FormX.fieldY
  }
};