// src/components/FormList.tsx

import { useEffect, useState } from "react";
import { getForms } from "@/api/forms";
import { Form } from "@/types/form";
import { FormCard } from "@/components/FormCard";
import { useFormContext } from "@/context/FormContext";

type FormListProps = {
  forms: Form[];
  onSelectForm: (formId: string) => void;
};

export const FormList = ({ forms, onSelectForm }: FormListProps) => {
  const { selectedForm } = useFormContext();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onClick={onSelectForm}
          isSelected={selectedForm === form.id}
        />
      ))}
    </div>
  );
};