import { useContext } from "react";
import { getAllAncestors } from "../utils/dagUtils";

const PrefillModal = ({ targetFormId, targetField }: { targetFormId: string, targetField: string }) => {
  const { forms, prefillMap, setPrefillMap } = useContext(FormContext);
  const sources = getAllAncestors(targetFormId, forms);

  const availableMappings = sources.flatMap((sourceId) => {
    const sourceForm = forms.find(f => f.id === sourceId);
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
