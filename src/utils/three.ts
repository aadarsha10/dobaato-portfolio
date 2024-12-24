export function generateSphereNodes(count: number): [number, number, number][] {
  const nodes: [number, number, number][] = [];
  
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2;
    const y = Math.cos(theta) * 2;
    const x = Math.sin(theta) * 2;
    nodes.push([x, y, 0]);
  }
  
  return nodes;
}