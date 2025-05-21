// src/api/forms.ts

export interface Form {
  id: string;
  name: string;
  fields: Array<{ id: string; name: string; type: string }>;
  dependencies?: string[]; // list of form ids this form depends on
}

const API_URL = "http://localhost:3000/forms";

/**
 * Fetches the form DAG from the mock Avantos server.
 */
export async function getForms(): Promise<Form[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch forms");

    const data = await response.json();

    // Example transformation if needed
    return data.forms ?? data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    return [];
  }
}