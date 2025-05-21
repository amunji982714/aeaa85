import React, { useEffect } from "react";
import { fetchActionBlueprintGraph } from "./api/avantosApi";
import { useFormContext } from "./context/FormContext";
import { PrefillEditor } from "./components/PrefillEditor";
import { FormList } from "@/components/FormList";

const App = () => {
  const {
    formGraph,
    setFormGraph,
    selectedForm,
    setSelectedForm,
  } = useFormContext();

  useEffect(() => {
    fetchActionBlueprintGraph().then((data) => {
      console.log("Fetched forms from mock server:", data);
      setFormGraph(data);
    });
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Avantos Prefill Challenge</h1>

      {/* Show form list for selection */}
      <FormList forms={formGraph} onSelectForm={setSelectedForm} />

      {/* Show prefill editor if a form is selected */}
      {selectedForm && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Prefill Editor for: {selectedForm}
          </h2>
          <PrefillEditor formId={selectedForm} />
        </div>
      )}
    </div>
  );
};

export default App;