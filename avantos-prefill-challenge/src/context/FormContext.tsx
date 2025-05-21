// src/context/FormContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import { Form, PrefillMapping } from "@/types/form";

interface FormContextType {
  forms: Form[];
  formGraph: Form[];
  setForms: React.Dispatch<React.SetStateAction<Form[]>>;
  setFormGraph: React.Dispatch<React.SetStateAction<Form[]>>;

  selectedForm: string | null;
  setSelectedForm: (formId: string | null) => void;

  prefillMappings: Record<string, PrefillMapping[]>;
  setPrefillMappings: React.Dispatch<
    React.SetStateAction<Record<string, PrefillMapping[]>>
  >;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [forms, setForms] = useState<Form[]>([]);
  const [formGraph, setFormGraph] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [prefillMappings, setPrefillMappings] = useState<
    Record<string, PrefillMapping[]>
  >({});

  return (
    <FormContext.Provider
      value={{
        forms,
        setForms,
        formGraph,
        setFormGraph,
        selectedForm,
        setSelectedForm,
        prefillMappings,
        setPrefillMappings,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};



export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

