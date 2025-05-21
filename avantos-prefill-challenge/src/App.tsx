import React, { useEffect } from 'react';
import { fetchActionBlueprintGraph } from './api/avantosApi';
import { useFormContext } from './context/FormContext';
const { formGraph, setFormGraph, selectedForm, setSelectedForm } = useFormContext();

useEffect(() => {
  fetchActionBlueprintGraph().then((data) => {
    setFormGraph(data); // <-- updates context-wide formGraph
  });
}, []);

const App = () => {
  return <div>Hello from Avantos Prefill Challenge!</div>;
};

export default App;