import { FormNode } from "../types/types";

export async function fetchActionBlueprintGraph(): Promise<FormNode[]> {
  const response = await fetch("http://localhost:3000/action-blueprint-graph-get");
  return response.json();
}