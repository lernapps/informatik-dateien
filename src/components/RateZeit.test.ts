import { expect, test } from "vite-plus/test";
import {
  charset,
  count,
  duration,
  meanSeconds,
  possibilities,
  roundHonest,
  stage,
  type Big,
  type Unit,
} from "./RateZeit.ts";

const kinds = [
  { name: "klein", size: 26 },
  { name: "groß", size: 26 },
  { name: "Ziffern", size: 10 },
  { name: "Sonderzeichen", size: 33 },
];
const units: Unit[] = [
  { one: "Sekunde", many: "Sekunden", seconds: 1 },
  { one: "Minute", many: "Minuten", seconds: 60 },
  { one: "Stunde", many: "Stunden", seconds: 3600 },
  { one: "Tag", many: "Tage", seconds: 86400 },
  { one: "Jahr", many: "Jahre", seconds: 31536000 },
];
const bigs: Big[] = [
  { name: "Tausend", value: 1e3 },
  { name: "Millionen", value: 1e6 },
  { name: "Milliarden", value: 1e9 },
  { name: "Billionen", value: 1e12 },
];
const RATE = 1e10;
const H = "eine Zahl mit {n} Stellen";

test("the character set adds up the chosen kinds", () => {
  expect(charset(kinds, [true, false, false, false])).toBe(26);
  expect(charset(kinds, [true, true, true, true])).toBe(95);
  expect(charset(kinds, [false, false, false, false])).toBe(0);
});

test("possibilities: one more character multiplies, one more kind only adds to the base", () => {
  expect(possibilities(10, 4)).toBe(10000);
  expect(possibilities(26, 9) / possibilities(26, 8)).toBe(26);
  expect(possibilities(36, 8)).toBeLessThan(possibilities(26, 10));
});

test("the mean time is half of all tries at the assumed rate", () => {
  expect(meanSeconds(10, 4, RATE)).toBe(5e-7);
  expect(meanSeconds(26, 8, RATE)).toBeCloseTo(10.44, 1);
});

test("times and counts are rounded honestly in words", () => {
  expect(roundHonest(3.4)).toBe(3);
  expect(roundHonest(0.4)).toBe(1);
  expect(roundHonest(1234)).toBe(1200);
  expect(duration(0.3, units, bigs, "weniger als eine Sekunde", "de", H)).toBe("weniger als eine Sekunde");
  expect(duration(10.44, units, bigs, "", "de", H)).toBe("10 Sekunden");
  expect(duration(3 * 31536000 + 5, units, bigs, "", "de", H)).toBe("3 Jahre");
  expect(duration(31536000, units, bigs, "", "de", H)).toBe("1 Jahr");
  expect(duration(2.6e6 * 31536000, units, bigs, "", "de", H)).toBe("3 Millionen Jahre");
  expect(duration(1e30, units, bigs, "", "de", "so viele Jahre, dass die Zahl {n} Stellen hat")).toBe(
    "so viele Jahre, dass die Zahl 23 Stellen hat",
  );
  expect(count(208827064576, bigs, "de", H)).toBe("210 Milliarden");
  expect(count(950, bigs, "de", H)).toBe("950");
  expect(count(208827064576, bigs, "de", H, "ungefähr")).toBe("ungefähr 210 Milliarden");
  expect(count(1e20, bigs, "de", H, "ungefähr")).toBe("eine Zahl mit {n} Stellen".replace("{n}", "21"));
  expect(duration(10.44, units, bigs, "", "de", H, "ungefähr")).toBe("ungefähr 10 Sekunden");
});

test("the bar has six steps in the units of the text, so 4 days are days, not months", () => {
  expect(stage(10)).toBe(0);
  expect(stage(600)).toBe(1);
  expect(stage(3600)).toBe(2);
  expect(stage(4 * 86400)).toBe(3);
  expect(stage(55 * 86400)).toBe(4);
  expect(stage(5 * 31536000)).toBe(5);
  expect(stage(1e12)).toBe(6);
});

test("an exact count needs no ungefähr", () => {
  expect(count(10000, bigs, "de", H, "ungefähr")).toBe("10 Tausend");
});
