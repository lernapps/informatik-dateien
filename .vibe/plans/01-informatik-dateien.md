---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Plan: informatik-dateien, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Kinder der Klassen 5-6 bringen Ordnung in Mias Tablet: Sie legen Dateien in einen Ordnerbaum, finden sie über ihren
Pfad wieder und vergleichen Tablet, USB-Stick und Cloud als Speicherorte nach Größe, Zugriff und Sicherheit. Am Ende
des Kapitels steht eine Regel für ihr eigenes Gerät. (Issue lernapps/apps#492, Welle 1: Kapitel 1, 3 Bausteine;
Kapitel 2 für 7-8 ist mitgeplant und kommt als Inkrement auf `increment/7-8`.)

## Key decisions

- Archetyp `explainer`: Der Auftrag verlangt einen Explainer im Format 2; Kinder brauchen Erklärseiten mit Bildern
  und einen simulierten Dateimanager als Komponente zwischen den Übungen. `quiz` fällt weg (es muss erst erklärt
  werden), `interactive` fällt weg (keine durchgehende Simulation, sondern Seiten mit Übungen).
- Strang `informatik/informatiksysteme`; alle 7 Bausteine liegen in diesem Strang.
- Kapitel wie im Auftrag: 1 `ordnen` „Ordner, Pfade und Speicherorte“ (5-6, Welle 1), 2 `schuetzen` „Daten sichern
  und schützen“ (7-8, später). Reihenfolge nach `requires` der Karte.
- Sammel-Wiederholung „Das brauchst du hier“ am Anfang von Kapitel 1 mit `recap` auf `programme-bedienen` (#490),
  `baum` (#491), `bit-und-byte` (#491) und `computer-bestandteile` (#490, der Festspeicher). Die ersten drei sind
  direkte `requires`; `computer-bestandteile` steht drin, weil der Auftrag den Festspeicher als Anknüpfung nennt.
- Mias Tablet ist das wiederkehrende Bild. Der Ordnerbaum wird als **Anzeige-Komponente `Ordnerbaum`** gezeichnet
  (Texte als Props je Sprache, wie `EvaBild` in #490), im Aussehen des Baums aus #491 (`baum-zimmer.svg`: Wurzel oben
  hellblau gefüllt, Knoten als abgerundete Rechtecke, Blätter gestrichelt). Grund: Ordner- und Dateinamen sind Text
  im Bild und müssen übersetzt werden; der Baum wächst von Seite zu Seite, eine Komponente zeichnet jeden Stand aus
  Daten. (guess, mit der Musterseite gemeldet)
- Simulierter Dateimanager als Übungskomponente `Dateimanager` (Auftrag): Ordner öffnen, nach oben gehen,
  Ausschneiden und Einfügen (knüpft an `programme-bedienen` an), Datei öffnen. Zwei Arten je Block: `ablegen`
  (S. 1) und `oeffnen` (S. 2). Warum keine Block-Übung: Navigieren in einem Baum und Verschieben lässt sich mit
  `matching`/`ordering` nicht ausdrücken (`prefer-built-in-block`).
- Pfade mit `/` und der Wurzel `Mias Tablet` als erstem Glied (`Mias Tablet/Schule/Deutsch/referat.txt`); ein Satz
  sagt, dass Computer die Wurzel anders schreiben (`/`, `C:\`) und manche `\` statt `/` nutzen. (guess)
- Sprachen `[de, en]`: Deutsch einfache Sprache mit „du“, Englisch Plain English mit „you“; Fachwörter wie im
  Computing curriculum England (file, folder, path, storage, cloud, USB stick). Ordner- und Dateinamen werden
  übersetzt (Schule/School), Namen der Figuren bleiben.
- Festgelegte Bilder (Nachtrag 2 des Orchestrators), mit Herkunft kopiert: `klasse-6b.svg` (Mia), `EvaBild` (#490),
  `glaeserner-computer.svg` (#490; Festspeicher = oranges Kästchen #e07b24), Baum-Stil aus `baum-zimmer.svg` (#491).
  Die Sammel-Wiederholung zeigt den gläsernen Computer als `labelled-figure` und knüpft am orangen Kästchen an: „Hier
  liegen Mias Dateien.“ Keine übersetzbaren Wörter in SVG-Dateien.
- Einheiten: 1 Byte = 8 Bit, 1 Kilobyte = 1000 Byte, 1 Megabyte = 1000 Kilobyte, 1 Gigabyte = 1000 Megabyte (Regeln
  des Epics, wie #491).

## Notes

### Strang und Bausteine

Strang `informatik/informatiksysteme` (Karte `informatik.json`, Status `draft`, `explainerFocus: strand`). Alle 7
Bausteine haben `practisedBy: []` (Lücken).

| Kapitel | Seite (Datei) | Baustein (id) | Stufe/Schritt | requires | opens |
|---|---|---|---|---|---|
| 1 Ordner, Pfade und Speicherorte | `ordnen/das-brauchst-du` | recap: programme-bedienen, baum, bit-und-byte, computer-bestandteile | – | – | – |
| 1 | `ordnen/ordner-und-dateien` | ordner-und-dateien | 5-6/4 | programme-bedienen, baum | 10 |
| 1 | `ordnen/dateipfad` | dateipfad | 5-6/5 | ordner-und-dateien | 3 |
| 1 | `ordnen/speicherorte` | speicherorte-vergleichen | 5-6/5 | ordner-und-dateien, bit-und-byte | 5 |
| 2 Daten sichern und schützen (7-8, später) | `schuetzen/das-brauchst-du` | recap: informatiksysteme-im-alltag, hardware-und-software | – | – | – |
| 2 | `schuetzen/datensicherung` | datensicherung | 7-8/1 | speicherorte-vergleichen | 4 |
| 2 | `schuetzen/passwort` | sicheres-passwort | 7-8/1 | informatiksysteme-im-alltag | 0 |
| 2 | `schuetzen/schadsoftware` | schadsoftware | 7-8/1 | hardware-und-software | 1 |
| 2 | `schuetzen/schutzsoftware` | schutzsoftware | 7-8/2 | schadsoftware | 0 |

„Ich kann …“-Sätze wörtlich aus der Karte:
- ordner-und-dateien: „Ich kann Dateien in einer sinnvollen Ordnerstruktur ablegen und wiederfinden.“
- dateipfad: „Ich kann den Ort einer Datei als Pfad angeben und einen Pfad lesen.“
- speicherorte-vergleichen: „Ich kann Speicherorte wie Gerät, USB-Stick und Cloud nach Kapazität, Erreichbarkeit und
  Sicherheit vergleichen.“
- datensicherung: „Ich kann meine Daten durch Sicherungskopien und gespeicherte Zwischenstände vor Verlust schützen.“
- sicheres-passwort: „Ich kann ein sicheres Passwort bilden und erklären, wie ich meine Zugänge schütze.“
- schadsoftware: „Ich kann Arten von Schadsoftware wie Viren und Trojaner beschreiben und erklären, wie sie auf ein
  Gerät gelangen.“
- schutzsoftware: „Ich kann erklären, wie Firewall, Virenschutz und Updates ein Gerät schützen, und
  Sicherheitseinstellungen nutzen.“

Voraussetzungen von außerhalb (nicht in dieser App geübt):
- Kapitel 1: `programme-bedienen` (#490; Ausschneiden, Einfügen, Speichern), `baum` (#491; Wurzel, Knoten, Kante,
  Blatt), `bit-und-byte` (#491; Byte, Kilobyte, Megabyte, Gigabyte), dazu der Festspeicher aus
  `computer-bestandteile` (#490). Eine Sammel-Wiederholung am Kapitelanfang.
- Kapitel 2: `informatiksysteme-im-alltag` (für `sicheres-passwort`) und `hardware-und-software` (für
  `schadsoftware`), beide #490. Eine Sammel-Wiederholung am Kapitelanfang. `datensicherung` und `schutzsoftware`
  bauen auf Seiten dieser App auf.

### Quellen (geöffnet und gelesen; Zitate von einem Hilfsagenten ausgelesen, Kernstellen von mir in den Texten nachgesehen)

- Lernlandkarte Informatik: https://lernapps.net/apps/map/informatik.json (Strang informatiksysteme).
- GI: Bildungsstandards Informatik Sek I (2025), doi:10.18420/rec2025_052,
  https://www.mnu.de/images/fachbereiche/Informatik/Bildungsstandards_Sek_I_2025__pdf-A_.pdf, S. 19, Abschnitt 5.4:
  Jg. 5-6 IS-3 „öffnen und speichern Dateien an verschiedenen, bewusst gewählten Orten“, IS-4 „schützen den Zugang …
  durch geeignete Maßnahmen“; Jg. 7-10 IS-8 „sichern ihre Daten durch geeignete Maßnahmen (z. B. Versionierung,
  Redundanz)“, IS-9 „beschreiben und benutzen Sicherheitsfunktionen“. S. 20 IMG-5 (menschliches Verhalten und
  Sicherheit). Die Wörter Pfad, Ordner, Cloud, Passwort kommen nicht vor.
- NRW: Kernlehrplan Informatik 5/6 (2021),
  https://lehrplannavigator.nrw.de/system/files/media/document/file/si_kl5u6_if_klp_2021_07_01.pdf, S. 19:
  „erläutern Prinzipien der strukturierten Dateiverwaltung“, „vergleichen Möglichkeiten der Datenverwaltung
  hinsichtlich ihrer spezifischen Charakteristika (u. a. Speicherort, Kapazität, Aspekte der Datensicherheit)“.
- Bayern LehrplanPLUS: Gymnasium NT 6, LB 2.3 „Hierarchische Informationsstrukturen – Dateisystem“
  (https://www.lehrplanplus.bayern.de/fachlehrplan/gymnasium/6/nt_gym): „nutzen einen Dateimanager, um Dateien und
  Ordner in einer hierarchischen Struktur geeignet zu organisieren“, „geben die Lage von Dateien … durch Pfade an“,
  Fachbegriffe „Ordner, Datei, Pfad, Baum, Wurzel, Knoten, Kante, Blatt“. Mittelschule Informatik 5, LB 1:
  „Ordner/Verzeichnisse, Dateien; … Pfade“. MS Informatik 6, LB 1 und Gymnasium NT 7, LB 2.2: sichere Passwörter,
  Virenschutz, Firewall, Viren, Trojaner, Datensicherung (für Kapitel 2). **Nicht geprüft:** Gymnasium Informatik 7
  (URL leitet auf die Startseite).
- Hessen: Handreichung „Digitale Welt“ (HMKB, Nov. 2024),
  https://kultus.hessen.de/sites/kultus.hessen.de/files/2024-11/hmkb_digwelt_nov24_barrierefrei_v2.pdf, S. 15
  (Datensicherheit/Datenschutz unterscheiden, Jg. 6 – das gehört nach #505), S. 28 (Dateien nach Größe ordnen). Ordner,
  Pfad, Cloud nicht genannt.
- BSI für Bürger (Cloud): „für den Zugriff auf Cloud-Dienste immer ein geeigneter Netzwerkanschluss
  (Internetverbindung) benötigt“, Daten werden „an einen ‚Fremden‘ (den Cloud-Anbieter) übermittelt“, „entfernte
  Server“; Seiten unter https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cloud-Computing-Sicherheitstipps/
  (genaue Unterseiten-Adressen trage ich beim Bauen ein). Tablet/Smartphone: „deutlich größere Wahrscheinlichkeit des
  Verlusts oder Diebstahls“ (https://www.bsi.bund.de/dok/6598916). Für Kapitel 2: Passwörter (dok/6596574, „Je
  länger, desto besser“; Seite nennt 25 und „20 bis 25“ Zeichen uneinheitlich), Datensicherung (dok/6599060,
  dok/6598916 „mehrere Kopien … an unterschiedlichen Orten“; **keine** 3-2-1-Regel beim BSI), Schadprogramme
  (dok/6596284, dok/6596868, dok/6599600), Updates (dok/504184), Virenschutz (dok/504492, dok/504502).
- Pfadtrenner: Microsoft Learn https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file („Use a backslash
  (\\) to separate the components of a path“); POSIX.1-2024 https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap03.html,
  3.254 („separated by <slash> characters“). Apple **nicht geprüft**.
- Dateigrößen (Foto 4 MB, Lied 4 MB, Video 100 MB je Minute, Text 20 KB) und Speichergrößen (Tablet 64 GB, Stick
  32 GB, Cloud 15 GB): **ohne Primärquelle**, als „ungefähr, Beispiel“ im Text (guess).

### Didaktik

- Leitbild **Mias Tablet**. Mia (11) aus der Klasse 6b (#490/#491): schwarze Locken #222, runde Brille, Haut #8d5a3b,
  lila Jacke #7b4fb8. Ihr Tablet (guess, mit der Musterseite gemeldet): Hülle türkis #2a9d8f mit einem gelben Stern
  #f2c14e als Aufkleber, Bildschirm dunkel #1f2a36 mit hellem Rand. Weitere Figuren aus der 6b: Selin (Bild vom Fest
  schicken, Pfad) und Jona (Stick).
- Mias Ordnerbaum wächst: S. 1 drei Ordner unter der Wurzel `Mias Tablet` (Schule, Fotos, Musik) mit losen Dateien,
  die eingeräumt werden; S. 2 eine Ebene tiefer (Schule → Deutsch, Mathe; Fotos → Klassenfahrt), zwei Dateien mit
  gleichem Namen `notizen.txt` in Deutsch und Mathe: erst der Pfad unterscheidet sie; S. 3 derselbe Baum auf Stick
  und in der Cloud (Bild); Kapitel 2: der Baum wird kopiert (Sicherung), bekommt ein Schloss (Passwort) und wird
  angegriffen.
- Die Fotos der Klassenfahrt (Seeberg, Zimmer 22) knüpfen an die Geschichte von #491 an.
- Kapitelende mit einer **Regel für das eigene Gerät** (Auftrag): Kapitel 1 „Jede Datei bekommt einen klaren Namen
  und ihren Ordner. Was wichtig ist, liegt an zwei Orten.“ Der zweite Satz führt zu Kapitel 2.
- Unplugged als Anleitung: S. 1 „Ordne deinen Schulranzen als Baum“ (Ranzen → Mappen → Blätter); S. 2 „Pfad-Diktat“
  zu zweit: eine sagt den Pfad, der andere zeigt im gezeichneten Baum. Geprüft wird mit den Übungen.

### Wie die Kinder hinkommen, welcher Fehler abgefangen wird

- ordner-und-dateien: Mia findet ihr Referat nicht, weil alles lose auf dem Tablet liegt. Die Kinder sehen den Baum
  aus #491 wieder: Wurzel = Tablet, Knoten = Ordner, Blätter = Dateien, und leiten selbst ab, dass ein Ordner
  weitere Ordner enthalten kann, eine Datei aber nichts. Im Dateimanager räumen sie lose Dateien mit Ausschneiden und
  Einfügen in passende Ordner. Fehler: „Eine Datei kann Ordner enthalten“, „Ein Ordner ist eine Datei“, Datei in den
  Ordner der falschen Art (Foto zu Musik), „Je mehr Ordner, desto besser“ (leere oder doppelte Ordner), Endung
  `.jpg`/`.mp3` übersehen.
- dateipfad: Der Pfad ist der Weg von der Wurzel zum Blatt, die Kinder lesen ihn im Baum ab, legen ihn aus Teilen
  (Reihenfolge) und öffnen eine Datei im Dateimanager über ihren Pfad. Zwei Dateien `notizen.txt` zeigen, warum der
  Name allein nicht reicht. Fehler: Reihenfolge umgekehrt (Datei zuerst), ein Ordner fehlt im Pfad, Pfad endet beim
  Ordner, gleiche Namen verwechselt.
- speicherorte-vergleichen: Mias Tablet ist voll (Videos der Klassenfahrt). Die Kinder rechnen mit Byte-Angaben
  (wie viele Fotos passen?), vergleichen in einer Tabelle Tablet, USB-Stick und Cloud nach Kapazität, Erreichbarkeit
  (ohne Internet? von einem anderen Gerät?) und Sicherheit (verlieren, kaputt, fremde Rechner, Passwort) und wählen
  für eine Lage den passenden Ort mit Grund. Fehler: „Die Cloud ist nirgendwo / im Himmel“ (sie liegt auf Rechnern
  einer Firma), „Cloud geht auch ohne Internet“, 1 GB = 1024 MB oder MB und GB verwechselt, „Auf dem Stick ist es
  sicher, weil ich ihn habe“ (verlieren), „Es gibt einen Ort, der immer am besten ist“.
- Kapitel 2 (später): datensicherung – Mias Tablet fällt ins Wasser; Kopie an einem zweiten Ort, Zwischenstände
  speichern; Fehler: „Verschieben ist Sichern“, „Die Kopie auf demselben Gerät reicht“. sicheres-passwort –
  Simulation, wie lange ein Rechner zum Erraten braucht (Länge und Zeichenarten); Fehler: „Kurz und mit Sonderzeichen
  ist sicherer als lang“, „ein Passwort für alles“. schadsoftware – Fälle (Anhang, falsche App, Stick); Fehler:
  „Schadsoftware kommt nur von schlechten Webseiten“, Virus/Trojaner verwechselt. schutzsoftware – Firewall,
  Virenschutz, Updates; Fehler: „Updates sind nur neue Funktionen“, „Mit Virenschutz kann nichts passieren“.

### Umfang

- Drin (Welle 1): Datei (Name, Endung zeigt die Art), Ordner, Unterordner, Ordnerbaum, Ablegen und Wiederfinden mit
  Ausschneiden/Einfügen, Pfad lesen und angeben (mit `/`), Speicherorte Gerät (Festspeicher), USB-Stick und Cloud nach
  Kapazität (in MB und GB), Erreichbarkeit und Sicherheit.
- Nicht drin (Abgrenzung #492): Baum als Datenstruktur und Byte selbst (#491, nur Wiederholung); Datenschutz im
  rechtlichen Sinn (#505); wie Daten durch das Netz reisen (#502), die Cloud nur als „Speicher auf Rechnern einer
  Firma, über das Internet“; Terabyte (Karte nennt KB, MB, GB); externe Festplatte nur als Nebensatz.
- Daten: ein erfundener Ordnerbaum mit 3-4 Ordnern je Ebene und höchstens 3 Ebenen unter der Wurzel (360 px);
  Dateigrößen gerundet und als „ungefähr“ benannt: Text 20 KB, Foto 4 MB, Lied 4 MB, Video 1 Minute 100 MB; Tablet
  64 GB, Stick 32 GB, kostenloser Cloud-Speicher 15 GB. Die Größen sind typische Werte, keine Marken (guess, Quelle
  folgt bei der Recherche).
- Sprachen: Deutsch (einfache Sprache, „du“) und Englisch (Plain English, „you“), je ein vollständiger Seitenbaum.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [ ] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.

### Answers

Die „Ersteller“-Rolle hat in diesem Epic der Orchestrator (lernapps/apps#509). Die Antworten stehen im Auftrag
(Issue lernapps/apps#492) und in den gemeinsamen Regeln des Epics; ich zitiere sie.

- Goal: „Ich kann Dateien in Ordnern ablegen, sie über ihren Pfad wiederfinden und Speicherorte nach Größe, Zugriff
  und Sicherheit vergleichen.“ (Kapitel 1, #492)
- Learners: Informatik, „Stufen 5-6, 7-8“ (#492); Welle 1 nur 5-6. Vorwissen: Programme bedienen (#490), Baum und
  Bit/Byte (#491).
- Model and focus: „Das Gerät einer Figur (Mias Tablet) begleitet das Explainer: Sein Ordnerbaum wächst als Bild von
  Kapitel zu Kapitel …“; „in einem simulierten Dateimanager gebaut“ (#492, Didaktik). Kein Vorbild im Katalog.
- Hurdles: im Auftrag nicht genannt; meine Annahmen unter Notes (guess), offene Frage am Checkpoint „Recherche“.
- Content: Ich schreibe die Inhalte aus Karte, GI-Bildungsstandards, Lehrplänen HE/BY/NRW und BSI (Regeln des Epics).
- Amount: „Welle 1 (Stufe 5-6): Kapitel 1 mit 3 Bausteinen. Kapitel 2 (7-8) kommt später als Inkrement auf
  `increment/7-8`; plane es mit, baue es nicht.“
- Languages: „Jede App in Deutsch und Englisch, ein Seitenbaum je Sprache. Englisch vollständig … plain English,
  ‚you‘.“ „Deutsch in einfacher Sprache (ISO 24495), ‚du‘.“
- Look and feel: fixed by the archetype.
- Terms: „Englische Fachbegriffe wie im Computing curriculum in England (file, folder, path, storage, cloud)“;
  „Produktnamen nur als Beispiel: ‚Cloud-Speicher‘, ‚Dateimanager‘, nicht Marken.“ Baum-Wörter wie #491: Wurzel,
  Knoten, Kante, Blatt.
- Finding the app: Katalogeintrag macht der Orchestrator; Suchwörter (guess): Ordner und Dateien, Dateipfad,
  Speicherorte Cloud USB-Stick, Dateimanager Klasse 5.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [ ] Map the content as "Map the content" of skill `lernapps-<archetype>-design` says, and write the result under
      "Content method".
- [ ] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [ ] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [ ] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [ ] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype <archetype>`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-<archetype>`.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: pattern: the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
<!-- tasks: pages: the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
