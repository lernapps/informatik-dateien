<script setup lang="ts">
// A file manager of Mia's tablet, for the task of the number seed: one folder open at a time, as on a real device.
// Its logic is in Dateimanager.ts. It is the input of the task: it emits the answer (ablegen: the folder of the new
// file, CUT while it is cut; oeffnen: the file opened), and the explainer draws "Prüfen", checks the answer and gives
// the feedback. The start state is the same for every task: the folder "Mias Tablet" open, nothing cut, nothing open.
import { computed, ref } from "vue";
import { contents, CUT, generate, NEW_FILE, NONE, path, START, type Ablage, type Oeffnen } from "./Dateimanager.ts";
import { ROOT_PARENT, type Node } from "./Ordnerbaum.ts";

const props = defineProps<{
  /** ablegen: put a new file away; oeffnen: open the file of a path. */
  mode: "ablegen" | "oeffnen";
  /** Every node of the data file mias-tablet. */
  nodes: Node[];
  /** The stand of the tree the tablet shows. */
  stand: number;
  /** The tasks of the mode ablegen. */
  ablagen: Ablage[];
  /** The tasks of the mode oeffnen. */
  oeffnen: Oeffnen[];
  /** The task, with {datei} or {pfad}. */
  task: string;
  /** The label of the path bar. */
  here: string;
  /** The button that goes up one folder. */
  up: string;
  /** The button of a file: cut it. */
  cut: string;
  /** The button that pastes the cut file, with {datei}. */
  paste: string;
  /** The button of a file: open it. */
  open: string;
  /** The line under the list once a file is open, with {pfad}. */
  opened: string;
  /** The line of an empty folder. */
  empty: string;
  /** The word before a folder for screen readers. */
  folder: string;
  /** The word before a file for screen readers. */
  file: string;
  notMoved: string;
  notPasted: string;
  wrongFolder: string;
  sameName: string;
  otherFile: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer the manager gives now. */
  checked?: boolean;
}>();
const emit = defineEmits<{ answer: [number | undefined] }>();

const current = computed(() => generate(props.seed, props));
const ROOT = computed(() => props.nodes.find((node) => node.parent === ROOT_PARENT)?.id ?? 1);
const at = ref(ROOT.value);
/** ablegen: where the new file lies, CUT while cut. */
const newAt = ref(START);
/** oeffnen: the file opened. */
const openId = ref(NONE);

const newFile = computed<Node | undefined>(() =>
  current.value.mode === "ablegen"
    ? {
        id: NEW_FILE,
        name: current.value.ablage.datei,
        parent: newAt.value,
        datei: true,
        von: 1,
        bis: 0,
        imBaum: false,
      }
    : undefined,
);
const shown = computed(() => {
  const inside = contents(props, at.value);
  return newFile.value !== undefined && newAt.value === at.value ? [...inside, newFile.value] : inside;
});
const isRoot = computed(() => at.value === ROOT.value);
const bar = computed(() => path(props, at.value, " / "));
const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(datei|pfad)\}/g, (_, key: string) => values[key] ?? "");

function goInto(id: number): void {
  at.value = id;
}
function goUp(): void {
  const node = props.nodes.find((n) => n.id === at.value);
  if (node !== undefined && node.parent !== ROOT_PARENT) at.value = node.parent;
}
function cutNew(): void {
  newAt.value = CUT;
  emit("answer", CUT);
}
function pasteNew(): void {
  newAt.value = at.value;
  emit("answer", at.value);
}
function openFile(id: number): void {
  openId.value = id;
  emit("answer", id);
}
</script>

<template>
  <div class="dateimanager" :class="{ 'dateimanager-checked': checked }">
    <p>
      {{
        fill(task, current.mode === "ablegen" ? { datei: current.ablage.datei } : { pfad: path(props, current.ziel) })
      }}
    </p>
    <div class="dateimanager-window">
      <p class="dateimanager-bar">
        <span class="dateimanager-here">{{ here }}</span>
        <span>{{ bar }}</span>
      </p>
      <div class="dateimanager-tools">
        <button type="button" :disabled="isRoot" @click="goUp">↑ {{ up }}</button>
        <button v-if="mode === 'ablegen' && newAt === CUT && newFile" type="button" @click="pasteNew">
          {{ fill(paste, { datei: newFile.name }) }}
        </button>
      </div>
      <ul class="dateimanager-list">
        <li v-for="node in shown" :key="node.id">
          <button v-if="!node.datei" type="button" class="dateimanager-folder" @click="goInto(node.id)">
            <span class="dateimanager-icon dateimanager-icon-folder" aria-hidden="true"></span>
            <span class="dateimanager-sr">{{ folder }}</span>
            {{ node.name }}
            <span aria-hidden="true">›</span>
          </button>
          <div v-else class="dateimanager-file" :class="{ 'dateimanager-open': node.id === openId }">
            <span class="dateimanager-icon dateimanager-icon-file" aria-hidden="true"></span>
            <span class="dateimanager-sr">{{ file }}</span>
            <span class="dateimanager-name">{{ node.name }}</span>
            <button v-if="mode === 'ablegen' && node.id === NEW_FILE" type="button" @click="cutNew">{{ cut }}</button>
            <button v-if="mode === 'oeffnen'" type="button" @click="openFile(node.id)">{{ open }}</button>
          </div>
        </li>
        <li v-if="shown.length === 0" class="dateimanager-empty">{{ empty }}</li>
      </ul>
      <p v-if="mode === 'oeffnen' && openId" aria-live="polite">{{ fill(opened, { pfad: path(props, openId) }) }}</p>
    </div>
  </div>
</template>

<style scoped>
.dateimanager-window {
  border: 1px solid var(--page-border);
  border-radius: 0.5rem;
  background: var(--page-surface);
  padding: 0.5rem;
}

.dateimanager-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--page-border);
  border-radius: 0.25rem;
  background: var(--page-background);
  overflow-wrap: anywhere;
}

.dateimanager-here {
  color: var(--page-muted);
}

.dateimanager-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.dateimanager button {
  min-height: 44px;
}

.dateimanager-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dateimanager-list li {
  border-top: 1px solid var(--page-border);
}

.dateimanager-folder {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: start;
}

.dateimanager-folder > span:last-child {
  margin-inline-start: auto;
}

.dateimanager-file {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 0.5rem;
}

.dateimanager-name {
  flex: 1 1 auto;
}

.dateimanager-open {
  outline: 2px solid var(--page-accent);
}

.dateimanager-empty {
  padding: 0.5rem;
  color: var(--page-muted);
}

.dateimanager-icon {
  display: inline-block;
  width: 1.1rem;
  height: 0.9rem;
  border: 1px solid #333;
  border-radius: 2px;
}

/* the folder yellow as in the folder tree, the file white with a dashed border as a leaf of the tree */
.dateimanager-icon-folder {
  background: #f2c14e;
}

.dateimanager-icon-file {
  width: 0.8rem;
  height: 1rem;
  background: #fff;
  border-style: dashed;
}

.dateimanager-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
