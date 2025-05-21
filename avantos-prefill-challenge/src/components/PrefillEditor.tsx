import React from "react";
import { useState, useEffect } from "react";
import { Form, PrefillMapping } from "@/types/form";
import { useFormContext } from "@/context/FormContext";
import { PrefillSource } from "@/types/prefill";
import { getUpstreamForms } from "@/utils/formGraph";
import { PrefillModal } from "./prefillModal"; // Create this component

type PrefillEditorProps = {
  formId: string;
};

// Inside the component (after function PrefillEditor({ formId }) { ... )





export const PrefillEditor = ({ formId }: PrefillEditorProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const { formGraph } = useFormContext(); // assuming you have the form graph in context
  const [form, setForm] = useState<Form | null>(null);
  const upstreamForms = getUpstreamForms(formId, formGraph);
  const [prefillMapping, setPrefillMapping] = useState<Record<string, string>>({});

function setMapping(fieldId: string, source: PrefillSource | null) {
  setPrefillMapping((prev) => ({
    ...prev,
    [selectedFormId]: {
      ...(prev[selectedFormId] || {}),
      [fieldId]: source,
    },
  }));
}

  useEffect(() => {
    const selected = formGraph.find((f) => f.id === formId);
    if (selected) {
      setForm(selected);
    }
  }, [formId, formGraph]);

  const openMappingModal = (fieldName: string) => {
    // TODO: Open modal and select data source for this field
    console.log("Open mapping modal for", fieldName);
  };

  const clearMapping = (fieldName: string) => {
    setPrefillMapping((prev) => {
      const copy = { ...prev };
      delete copy[fieldName];
      return copy;
    });
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
                {prefillMapping[formId]?.[field.id]
                  ? `${prefillMapping[formId][field.id]?.formId}.${prefillMapping[formId][field.id]?.fieldId}`
                  : "None"}
              </p>
            </div>
            <div className="flex gap-2">
              {prefillMapping[formId]?.[field.id] && (
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
                {prefillMapping[formId]?.[field.id] ? "Edit" : "Configure"}
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
