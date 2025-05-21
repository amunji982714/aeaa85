import { FormNode } from "../types/form";

export function getAllAncestors(formId: string, graph: FormNode[]): string[] {
  const visited = new Set<string>();
  const stack = [formId];

  while (stack.length) {
    const current = stack.pop()!;
    const parents = graph.filter(f => f.children?.includes(current)).map(f => f.id);
    parents.forEach(p => {
      if (!visited.has(p)) {
        visited.add(p);
        stack.push(p);
      }
    });
  }

  return Array.from(visited);
}
