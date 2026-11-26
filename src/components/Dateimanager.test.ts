import { expect, test } from "vite-plus/test";
import {
  check,
  contents,
  CUT,
  describe,
  generate,
  mistakes,
  path,
  reason,
  solution,
  START,
  wrong,
  type Props,
} from "./Dateimanager.ts";
import type { Node } from "./Ordnerbaum.ts";

const node = (id: number, name: string, parent: number, datei: boolean, von = 1, bis = 0): Node => ({
  id,
  name,
  parent,
  datei,
  von,
  bis,
  imBaum: id !== 2,
});

// the ids as in src/data/mias-tablet.yaml
const nodes: Node[] = [
  node(1, "Mias Tablet", 0, false),
  node(2, "Downloads", 1, false),
  node(3, "Schule", 1, false),
  node(4, "Fotos", 1, false),
  node(5, "Musik", 1, false),
  node(6, "referat.txt", 3, true, 1, 1),
  node(10, "Deutsch", 3, false, 2),
  node(11, "Mathe", 3, false, 2),
  node(14, "notizen.txt", 10, true, 2),
  node(15, "notizen.txt", 11, true, 2),
  node(8, "party.jpg", 4, true),
];

const texts = {
  notMoved: "noch in Downloads",
  notPasted: "nicht eingefügt",
  wrongFolder: "liegt in {ordner}. {art}",
  sameName: "geöffnet: {pfad}, gleicher Name",
  otherFile: "geöffnet: {pfad}",
};
const ablegen: Props = {
  mode: "ablegen",
  nodes,
  stand: 1,
  ablagen: [{ datei: "tor.jpg", ordner: [4], art: "Die Endung .jpg zeigt: ein Foto." }],
  oeffnen: [],
  task: "Räume {datei} auf.",
  ...texts,
};
const oeffnen: Props = {
  ...ablegen,
  mode: "oeffnen",
  stand: 2,
  ablagen: [],
  oeffnen: [{ ziel: 15 }],
  task: "Öffne {pfad}.",
};

test("ablegen: a fitting folder is right, whatever the model folder; Downloads, cut only and a wrong kind are wrong", () => {
  const task = generate(3, ablegen);
  expect(check(task, 4)).toBe(true);
  expect(check(task, solution(task))).toBe(true);
  expect(check(task, wrong(task))).toBe(false);
  expect(reason(task, START, ablegen)).toBe("noch in Downloads");
  expect(reason(task, CUT, ablegen)).toBe("nicht eingefügt");
  expect(reason(task, 5, ablegen)).toBe("liegt in Musik. Die Endung .jpg zeigt: ein Foto.");
  expect(reason(task, 1, ablegen)).toBe("liegt in Mias Tablet. Die Endung .jpg zeigt: ein Foto.");
  expect(reason(task, 4, ablegen)).toBeUndefined();
});

test("ablegen: each typical mistake is rejected and the description names the task", () => {
  const task = generate(1, ablegen);
  for (const answer of mistakes(task, ablegen)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
  expect(describe(task, ablegen, "de")).toEqual({
    task: "Räume tor.jpg auf.",
    solution: "tor.jpg → Mias Tablet/Fotos",
  });
});

test("oeffnen: only the file of the path is right; the file of the same name gets its own message", () => {
  const task = generate(7, oeffnen);
  expect(check(task, 15)).toBe(true);
  expect(check(task, 14)).toBe(false);
  expect(mistakes(task, oeffnen)[3]).toBe(14);
  expect(reason(task, 14, oeffnen)).toBe("geöffnet: Mias Tablet/Schule/Deutsch/notizen.txt, gleicher Name");
  expect(reason(task, 8, oeffnen)).toBe("geöffnet: Mias Tablet/Fotos/party.jpg");
  expect(describe(task, oeffnen, "de").task).toBe("Öffne Mias Tablet/Schule/Mathe/notizen.txt.");
});

test("paths and folder contents follow the stand: folders first, a file of stand 1 gone in stand 2", () => {
  expect(path(ablegen, 8, " / ")).toBe("Mias Tablet / Fotos / party.jpg");
  expect(contents(ablegen, 3).map((n) => n.id)).toEqual([6]);
  expect(contents(oeffnen, 3).map((n) => n.id)).toEqual([10, 11]);
});
