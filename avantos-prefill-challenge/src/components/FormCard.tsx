// src/components/FormCard.tsx

import React, { useState } from "react";
import { Form } from "@/types/form";

interface FormCardProps {
  form: Form;
  onClick: (formId: string) => void;
  isSelected?: boolean;
}


export const FormCard: React.FC<FormCardProps> = ({
  form,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      className={`border rounded-xl p-4 cursor-pointer shadow-sm hover:shadow-md transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onClick={() => onClick(form.id)}
    >
      <h3 className="text-lg font-semibold">{form.name}</h3>
      <p className="text-sm text-gray-500">{form.fields.length} fields</p>
      {form.children?.length ? (
        <p className="text-xs text-gray-400">
          Depends on: {form.children.join(", ")}
        </p>
      ) : null}
    </div>
  );
};