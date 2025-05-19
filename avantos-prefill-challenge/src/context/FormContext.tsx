import { createContext, useState } from "react";
import { FormNode, PrefillMap } from "../types/types";

const FormContext = createContext<FormContextType>(...);

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState<FormNode[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [prefillMap, setPrefillMap] = useState<PrefillMap>({});

  return (
    <FormContext.Provider value={{ forms, selectedFormId, setSelectedFormId, prefillMap, setPrefillMap }}>
      {children}
    </FormContext.Provider>
  );
};
