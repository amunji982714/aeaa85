import React, { useState, useEffect } from "react";
import { Form, FormField } from "@/types/form";
import { PrefillSource } from "@/types/prefill";
import { useFormContext } from "@/context/FormContext";
import { getUpstreamForms } from "@/utils/formGraph";
import { PrefillModal } from "./prefillModal";

type PrefillEditorProps = {
  formId: string;
};

// type Props = {
//   isOpen: boolean;
//   fieldId: string | null;
//   upstreamForms: FormNode[]; // Change here
//   onClose: () => void;
//   onSelect: (source: PrefillSource | null) => void;
// };

type FieldMapping = Record<string, PrefillSource | null>;

export const PrefillEditor = ({ formId }: PrefillEditorProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [prefillMapping, setPrefillMapping] = useState<FieldMapping>({});

  const { formGraph } = useFormContext();
  const upstreamForms = getUpstreamForms(formId, formGraph);

  useEffect(() => {
    const selected = formGraph.find((f) => f.id === formId);
    if (selected) {
      setForm(selected);
    }
  }, [formId, formGraph]);

  const setMapping = (fieldId: string | null, source: PrefillSource | null) => {
    if (!fieldId) return;
    setPrefillMapping((prev) => ({
      ...prev,
      [fieldId]: source,
    }));
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <div className="space-y-4">
      {form.fields.map((field) => (
        <div key={field.id} className="border p-2 mb-2 rounded">
          <div className="flex justify-between items-center">
            <div>
              <strong>{field.label || field.id}</strong>
              <p className="text-sm text-gray-500">
                Prefilled from:{" "}
                {prefillMapping[field.id]
                  ? `${prefillMapping[field.id]?.formId}.${prefillMapping[field.id]?.fieldId}`
                  : "None"}
              </p>
            </div>
            <div className="flex gap-2">
              {prefillMapping[field.id] && (
                <button
                  onClick={() => setMapping(field.id, null)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => {
                  setActiveField(field.id);
                  setModalOpen(true);
                }}
                className="text-blue-500"
              >
                {prefillMapping[field.id] ? "Edit" : "Configure"}
              </button>
            </div>
          </div>
        </div>
      ))}

      <PrefillModal
        isOpen={isModalOpen}
        fieldId={activeField}
        upstreamForms={upstreamForms}
        onClose={() => setModalOpen(false)}
        onSelect={(source: PrefillSource | null) => {
          setMapping(activeField, source);
          setModalOpen(false);
        }}
      />
    </div>
  );
};