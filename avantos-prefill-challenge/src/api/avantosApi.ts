// src/api/avantosApi.ts
import { Form } from "@/types/form";

export async function fetchActionBlueprintGraph(): Promise<Form[]> {
  const response = await fetch("http://localhost:3001/graph");
  const data = await response.json();
  return data;
}
