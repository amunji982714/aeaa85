export type PrefillSource = {
  formId: string;
  fieldId: string;
  type: "form" | "global";
};

export type PrefillMappingMap = {
  [formId: string]: {
    [fieldId: string]: PrefillSource | null;
  };
};
