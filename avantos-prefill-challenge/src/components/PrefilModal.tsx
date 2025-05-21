import { useContext } from "react";
import { getAllAncestors } from "../utils/dagUtils";

const PrefillModal = ({ targetFormId, targetField }: { targetFormId: string, targetField: string }) => {
  const { form, prefillMap, setPrefillMap } = useContext(FormContext);
  const sources = getAllAncestors(targetFormId, form);

  const availableMappings = sources.flatMap((sourceId) => {
    const sourceForm = form.find(f => f.id === sourceId);
    return sourceForm?.fields.map(f => ({
      label: `${sourceForm.name}.${f.name}`,
      value: `${sourceForm.id}.${f.name}`
    })) || [];
  });

  function handleSelect(mappingValue: string) {
    setPrefillMap(prev => ({
      ...prev,
      [targetFormId]: {
        ...prev[targetFormId],
        [targetField]: mappingValue
      }
    }));
  }

  return (
    <div className="modal">
      <h3>Select Data to Map</h3>
      <ul>
        {availableMappings.map(m => (
          <li key={m.value} onClick={() => handleSelect(m.value)}>{m.label}</li>
        ))}
      </ul>
    </div>
  );
};


import { FormNode } from "@/types/form";
import { PrefillSource } from "@/types/prefill";

type PrefillModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (source: PrefillSource) => void;
  upstreamForms: FormNode[];
  fieldId: string;
};

export function PrefillModal({
  isOpen,
  onClose,
  onSelect,
  upstreamForms,
  fieldId,
}: PrefillModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-4 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[400px]">
        <h3 className="text-lg font-bold mb-2">Select Prefill Source</h3>
        {upstreamForms.map((form) => (
          <div key={form.id}>
            <p className="font-semibold">{form.name}</p>
            <ul className="pl-4">
              {form.fields.map((field) => (
                <li
                  key={field.id}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() =>
                    onSelect({
                      formId: form.id,
                      fieldId: field.id,
                      type: "form",
                    })
                  }
                >
                  {field.label || field.id}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={onClose} className="mt-4 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}