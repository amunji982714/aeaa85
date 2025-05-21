export type PrefillSource = {
  formId: string;
  fieldId: string;
  type: "form" | "global";
};

export type PrefillMapping = {
  [formId: string]: {
    [fieldId: string]: PrefillSource | null;
  };
};
