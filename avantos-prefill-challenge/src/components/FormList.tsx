import { useEffect, useState } from "react";
import { getForms } from "@/api/forms";
import { Form } from "@/types/form";
import { FormCard } from "@/components/FormCard";
import { useFormContext } from "@/context/FormContext";

export default function Home() {
  const [forms, setForms] = useState<Form[]>([]);
  const { setSelectedForm } = useFormContext();

  useEffect(() => {
    async function fetchForms() {
      const fetchedForms = await getForms();
      setForms(fetchedForms);
    }
    fetchForms();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} onClick={() => setSelectedForm(form)} />
      ))}
    </div>
  );
}