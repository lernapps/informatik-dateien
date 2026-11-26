---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: plan
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Increment: informatik-dateien-7-8

<!--
For you, the assistant. One increment of a published app: new competencies, chapters, pages, rounds, questions, or a
correction. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Content method and Retrospective, in the creator's
  language. Delete the comment of a section once the section is filled.
- The first version's decisions stand: archetype, content method, content guide. Never change an earlier plan.
- Work on the branch `increment/<NN>-<short name>`. Until Commit everything is local: push nothing.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Jugendliche der Klassen 7-8 schützen Mias Dateien vor Verlust und Angriffen: Sie legen Sicherungskopien an, bilden
sichere Passwörter, erkennen, wie Schadsoftware auf ein Gerät kommt, und schützen es mit Schutzsoftware, Updates und
Einstellungen. (Issue lernapps/apps#492, Welle 2: Kapitel 2 `schuetzen`, 4 Bausteine.)

## Key decisions

- Kapitel `schuetzen` „Daten sichern und schützen“ nach `ordnen`, wie im ersten Plan geplant; Reihenfolge nach der Karte:
  Sammel-Wiederholung, `datensicherung`, `passwort`, `schadsoftware`, `schutzsoftware`.
- Sammel-Wiederholung `schuetzen/das-brauchst-du` mit `recap: [informatik/informatiksysteme-im-alltag,
  informatik/hardware-und-software]` (#490); `speicherorte-vergleichen` übt die App selbst (Kapitel 1).
- Geschichte für 7-8 als **Nachrichten zwischen Mia und Selin** (Form 7-9, `explainer-age-appropriate`): Ein Jahr
  später, alle 12, Klasse 7b (Vorgabe des Orchestrators für alle Explainer der Welle 2). Bild nur, wo es etwas zeigt (Ordnerbaum, Simulation). (guess)
- Mias Ordnerbaum wächst weiter: Stand 3 (wie Stand 2) als Kopie mit anderer Wurzel („Sicherung auf dem Stick“) –
  dafür bekommt `Ordnerbaum` eine optionale Prop für den Namen der Wurzel. (guess)
- Rate 10¹⁰ Versuche pro Sekunde und Zeichenvorrat 26/26/10/33 stehen als Annahmen der App auf der Seite (Orchestrator).
- Updates: Wir folgen BSI dok/6687234 (automatisch). Passwortlänge: „sehr lang (das BSI nennt 20 bis 25 Zeichen)“ mit Link.
- Komponenten so, dass sie nach dem Update auf app-templates 0.22 `unanswered` nutzen können.
- **Musterseite** ist `schuetzen/passwort`: Sie hat beide neuen Muster (Nachrichten, Simulation). Die Seite wird zuerst
  gebaut, steht im Kapitel aber an zweiter Stelle. (guess)
- Neue Anzeige-Komponente `RateZeit` (Simulation): Länge (Regler 4–24) und Zeichenarten (Kästchen) wählen → Zahl der
  möglichen Passwörter und Ratezeit. Kein Eingabefeld für ein Passwort. Die Rate von 10 Milliarden Versuchen pro
  Sekunde ist eine **Annahme der App** und steht so auf der Seite (das BSI nennt keine Zahl – wird geprüft). (guess)
- Keine Anleitung zum Angriff: Fälle zeigen nur, *wie* Schadsoftware hereinkommt und wie man sich schützt.
- Kapitelregel: „Sichere an zwei Orten, einer davon nicht zu Hause. Ein eigenes, langes Passwort für jeden Zugang.
  Updates sofort.“ Die Regel ist eine Regel der App; belegt wird nur, was das BSI sagt.
- Tooling 0.20.1 (neueste) hebt app-templates nur auf ^0.21.0; die vom Orchestrator genannten Neuerungen
  (`unanswered`, Bild je Sprache, `tasks: { start: first }`) sind dort nicht enthalten. Kein Anheben von Hand
  (Preset), dem Orchestrator gemeldet.

## Notes

### Bausteine (Karte, Strang informatiksysteme, Stufe 7-8)

| Seite | Baustein | Schritt | requires | „Ich kann …“ |
|---|---|---|---|---|
| `schuetzen/das-brauchst-du` | recap informatiksysteme-im-alltag, hardware-und-software | – | – | – |
| `schuetzen/datensicherung` | datensicherung | 7-8/1 | speicherorte-vergleichen (Kap. 1) | „Ich kann meine Daten durch Sicherungskopien und gespeicherte Zwischenstände vor Verlust schützen.“ |
| `schuetzen/passwort` | sicheres-passwort | 7-8/1 | informatiksysteme-im-alltag (recap) | „Ich kann ein sicheres Passwort bilden und erklären, wie ich meine Zugänge schütze.“ |
| `schuetzen/schadsoftware` | schadsoftware | 7-8/1 | hardware-und-software (recap) | „Ich kann Arten von Schadsoftware wie Viren und Trojaner beschreiben und erklären, wie sie auf ein Gerät gelangen.“ |
| `schuetzen/schutzsoftware` | schutzsoftware | 7-8/2 | schadsoftware | „Ich kann erklären, wie Firewall, Virenschutz und Updates ein Gerät schützen, und Sicherheitseinstellungen nutzen.“ |

### Quellen

Wie im ersten Plan (GI IS-8, IS-9, IMG-5; BY MS 6 LB 1, Gym NT 7 LB 2.2; BSI-Seiten). Dazu, von einem Hilfsagenten
geöffnet und zitiert (alle HTTP 200, BSI, Verbraucherbereich):
- Firewall, https://www.bsi.bund.de/dok/504484: „kontrolliert … Alle Daten, die das Netz verlassen werden ebenso
  überprüft, wie die, die hinein wollen“; Personal Firewall soll verhindern, „dass bestimmte Programme … Kontakt vom
  Rechner zum Internet aufnimmt“.
- Mobilgeräte, https://www.bsi.bund.de/dok/6687234: „Bildschirm-Sperre oder die PIN-Abfrage“, „Aktivieren Sie die
  automatische Update-Funktion“, Zugriffsrechte prüfen, „Im Zweifelsfall ist es besser, die App nicht zu
  installieren“. Apps, https://www.bsi.bund.de/dok/6684714: „nur aus vertrauenswürdigen Quellen“. **Widerspruch:**
  dok/6684714 rät bei Apps zu manuellen Updates; ich folge dok/6687234 (automatisch) und nenne den Grund nicht.
- Zwei-Faktor, https://www.bsi.bund.de/dok/509176: Faktoren aus Wissen, Besitz, Biometrie; „Wenden Sie eine
  Zwei-Faktor-Authentisierung an, sobald ein Online-Dienst dies ermöglicht.“
- Passwort-Manager (BSI-Seite „Passwort-Manager“ unter Accountschutz): „in der Regel lohnt sich“; nur ein
  Masterpasswort merken, verliert man es, „sind im schlechtesten Fall alle Daten verloren“.
- Datensicherung: „Datensicherung – wie geht das?“: Häufigkeit „hängt von Ihnen ab“, „Programme, die den
  Speicherprozess automatisch abwickeln“, „räumlich getrennt vom PC“; https://www.bsi.bund.de/dok/10655274:
  „regelmäßigen Turnus“, gelegentlich prüfen, ob das Back-up lesbar ist; dok/6598916: „mehrere Kopien … an
  unterschiedlichen Orten“, „unter einem anderen Dokumentennamen, wenn Sie alte Versionen behalten wollen“ (das sind
  die Zwischenstände; „Version“ als Wort sonst nicht beim BSI).
- Ransomware, https://www.bsi.bund.de/dok/10366332: schränkt den Zugriff auf Daten ein, „Lösegeld“; „regelmäßig
  Sicherheitskopien anzulegen, ist eine wirksame Ransomware-Prävention“.
- Wege der Schadsoftware, dok/6596284: Dateianhang, „Zugabe“ bei einem Gratis-Download, Makro; USB-Sticks „spielen
  auch heute noch … eine Rolle“.
- **Keine Zahl für Rateversuche pro Sekunde beim BSI** (dok/6596574 nur: Werkzeuge, „die vollautomatisch alle
  möglichen Zeichenkombinationen ausprobieren“). Die Rate der Simulation ist eine Annahme der App und steht so da.
- Nicht geprüft: deutsche Fassungen von dok/6596868 (Trojaner) und dok/6599600 (Viren/Würmer) diesmal nicht neu
  geöffnet (im ersten Plan gelesen); BSI-Seite Phishing; Inhalte von dok/504184, 504492 nicht neu gelesen.
- Cloud-Synchronisation („gelöschte Datei wird mitgelöscht“): kein BSI-Beleg gefunden → kommt nicht vor.

### Didaktik und Fehler je Baustein

- datensicherung: Mias Tablet fällt in den See (Nachricht). Was ist noch da? Nur, was es an einem zweiten Ort gibt.
  Kopieren statt verschieben, regelmäßig, Zwischenstände (Versionen, automatisches Speichern). Rechnen: Wie viele Tage
  Arbeit sind weg, wenn die letzte Sicherung am Sonntag war? Fehler: „Verschieben ist Sichern“, „Kopie auf demselben
  Gerät reicht“, „einmal sichern reicht“, „die Sicherung muss ich nie prüfen“. Erpressungssoftware als Grund für eine
  Kopie, die nicht am Gerät hängt.
- sicheres-passwort: Selins Zugang wurde erraten („selin2011“). Simulation: Länge und Zeichenarten → Ratezeit; die
  Kinder leiten ab, dass Länge mehr bringt als ein Sonderzeichen. Dazu: ein Passwort je Zugang, Passwortmanager,
  Zwei-Faktor (wenn BSI belegt). Fehler: „kurz mit Sonderzeichen ist sicherer als lang“, „ein starkes Passwort für
  alles“, „Name + Geburtsjahr ist geheim“, „Passwort im Chat teilen ist ok, wenn es die Freundin ist“.
- schadsoftware: Fälle: Anhang in einer Mail, Gratis-Spiel aus unbekannter Quelle, fremder USB-Stick, Makro in einem
  Dokument (BSI). Arten: Virus (braucht ein Wirtsprogramm), Wurm (ohne Wirt), Trojaner (getarnt als nützlich, vermehrt
  sich nicht), Erpressungssoftware (wenn BSI belegt). Fehler: „nur von schlechten Webseiten“, Virus/Trojaner
  verwechselt, „Tablets bekommen keine Schadsoftware“.
- schutzsoftware: Firewall, Virenschutz (Signaturen aktuell halten), Updates (schließen Sicherheitslücken),
  Einstellungen (Bildschirmsperre, automatische Updates, App-Rechte). Fall → welcher Schutz hilft. Fehler: „Updates
  bringen nur neue Funktionen“, „mit Virenschutz kann nichts passieren“, „Firewall = Virenschutz“.

### Umfang

- Drin: die 4 Bausteine, BSI-Empfehlungen für Privatleute, Mias Geräte (Tablet, Stick, Cloud) aus Kapitel 1.
- Nicht drin: Datenschutz im rechtlichen Sinn (#505), Verschlüsselung (#491), wie Daten durchs Netz reisen (#502),
  jede Anleitung zum Angriff; keine Produktnamen; kein Eingabefeld für echte Passwörter.
- Zahlen: Zeichenvorrat 26 / 26 / 10 / 33 (Sonderzeichen: Annahme, die Seite nennt sie), Länge 4–24, Rate 10^10 pro
  Sekunde (Annahme der App), Zeiten gerundet in Sekunden bis Jahren.
- Sprachen: Deutsch (einfache Sprache, „du“) und Englisch, wie Kapitel 1.

## Explore

<!--
- All content questions belong here; Plan maps the answers onto the app. Ask; write no code.
- Skip what earlier answers or the app already tell. At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Read the README of the archetype's template (its path is in skill `lernapps-app`): what the app can do now.
      Tell the creator what is new, if it matters for this increment.
- [x] Load the content guide `.agents/skills/app-content/SKILL.md` and read the earlier plans in `.vibe/plans/`: what
      the app teaches, how its content is made, what is open.
- [x] Interview, one topic per question, the creator's words under "Answers": which competencies, chapters or rounds,
      for which school years; hurdles and examples; the amount; any change of look and feel or of terms. No answer:
      ask once more, then write your assumption with "(guess)".
- [x] Load skill `lernapps-content-research`. Research what the content guide does not cover. Write under "Notes":
      the new competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" the didactic approach per competency and the scope (in, out, data range).
- [x] The increment needs a kind of content the guide does not cover (a new page structure, screen, component or kind
      of exercise): load skills `lernapps-explainer-design` and `lernapps-exercise-patterns`. Else skip this task.
- [x] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.
      Creator: Plan passt, weiter mit der Musterseite passwort. Alter: Klasse 7b, alle 12, ein Jahr später (für alle Explainer der Welle 2). 10^10 Versuche pro Sekunde als Annahme der App, sichtbar; Zeichenvorrat 26/26/10/33 als Annahme. Updates: dok/6687234 (automatisch). Passwortlänge: sehr lang (das BSI nennt 20 bis 25 Zeichen), mit Link. Recap passt. Version: bei 0.21.0 bleiben.

### Answers

- Auftrag des Orchestrators (Welle 2): „Kapitel 2 ‚Daten sichern und schützen‘ (Bausteine `datensicherung`,
  `sicheres-passwort`, `schadsoftware`, `schutzsoftware`), wie im Issue #492 und in deinem Plan (Recap, Nachrichten
  Mia–Selin, Rate-Simulation, BSI-Belege).“
- Regeln: „Keine Anleitung zum Angriff, nur Schutz.“ „Die Passwort-Simulation rechnet Ratezeiten nur mit Annahmen, die
  du nennst (Versuche pro Sekunde), und kein Kind tippt ein echtes Passwort ein. Sag das auf der Seite.“ „Die Regel ‚an
  zwei Orten, einer davon nicht zu Hause‘ ist eine Regel der App. Belege nur, was das BSI sagt.“
- Ablauf: „Checkpoints Plan, Musterseite und Veröffentlichen, beide Prüfer (Lernende 7-8).“ Branch `increment/7-8`.
- Look and feel, Begriffe: wie Kapitel 1 (Inhaltsleitfaden).

## Plan

<!--
- Map the new content onto the app with the guide's patterns. The creator confirms the plan in one read.
- After the yes you work on your own.
-->

### Tasks

- [x] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [x] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [x] Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

**Aufbau.** Kapitel `schuetzen` in `src/app.yaml` an `chapters` angehängt; Seiten `das-brauchst-du`, `datensicherung`,
`passwort`, `schadsoftware`, `schutzsoftware`. Abschnitte wie im Inhaltsleitfaden (`einstieg`, `idee`, `beispiel` oder
`ausprobieren`, `uebung`, auf der letzten Seite `regel`). Neu: die Geschichte als **Nachrichten** – ein `text`-Block
mit Zeilen „**Selin:** …“ / „**Mia:** …“ (kein neuer Block, keine Komponente).

**Muster aus dem Leitfaden:** `generated` mit `choice` aus Datendatei (Lage → Antwort mit Grund je falscher Antwort),
`number` mit typischen Fehlern, `matching`, `true-false`, `multiple-choice`, `ordering`, Ordnerbaum.

**Neu:**
- Anzeige-Komponente `RateZeit` (S. `passwort`, Abschnitt `ausprobieren`): Regler „Länge“ (4–24), vier Kästchen
  (Kleinbuchstaben 26, Großbuchstaben 26, Ziffern 10, Sonderzeichen 33), darunter: Zeichenvorrat N, Möglichkeiten N^L
  (gerundet, mit Zehnerpotenz und Wort: „etwa 2 Billionen“), Ratezeit bei 10¹⁰ Versuchen/Sekunde, im Mittel die
  Hälfte (wird gesagt) – in Sekunden, Minuten, Stunden, Tagen, Jahren. Ein Balken (logarithmisch, beschriftet) zeigt
  die Zeit im Vergleich zu „1 Sekunde / 1 Tag / 1 Jahr / Alter des Universums“? Nein: nur Text und Balken mit Stufen
  „Sekunden – Tage – Jahre – Jahrtausende“. Kein Eingabefeld. Die Kinder ändern Länge und Zeichenarten und sehen: +1
  Zeichen multipliziert mit N, +1 Zeichenart addiert zu N. Warum keine Block-Übung: ein Modell, das man verstellt,
  ist kein Block (`prefer-built-in-block`). Text ohne JS: Tabelle mit Beispielen im `nojs`. Logik in `RateZeit.ts`
  mit Test. Keine Übungskomponente (die Übungen sind Blöcke), darum kein `unanswered` nötig.
- `Ordnerbaum`: optionale Prop `rootName` (Wurzel umbenennen, „Sicherung auf dem Stick“), S. `datensicherung`.
- Datendateien: `passwoerter-faelle.yaml` (Lagen zum Zugang), `verlust.yaml` (Lagen: was bleibt), `wege.yaml`
  (Fälle der Schadsoftware), `schutz.yaml` (Fall → Schutz).

**Je Seite (Übungen, Pflicht = generated):**
- `passwort`: number „Wie viele PINs mit 4 Ziffern?“ (10000; Fehler 40, 9999); generated `moeglichkeiten` (N^L
  für kleine L, Fehler N·L und L^N); single-choice „Welches ist am schwersten zu erraten?“ (lang vs. kurz mit
  Sonderzeichen); true-false „Ein starkes Passwort für alle Zugänge reicht“; multiple-choice „Was schützt deinen
  Zugang zusätzlich?“ (Zwei-Faktor, Passwort-Manager; nicht: Passwort an Freundin schicken, Passwort auf Zettel am
  Tablet).
- `datensicherung`: generated „verlorene Tage“ (letzte Sicherung am Tag a, Verlust am Tag b; Fehler b−a+1, 0);
  generated Lage → was bleibt (Tablet weg, Stick weg, Erpressungssoftware); ordering Sicherung in Schritten;
  true-false „Verschieben auf den Stick ist eine Sicherung“; matching Gefahr → Schutz.
- `schadsoftware`: generated Fall → Weg (Anhang, Gratis-Download, Makro, Stick); matching Art → Beschreibung (Virus,
  Wurm, Trojaner, Ransomware); true-false „nur von schlechten Webseiten“; single-choice „Woran erkennst du …“.
- `schutzsoftware`: generated Fall → Schutz (Firewall, Virenschutz, Update, Einstellung); multiple-choice
  Einstellungen am Tablet; true-false „Updates bringen nur neue Funktionen“; matching Schutz → was er tut.

**Figuren und Lernhandlung:** RateZeit – die Kinder erzeugen selbst die Zahlen, aus denen die Regel „Länge zählt“
folgt; die Seite fragt danach, was sie gesehen haben. Ordnerbaum-Kopie – zeigt, dass eine Sicherung derselbe Baum an
einem zweiten Ort ist. Sonst keine Bilder (7-8, Nachrichten).

**Voraussetzungen von außen:** `informatiksysteme-im-alltag`, `hardware-und-software` auf der Sammel-Wiederholung;
`speicherorte-vergleichen` übt Kapitel 1.

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [ ] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [ ] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [ ] Load skill `lernapps-explainer` and the content guide.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [ ] Slice passwort (Musterseite): Kapitel schuetzen anlegen (chapter.yaml, app.yaml), Seite schuetzen/passwort de+en mit Nachrichten Mia-Selin, Anzeige-Komponente RateZeit mit Logik und Test (Annahmen sichtbar, kein Eingabefeld), generated Möglichkeiten zählen, Übungen zu Zugang schützen (ein Passwort je Zugang, Passwort-Manager, Zwei-Faktor); kein Sub-Agent
- [ ] Slice Sammel-Wiederholung schuetzen/das-brauchst-du (de+en): recap informatiksysteme-im-alltag und hardware-und-software; kein Sub-Agent
- [ ] Slice datensicherung: Seite schuetzen/datensicherung de+en, Ordnerbaum als Kopie (Prop Wurzelname), generated verlorene Tage, Lage welche Daten bleiben, Zwischenstände; kein Sub-Agent
- [ ] Slice schadsoftware: Seite schuetzen/schadsoftware de+en, Fälle Wege der Schadsoftware (generated aus Datendatei), Arten zuordnen; kein Sub-Agent
- [ ] Slice schutzsoftware: Seite schuetzen/schutzsoftware de+en, Fall zu Schutz (generated), Einstellungen am Tablet, Kapitelregel und Rückblick; kein Sub-Agent
<!-- tasks: slices (5 added): one per competency, as written in Plan -->
- [ ] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
- [ ] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

## Commit

<!--
- Publish with the creator's yes. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
-->

### Tasks

- [ ] If pages or exercises changed, load skill `lernapps-explainer-self-assessment` and update the self-assessment
      as it says. Commit.
- [ ] Load skill `lernapps-github`. Push the branch, open the preview pull request and see its checks to green, as it
      says.
- [ ] **Checkpoint:** publish. Show what the increment adds and the preview link. Ask whether it may go online. Stop
      and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: the pull request squash-merged into
      `main`, the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm the new content. Never use a derived address.
- [ ] The app is listed and its entry changes (school years, summary): load skill `lernapps-listing` and write the
      changed entry. Else skip this task.
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it. A push of only `.vibe/` publishes nothing.
- [ ] The entry changed: open the pull request to the catalog as skill `lernapps-listing` says, without asking first,
      and see it to "bestanden". Else skip this task: `npx --no -- lernapps plan skip "entry unchanged"`.
- [ ] **Checkpoint:** list. Tell the creator the result: the pull request and its result, or, when the entry did not
      change, that the catalog takes over the app by itself. Tick it with their reply.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

## Retrospective

<!-- At the end of Commit. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, content guide, messages or answers, and your choice. "None" if none. -->
