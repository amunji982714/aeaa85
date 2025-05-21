import React from "react";
import { Form, FormField } from "@/types/form";
import { PrefillSource } from "@/types/prefill";

type Props = {
  isOpen: boolean;
  fieldId: string | null;
  upstreamForms: Form[];
  onClose: () => void;
  onSelect: (source: PrefillSource) => void;
};

export const PrefillModal: React.FC<Props> = ({
  isOpen,
  fieldId,
  upstreamForms,
  onClose,
  onSelect,
}) => {
  if (!isOpen || !fieldId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">
          Select source field for: <span className="text-blue-600">{fieldId}</span>
        </h2>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {upstreamForms.map((form) => (
            <div key={form.id}>
              <h3 className="font-semibold text-gray-700">{form.name}</h3>
              <ul className="ml-4 mt-1 space-y-1">
                {form.fields.map((field: FormField) => (
                  <li key={field.id}>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        onSelect({
                            formId: form.id, fieldId: field.id,
                            type: "form"
                        })
                      }
                    >
                      {field.label || field.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};