{selectedFormId ? (
  <>
    <h2 className="text-xl font-bold mb-2">Prefill Mapping Editor</h2>
    <PrefillEditor formId={selectedFormId} />
  </>
) : (
  <p>Select a form to begin editing its prefill configuration.</p>
)}
