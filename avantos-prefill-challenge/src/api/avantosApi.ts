// src/api/avantosApi.ts
import { Form } from "@/types/form";

export async function fetchActionBlueprintGraph() {
  const res = await fetch("http://localhost:3000/forms");
  const data = await res.json();
  return data;
}