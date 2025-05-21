// utils/formGraph.ts

import { FormNode } from "@/types/form";

export function getUpstreamForms(
  formId: string,
  graph: FormNode[]
): FormNode[] {
  const visited = new Set<string>();
  const upstream: FormNode[] = [];

  function dfs(currentId: string) {
    for (const node of graph) {
      if (node.children?.includes(currentId) && !visited.has(node.id)) {
        visited.add(node.id);
        upstream.push(node);
        dfs(node.id);
      }
    }
  }

  dfs(formId);
  return upstream;
}