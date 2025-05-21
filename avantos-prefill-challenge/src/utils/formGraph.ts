// utils/formGraph.ts

import { Form } from "@/types/form";

export function getUpstreamForms(
  formId: string,
  graph: Form[]
): Form[] {
  const visited = new Set<string>();
  const upstream: Form[] = [];

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