// The logic of Ordnerbaum.vue: Mia's folder tree as a tree in the look of the tree of lernapps/informatik-daten-codieren
// (#491, images/baum-zimmer.svg): root at the top, filled light blue, nodes as rounded boxes, leaves with a dashed
// border, edges as straight lines. Pure functions: which nodes a stand of the tree has, and where each is drawn.

/** The parent of the root in the data file: the root lies in no folder. */
export const ROOT_PARENT = 0;

/** A node of the data file mias-tablet. */
export interface Node {
  id: number;
  name: string;
  parent: number;
  datei: boolean;
  von: number;
  bis: number;
  imBaum: boolean;
}

/** A node placed in the drawing: its box and the lines of its label. */
export interface Placed {
  id: number;
  x: number;
  y: number;
  width: number;
  datei: boolean;
  root: boolean;
  lines: string[];
  /** The centre of the bottom of the parent's box, for the edge; none for the root. */
  from: { x: number; y: number } | undefined;
}

export const ROW = 74;
export const BOX = 34;
const TOP = 12;
const MIN_WIDTH = 360;
const LEAF_SLOT = 58;
/** Free space under the tree, for the licence badge of the runtime. */
export const BOTTOM = 44;

/** Whether `node` lies in the tree of `stand`. */
export const inStand = (node: Node, stand: number) => node.von <= stand && (node.bis === 0 || stand <= node.bis);

/** The nodes of the tree of `stand` that the drawing shows. */
export function nodesOf(nodes: readonly Node[], stand: number, all = false): Node[] {
  return nodes.filter((node) => inStand(node, stand) && (all || node.imBaum));
}

/** The label of a node: a file in two lines, its name and its ending, so that it fits a narrow box. */
export function lines(node: Node): string[] {
  const dot = node.name.lastIndexOf(".");
  return node.datei && dot > 0 ? [node.name.slice(0, dot), node.name.slice(dot)] : [node.name];
}

/** The tree of `stand` laid out: leaves side by side in reading order, each folder above the middle of its children. */
export function layout(all: readonly Node[], stand: number): { width: number; height: number; placed: Placed[] } {
  const nodes = nodesOf(all, stand);
  const children = (id: number) => nodes.filter((node) => node.parent === id);
  const root = nodes.find((node) => node.parent === ROOT_PARENT);
  if (root === undefined) return { width: MIN_WIDTH, height: BOTTOM, placed: [] };
  const order: Node[] = [];
  const depth = new Map<number, number>();
  const visit = (node: Node, level: number) => {
    depth.set(node.id, level);
    const below = children(node.id);
    if (below.length === 0) order.push(node);
    for (const child of below) visit(child, level + 1);
  };
  visit(root, 0);
  const width = Math.max(MIN_WIDTH, order.length * LEAF_SLOT);
  const slot = width / order.length;
  const x = new Map<number, number>();
  order.forEach((node, i) => x.set(node.id, slot * (i + 0.5)));
  const centre = (node: Node): number => {
    const known = x.get(node.id);
    if (known !== undefined) return known;
    const below = children(node.id);
    const value = below.reduce((sum, child) => sum + centre(child), 0) / below.length;
    x.set(node.id, value);
    return value;
  };
  const levels = Math.max(...depth.values());
  const placed = nodes.map((node): Placed => {
    const level = depth.get(node.id) ?? 0;
    const parent = nodes.find((other) => other.id === node.parent);
    const isRoot = node === root;
    const boxWidth = isRoot ? 110 : node.datei ? Math.min(slot - 4, 70) : Math.min(Math.max(slot * 1.4, 62), 84);
    return {
      id: node.id,
      x: centre(node),
      y: TOP + level * ROW,
      width: boxWidth,
      datei: node.datei,
      root: isRoot,
      lines: lines(node),
      from: parent === undefined ? undefined : { x: centre(parent), y: TOP + (depth.get(parent.id) ?? 0) * ROW + BOX },
    };
  });
  return { width, height: TOP + levels * ROW + BOX + 8 + BOTTOM, placed };
}

/** The tree as text, for readers without the picture: each folder with what lies in it. */
export function describe(all: readonly Node[], stand: number): string[] {
  const nodes = nodesOf(all, stand);
  return nodes
    .filter((node) => !node.datei && nodes.some((child) => child.parent === node.id))
    .map(
      (folder) =>
        `${folder.name}: ${nodes
          .filter((n) => n.parent === folder.id)
          .map((n) => n.name)
          .join(", ")}`,
    );
}
