import { expect, test } from "vite-plus/test";
import { describe, layout, lines, nodesOf, type Node } from "./Ordnerbaum.ts";

const n = (id: number, name: string, parent: number, datei: boolean, von = 1, bis = 0, imBaum = true): Node => ({
  id,
  name,
  parent,
  datei,
  von,
  bis,
  imBaum,
});

const tree: Node[] = [
  n(1, "Tablet", 0, false),
  n(2, "Downloads", 1, false, 1, 0, false),
  n(3, "A", 1, false),
  n(4, "B", 1, false),
  n(5, "x.jpg", 3, true, 1, 1),
  n(6, "Sub", 3, false, 2),
  n(7, "x.jpg", 6, true, 2),
  n(8, "y.mp3", 4, true),
];

test("shows only the nodes of the stand that belong in the tree", () => {
  expect(nodesOf(tree, 1).map((node) => node.id)).toEqual([1, 3, 4, 5, 8]);
  expect(nodesOf(tree, 2).map((node) => node.id)).toEqual([1, 3, 4, 6, 7, 8]);
  expect(nodesOf(tree, 1, true).map((node) => node.id)).toContain(2);
});

test("splits a file name into name and extension, a folder stays one line", () => {
  expect(lines({ ...tree[4]!, name: "zimmer22.jpg" })).toEqual(["zimmer22", ".jpg"]);
  expect(lines(tree[2]!)).toEqual(["A"]);
});

test("puts the root on top and each folder above the middle of its children", () => {
  const { placed, width } = layout(tree, 2);
  const at = (id: number) => placed.find((p) => p.id === id)!;
  expect(width).toBe(360);
  expect(at(1).root).toBe(true);
  expect(at(1).y).toBeLessThan(at(3).y);
  expect(at(6).x).toBe(at(7).x);
  expect(at(3).x).toBe(at(6).x);
  expect(at(7).from).toEqual({ x: at(6).x, y: at(6).y + 34 });
  expect(at(1).from).toBeUndefined();
});

test("keeps every box inside the drawing and widens it for many leaves", () => {
  const inside = (stand: number) => {
    const { placed, width } = layout(tree, stand);
    return placed.every((p) => p.x - p.width / 2 >= 0 && p.x + p.width / 2 <= width);
  };
  expect(inside(1)).toBe(true);
  expect(inside(2)).toBe(true);
  const many = [n(1, "Tablet", 0, false), ...[2, 3, 4, 5, 6, 7, 8].map((id) => n(id, `f${id}.txt`, 1, true))];
  expect(layout(many, 1).width).toBe(7 * 58);
});

test("describes each folder with what lies in it", () => {
  expect(describe(tree, 1)).toEqual(["Tablet: A, B", "A: x.jpg", "B: y.mp3"]);
});
