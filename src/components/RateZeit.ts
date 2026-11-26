// The logic of RateZeit.vue: how long a computer needs on average to guess a password by trying every combination,
// for a length and a set of character kinds the learner chooses. Nobody types a password: only the length and the
// kinds count. The rate (guesses per second) and the sizes of the kinds are the app's assumptions, shown on the page.
// Pure functions: the size of the character set, the number of possible passwords, the mean time, and both as words.

/** A kind of characters, e.g. small letters, with how many there are. */
export interface Kind {
  name: string;
  size: number;
}

/** A unit of time: its name for 1 and for more, and how many seconds it has. */
export interface Unit {
  one: string;
  many: string;
  seconds: number;
}

/** A word for a large number, e.g. Millionen (1e6), and its value. */
export interface Big {
  name: string;
  value: number;
}

/** How many characters there are to choose from: the sizes of the chosen kinds added up. */
export function charset(kinds: readonly Kind[], chosen: readonly boolean[]): number {
  return kinds.reduce((sum, kind, i) => sum + (chosen[i] ? kind.size : 0), 0);
}

/** How many passwords of `length` characters there are from `size` characters: size to the power of length. */
export const possibilities = (size: number, length: number): number => size ** length;

/** The mean time in seconds to guess one: on average the right one comes after half of all tries. */
export const meanSeconds = (size: number, length: number, rate: number): number =>
  possibilities(size, length) / 2 / rate;

/** A number rounded honestly for words: whole numbers below 100, two leading digits above. */
export function roundHonest(value: number): number {
  if (value < 100) return Math.max(1, Math.round(value));
  const digits = Math.floor(Math.log10(value)) - 1;
  return Math.round(value / 10 ** digits) * 10 ** digits;
}

/**
 * A large count in words: "210 Milliarden", the number itself below the smallest word, and beyond a thousand of the
 * largest word `huge` with {n} for the number of digits ("eine Zahl mit 48 Stellen"); `about` goes before a rounded
 * number ("ungefähr"), never before `huge`.
 */
export function count(value: number, bigs: readonly Big[], locale: string, huge: string, about = ""): string {
  const sorted = [...bigs].sort((a, b) => b.value - a.value);
  const largest = sorted[0];
  if (largest !== undefined && value / largest.value >= 1000) {
    return huge.replace("{n}", String(Math.floor(Math.log10(value)) + 1));
  }
  const big = sorted.find((b) => value >= b.value);
  const scaled = big === undefined ? value : value / big.value;
  const rounded = roundHonest(scaled);
  const prefix = about === "" || rounded === scaled ? "" : `${about} `;
  return big === undefined
    ? `${prefix}${rounded.toLocaleString(locale)}`
    : `${prefix}${rounded.toLocaleString(locale)} ${big.name}`;
}

/**
 * A time in words in the largest unit that fits: "3 Jahre", "40 Minuten"; below the smallest unit `less`; beyond a
 * thousand of the largest word `huge`, whole, with {n} for the digits ("so viele Jahre, dass die Zahl 23 Stellen hat").
 */
export function duration(
  seconds: number,
  units: readonly Unit[],
  bigs: readonly Big[],
  less: string,
  locale: string,
  huge: string,
  about = "",
): string {
  const sorted = [...units].sort((a, b) => b.seconds - a.seconds);
  const smallest = sorted[sorted.length - 1];
  if (smallest === undefined || seconds < smallest.seconds) return less;
  const unit = sorted.find((u) => seconds >= u.seconds) ?? smallest;
  const amount = seconds / unit.seconds;
  const largest = Math.max(...bigs.map((b) => b.value));
  if (amount / largest >= 1000) return huge.replace("{n}", String(Math.floor(Math.log10(amount)) + 1));
  if (amount >= 1000) return `${count(amount, bigs, locale, huge, about)} ${unit.many}`;
  const rounded = roundHonest(amount);
  const prefix = about === "" ? "" : `${about} `;
  return `${prefix}${rounded.toLocaleString(locale)} ${rounded === 1 ? unit.one : unit.many}`;
}

/**
 * The step of the bar, in the units of the text: 0 seconds (below a minute), 1 minutes, 2 hours, 3 days (below a
 * year), 4 years (below a thousand years), 5 thousands of years and more.
 */
export function stage(seconds: number): number {
  const year = 365 * 24 * 3600;
  if (seconds < 60) return 0;
  if (seconds < 3600) return 1;
  if (seconds < 24 * 3600) return 2;
  if (seconds < year) return 3;
  if (seconds < 1000 * year) return 4;
  return 5;
}
