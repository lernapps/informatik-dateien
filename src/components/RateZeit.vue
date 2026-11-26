<script setup lang="ts">
// The guessing simulation of the page passwort: the learner sets a length with a slider and ticks the kinds of
// characters; the component shows how many characters there are to choose from, how many passwords that makes and
// how long a computer needs on average to guess one, at the rate the page names as the app's assumption. Nobody types
// a password. The logic is in RateZeit.ts. Start: 8 characters, small letters only.
import { computed, ref } from "vue";
import {
  charset,
  count,
  duration,
  meanSeconds,
  possibilities,
  stage,
  type Big,
  type Kind,
  type Unit,
} from "./RateZeit.ts";

const props = defineProps<{
  /** The label of the slider. */
  lengthLabel: string;
  /** The text after the length, e.g. "Zeichen". */
  characters: string;
  /** The label above the boxes. */
  kindsLabel: string;
  /** The kinds of characters with their sizes (an assumption the page names). */
  kinds: Kind[];
  /** The lines of the result, with {n} (characters to choose from), {l} (length), {anzahl}, {zeit}. */
  setLine: string;
  countLine: string;
  timeLine: string;
  /** The line when no kind is ticked. */
  none: string;
  /** Guesses per second: the app's assumption. */
  rate: number;
  units: Unit[];
  bigs: Big[];
  /** Below a second. */
  less: string;
  /** A count beyond the largest word, with {n} for its digits. */
  hugeCount: string;
  /** A time beyond the largest word, with {n} for its digits. */
  hugeTime: string;
  /** The names of the five steps of the bar, from seconds to thousands of years. */
  stages: string[];
  /** The word before a rounded number, e.g. ungefähr. */
  about: string;
  /** The language of the numbers, e.g. de-DE. */
  locale: string;
}>();

const length = ref(8);
const chosen = ref<boolean[]>(props.kinds.map((_, i) => i === 0));

const size = computed(() => charset(props.kinds, chosen.value));
const total = computed(() => possibilities(size.value, length.value));
const seconds = computed(() => meanSeconds(size.value, length.value, props.rate));
const step = computed(() => stage(seconds.value));
const fill = (text: string) =>
  text
    .replace("{n}", String(size.value))
    .replace("{l}", String(length.value))
    .replace("{anzahl}", count(total.value, props.bigs, props.locale, props.hugeCount, props.about))
    .replace(
      "{zeit}",
      duration(seconds.value, props.units, props.bigs, props.less, props.locale, props.hugeTime, props.about),
    );
</script>

<template>
  <div class="ratezeit">
    <label class="ratezeit-length">
      <span>{{ lengthLabel }}: {{ length }} {{ characters }}</span>
      <input v-model.number="length" type="range" min="4" max="24" step="1" />
    </label>
    <fieldset class="ratezeit-kinds">
      <legend>{{ kindsLabel }}</legend>
      <label v-for="(kind, i) in kinds" :key="i">
        <input v-model="chosen[i]" type="checkbox" />
        {{ kind.name }} ({{ kind.size }})
      </label>
    </fieldset>
    <div class="ratezeit-result" aria-live="polite">
      <template v-if="size > 0">
        <p>{{ fill(setLine) }}</p>
        <p>{{ fill(countLine) }}</p>
        <p>
          <strong>{{ fill(timeLine) }}</strong>
        </p>
        <ol class="ratezeit-bar" :aria-label="stages[step]">
          <li v-for="(name, i) in stages" :key="i" :class="{ 'ratezeit-on': i <= step }">
            <span>{{ name }}</span>
          </li>
        </ol>
      </template>
      <p v-else>{{ none }}</p>
    </div>
  </div>
</template>

<style scoped>
.ratezeit {
  border: 1px solid var(--page-border);
  border-radius: 0.5rem;
  background: var(--page-surface);
  padding: 0.75rem;
  margin: 1rem 0;
}

.ratezeit-length {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ratezeit-length input {
  width: 100%;
  min-height: 44px;
}

.ratezeit-kinds {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  border: 0;
  margin: 0.75rem 0;
  padding: 0;
}

.ratezeit-kinds label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
}

.ratezeit-kinds input {
  width: 1.25rem;
  height: 1.25rem;
}

.ratezeit-result p {
  margin: 0.25rem 0;
}

.ratezeit-bar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  font-size: 0.8rem;
}

.ratezeit-bar li {
  padding: 0.25rem 0.125rem;
  border: 1px solid var(--page-border);
  text-align: center;
  color: var(--page-muted);
  font-size: 0.75rem;
  hyphens: auto;
}

/* a step that the time reaches: filled, and its name in the page's text colour as a second mark */
.ratezeit-bar li.ratezeit-on {
  background: var(--page-accent);
  color: var(--page-on-accent);
  border-color: var(--page-accent);
}
</style>
