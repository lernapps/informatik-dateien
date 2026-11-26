// The logic of Dateimanager.vue, a file manager of Mia's tablet as on a real device: one folder open at a time, a path
// bar, "Nach oben", and per file "Ausschneiden" (mode ablegen) or "Öffnen" (mode oeffnen). Pure functions, which the
// build tests over fixed seeds (the exercise contract).
// - ablegen: a new file lies in Downloads; the learner cuts it and pastes it into a fitting folder. The answer is the
//   id of the folder it lies in, CUT while it is cut but not pasted. Right when that folder fits the file (a property,
//   not one model folder).
// - oeffnen: the learner opens the file with a given path. The answer is the id of the file opened. Right when it is
//   the file of the path.
import { inStand, ROOT_PARENT, type Node } from "./Ordnerbaum.ts";

/** A task of the mode ablegen, from the data file ablegen. */
export interface Ablage {
  datei: string;
  ordner: number[];
  art: string;
}

/** A task of the mode oeffnen, from the data file oeffnen: the id of the file to open. */
export interface Oeffnen {
  ziel: number;
}

/** The props the logic needs. */
export interface Props {
  mode: "ablegen" | "oeffnen";
  /** Every node of the data file mias-tablet. */
  nodes: Node[];
  /** The stand of the tree the tablet shows. */
  stand: number;
  /** The tasks of the mode ablegen; empty in the mode oeffnen. */
  ablagen: Ablage[];
  /** The tasks of the mode oeffnen; empty in the mode ablegen. */
  oeffnen: Oeffnen[];
  /** The task: with {datei} (ablegen) or {pfad} (oeffnen). */
  task: string;
  /** ablegen: the file still lies in Downloads. */
  notMoved: string;
  /** ablegen: cut but not pasted. */
  notPasted: string;
  /** ablegen: pasted into a folder that does not fit, with {ordner} and {art}. */
  wrongFolder: string;
  /** ablegen: pasted into the root, in no folder. */
  loose: string;
  /** oeffnen: a file of the same name in another folder, with {pfad} of the opened file. */
  sameName: string;
  /** oeffnen: another file, with {pfad} of the opened file. */
  otherFile: string;
  /** What "Prüfen" says before the learner did anything. */
  unanswered: string;
}

export type Task = { mode: "ablegen"; ablage: Ablage } | { mode: "oeffnen"; ziel: number };

/** ablegen: the folder of the file, CUT while cut; oeffnen: the file opened, NONE before. */
export type Answer = number;

/** The id of the new file of the mode ablegen; it lies in Downloads at the start. */
export const NEW_FILE = -2;
/** The folder Downloads, where the new file lies at the start. */
export const START = 2;
/** The answer while the new file is cut and not pasted. */
export const CUT = -1;
/** The answer of oeffnen before a file is open. */
export const NONE = 0;

/** The nodes of the tablet in the stand of the props, Downloads included. */
export const nodesOf = (props: Pick<Props, "nodes" | "stand">) =>
  props.nodes.filter((node) => inStand(node, props.stand));

/** The node of `id`. */
const find = (props: Pick<Props, "nodes" | "stand">, id: number) => nodesOf(props).find((node) => node.id === id);

/** The path of a node: the names from the root down to it, joined with " / " for the path bar or "/" for a path. */
export function path(props: Pick<Props, "nodes" | "stand">, id: number, separator = "/"): string {
  const names: string[] = [];
  let node = find(props, id);
  while (node !== undefined) {
    names.unshift(node.name);
    node = node.parent === ROOT_PARENT ? undefined : find(props, node.parent);
  }
  return names.join(separator);
}

/** What lies in the folder `id`: its folders first, then its files, each in the order of the data file. */
export function contents(props: Pick<Props, "nodes" | "stand">, id: number): Node[] {
  const inside = nodesOf(props).filter((node) => node.parent === id);
  return [...inside.filter((node) => !node.datei), ...inside.filter((node) => node.datei)];
}

/** The folders a file may be pasted into: every folder but the root. */
export const folders = (props: Pick<Props, "nodes" | "stand">) =>
  nodesOf(props).filter((node) => !node.datei && node.parent !== ROOT_PARENT);

/** The files of the tablet. */
const files = (props: Pick<Props, "nodes" | "stand">) => nodesOf(props).filter((node) => node.datei);

/** A small seeded random generator (mulberry32). */
function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The task of `seed`: one of the tasks of the mode. */
export function generate(seed: number, props: Props): Task {
  const next = random(seed);
  if (props.mode === "oeffnen") {
    const list = props.oeffnen;
    return { mode: "oeffnen", ziel: list[Math.floor(next() * list.length)]?.ziel ?? NONE };
  }
  const list = props.ablagen;
  const ablage = list[Math.floor(next() * list.length)] ?? { datei: "", ordner: [], art: "" };
  return { mode: "ablegen", ablage };
}

/** Whether the answer has the asked property: the file in a fitting folder, or the file of the path opened. */
export function check(task: Task, answer: Answer): boolean {
  return task.mode === "ablegen" ? task.ablage.ordner.includes(answer) : answer === task.ziel;
}

/** The right answer: the first fitting folder, or the file of the path. */
export function solution(task: Task): Answer {
  return task.mode === "ablegen" ? (task.ablage.ordner[0] ?? START) : task.ziel;
}

/** A wrong answer: the file left in Downloads, or nothing opened. */
export function wrong(task: Task): Answer {
  return task.mode === "ablegen" ? START : NONE;
}

/** What "Prüfen" says before the learner did anything: the text of the props for the mode of the block. */
export function unanswered(props: Pick<Props, "unanswered">, _lang?: string): string {
  return props.unanswered;
}

/** The answer of each typical mistake of about.mistakes, per mode; none where the mode has no such mistake. */
export function mistakes(task: Task, props: Props): (Answer | undefined)[] {
  if (task.mode === "ablegen") {
    const other = folders(props).find((folder) => folder.id !== START && !task.ablage.ordner.includes(folder.id));
    return [START, CUT, other?.id, undefined];
  }
  const target = find(props, task.ziel);
  const twin = files(props).find((file) => file.id !== task.ziel && file.name === target?.name);
  return [undefined, undefined, undefined, twin?.id];
}

/** A text with {datei}, {pfad}, {ordner} and {art} filled in. */
const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(datei|pfad|ordner|art)\}/g, (_, key: string) => values[key] ?? "");

/** The app's message for a wrong answer: what does not fit, never the right folder or path. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  if (check(task, answer)) return undefined;
  if (task.mode === "ablegen") {
    if (answer === START) return props.notMoved;
    if (answer === CUT) return props.notPasted;
    if (find(props, answer)?.parent === ROOT_PARENT) return props.loose;
    const folder = find(props, answer);
    if (folder === undefined) return undefined;
    return fill(props.wrongFolder, { ordner: folder.name, art: task.ablage.art });
  }
  const opened = find(props, answer);
  if (opened === undefined || !opened.datei) return undefined;
  const target = find(props, task.ziel);
  return fill(opened.name === target?.name ? props.sameName : props.otherFile, { pfad: path(props, answer) });
}

/** An answer as text: the folder's or file's path. */
export function show(answer: Answer, _task: Task, props: Props, _lang?: string): string {
  return answer === CUT || answer === NONE ? "–" : path(props, answer);
}

/** The task as a learner sees it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  if (task.mode === "ablegen") {
    return {
      task: fill(props.task, { datei: task.ablage.datei }),
      solution: `${task.ablage.datei} → ${task.ablage.ordner.map((id) => path(props, id)).join(" | ")}`,
    };
  }
  return { task: fill(props.task, { pfad: path(props, task.ziel) }), solution: path(props, task.ziel) };
}

/** The task once, with {datei} or {pfad}. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the new file, or the path to open. */
export function params(task: Task, props: Props, _lang: string): Record<string, string> {
  return task.mode === "ablegen" ? { datei: task.ablage.datei } : { pfad: path(props, task.ziel) };
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Ein Dateimanager zeigt Mias Tablet: oben der Pfad des offenen Ordners, darunter sein Inhalt. Ein Ordner öffnet sich beim Antippen, „Nach oben“ geht einen Ordner zurück. Im Modus Ablegen liegt eine neue Datei in Downloads: Das Kind schneidet sie aus, öffnet einen Ordner und fügt sie dort ein. Im Modus Öffnen öffnet das Kind die Datei mit dem genannten Pfad. Dann drückt es „Prüfen“.",
    en: "A file manager shows Mia's tablet: at the top the path of the open folder, below it what is inside. Tapping a folder opens it, “Up” goes back one folder. In the mode Put away, a new file lies in Downloads: the child cuts it, opens a folder and pastes it there. In the mode Open, the child opens the file with the given path. Then they press “Check”.",
  },
  answer: {
    de: "Ablegen: der Ordner, in dem die Datei jetzt liegt. Öffnen: die geöffnete Datei.",
    en: "Put away: the folder the file is in now. Open: the file that was opened.",
  },
  correct: {
    de: "Ablegen: richtig, wenn die Datei in einem Ordner liegt, der zu ihrer Art passt (Text für die Schule, Foto, Musik). Öffnen: richtig, wenn genau die Datei des Pfads offen ist.",
    en: "Put away: right when the file is in a folder that fits its kind (a text for school, a photo, music). Open: right when exactly the file of the path is open.",
  },
  mistakes: [
    { de: "Die Datei liegt noch in Downloads.", en: "The file is still in Downloads." },
    { de: "Ausgeschnitten, aber nirgends eingefügt.", en: "Cut, but not pasted anywhere." },
    { de: "In einen Ordner der falschen Art eingefügt.", en: "Pasted into a folder of the wrong kind." },
    {
      de: "Eine gleichnamige Datei in einem anderen Ordner geöffnet.",
      en: "Opened a file with the same name in another folder.",
    },
  ],
};
