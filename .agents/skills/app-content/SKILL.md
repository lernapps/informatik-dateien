---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Meine Dateien: ordnen, speichern, schützen“ (lernapps/apps#492, Epic Informatik lernapps/apps#509). Strang
`informatik/informatiksysteme`. Kapitel 1 für Stufe 5-6 (Welle 1), Kapitel 2 für Stufe 7-8 folgt als Inkrement auf
`increment/7-8`. Sprachen Deutsch (Ausgangssprache) und Englisch (vollständige Übersetzung).

## Curriculum

- Ordnung und Bausteine: Lernlandkarte Informatik, <https://lernapps.net/apps/map/informatik.json>, Strang
  `informatiksysteme`. Die Karte gibt die Reihenfolge (`requires`); kein Lehrplan nötig.
- Orientierung (gelesen):
  - GI: Bildungsstandards Informatik Sek I (2025), doi:10.18420/rec2025_052, S. 19, Abschnitt 5.4: IS-3 (5-6) „öffnen
    und speichern Dateien an verschiedenen, bewusst gewählten Orten“; IS-4 (5-6) Zugang schützen; IS-8 und IS-9 (7-10)
    Daten sichern, Sicherheitsfunktionen.
  - NRW: Kernlehrplan Informatik 5/6 (2021), S. 19: „strukturierte Dateiverwaltung“; Datenverwaltung nach
    „Speicherort, Kapazität, Aspekte der Datensicherheit“.
  - Bayern LehrplanPLUS: Gymnasium NT 6, LB 2.3 (Dateimanager, Pfade, Fachbegriffe Ordner, Datei, Pfad, Baum, Wurzel,
    Knoten, Kante, Blatt); Mittelschule Informatik 5, LB 1; für Kapitel 2 MS Informatik 6 LB 1 und Gymnasium NT 7 LB 2.2.
  - Hessen: Handreichung „Digitale Welt“ (HMKB, Nov. 2024), S. 15, S. 28 (wenig Bezug).
- Kein Material eines Erstellers; der Auftrag ist das Issue lernapps/apps#492.

## Competencies

Kapitel `ordnen` – Ordner, Pfade und Speicherorte (5-6):
- Sammel-Wiederholung `src/ordnen/das-brauchst-du.yaml` („Das brauchst du hier“): `recap` auf
  `informatik/computer-bestandteile`, `informatik/programme-bedienen` (beide #490), `informatik/baum`,
  `informatik/bit-und-byte` (beide #491). Ein kurzer Absatz je Baustein, keine Übung.
- `ordner-und-dateien`: „Ich kann Dateien in einer sinnvollen Ordnerstruktur ablegen und wiederfinden.“ →
  `src/ordnen/ordner-und-dateien.yaml` (Musterseite). Übungen: `was-hilft`, `ablegen` (Komponente), `wiederfinden`
  (generated, Pflicht), `ordner-loeschen`, `umbenennen`, `im-ordner`.
- `dateipfad`: „Ich kann den Ort einer Datei als Pfad angeben und einen Pfad lesen.“ → `src/ordnen/dateipfad.yaml`.
  Übungen: `weg-zum-see`, `ordner-ablesen` (generated, im Abschnitt `idee`), `oeffnen` (Komponente), `pfad-ordnen`
  (generated, Pflicht), `gleicher-name`.
- `speicherorte-vergleichen`: „Ich kann Speicherorte wie Gerät, USB-Stick und Cloud nach Kapazität, Erreichbarkeit
  und Sicherheit vergleichen.“ → `src/ordnen/speicherorte.yaml`. Übungen: `gb-in-mb`, `wie-viele-passen` (generated,
  Pflicht), `welcher-ort` (generated), `risiko`, `cloud-nirgendwo`, `cloud-brauchen`; Abschnitt `regel` mit der
  Kapitelregel und dem Rückblick.

Kapitel `schuetzen` – Daten sichern und schützen (7-8, noch nicht gebaut): `datensicherung`, `sicheres-passwort`
(Seite `passwort`), `schadsoftware`, `schutzsoftware`; Sammel-Wiederholung `informatiksysteme-im-alltag`,
`hardware-und-software`.

## Content structure

- Geschichte: **Mias Tablet**. Mia (11) aus der Klasse 6b: schwarze Locken #222, runde Brille, Haut #8d5a3b, lila
  Jacke #7b4fb8 (aus `klasse-6b.svg` von lernapps/informatik-computer). Ihr Tablet: türkise Hülle #2a9d8f, gelber
  Stern #f2c14e als Aufkleber unten rechts, Bildschirm #1f2a36 mit hellem Rand #dfe8ee. Weitere Figuren der 6b:
  Selin (will das Foto vom See, S. 2), Jona (hat einen USB-Stick, S. 3). Fotos vom Seeberg und Zimmer 22 knüpfen an
  die Klassenfahrt von #491 an.
- Mias Ordnerbaum wächst (`src/data/mias-tablet.yaml`, Feld `von`/`bis`): Stand 1 (S. 1) Wurzel „Mias Tablet“ →
  Schule (referat.txt), Fotos (Ordner Seeberg mit see.jpg, dazu party.jpg), Musik (lied.mp3): schon ein Ordner im
  Ordner; Stand 2 (S. 2) Schule → Deutsch, Mathe; zwei `notizen.txt`; Stand 3 (S. 3) derselbe Baum an drei Orten; Kapitel 2: Kopie, Schloss, Angriff.
- Abschnitte jeder Seite, ids fest, Titel passend zur Seite:
  1. `einstieg` – Szene, Ziel der Seite („Auf dieser Seite lernst du …“), eine erste leichte Frage vor der Erklärung.
  2. `idee` – das Neue mit Ordnerbaum oder Bild, `definition` je neuem Fachwort; ein Kasten `note` nur, wenn er
     keine spätere Übung beantwortet (S. 3: „Sicher?“). Höchstens 4 Textblöcke in Folge: sonst eine Übung dazwischen
     (S. 2: `ordner-ablesen`).
  3. `beispiel` – Kasten `example` mit einem Weg in Schritten (S. 2 Pfad zu den Mathe-Notizen, S. 3 Wohin mit den
     Videos?), auf S. 2 danach die unplugged-Anleitung als `note`.
  4. `ausprobieren` – nur wo der Dateimanager bedient wird (S. 1, S. 2): Anleitung der Knöpfe, die Komponente; auf
     S. 1 danach die unplugged-Anleitung als `note`.
  5. `uebung` – Übungen von leicht zu schwer, am Ende ein Text mit dem Lohn und dem nächsten Schritt der Geschichte.
  6. Nur auf der letzten Seite des Kapitels: `regel` – die Regel für das eigene Gerät und der Rückblick.
- Kapitelregel 1: „Jede Datei bekommt einen klaren Namen und ihren Ordner. Was wichtig ist, liegt an zwei Orten.“
- Länge: höchstens 350 Wörter zum Lesen und 350 in Aufgaben, höchstens 4 Textblöcke hintereinander.

## Terminology

- Deutsch in einfacher Sprache (ISO 24495), kurze Sätze, „du“. Englisch: Plain English, „you“.
- Fachwörter, beim ersten Auftreten als `definition` (de / en): Datei / file, Ordner / folder, Dateiendung / file
  extension, Dateimanager / file manager, Pfad / path, Speicherort / storage location, USB-Stick / USB stick,
  Cloud-Speicher / cloud storage. Baum-Wörter wie #491: Wurzel / root, Knoten / node, Kante / edge, Blatt / leaf.
- Befehle: Ausschneiden / Cut, Einfügen / Paste, Öffnen / Open, Nach oben / Up; Ausschneiden + Einfügen =
  verschieben / move.
- Pfade mit `/`, die Wurzel „Mias Tablet“ ist das erste Glied: `Mias Tablet/Schule/Deutsch/referat.txt`. Ein Satz
  sagt: Computer schreiben die Wurzel anders (`/` oder `C:\`), manche trennen mit `\`.
- Ordner- und Dateinamen höchstens 8 Zeichen vor der Endung, in beiden Sprachen: Schule/School, Fotos/Photos,
  Musik/Music, Deutsch/German, Mathe/Maths, Seeberg; referat.txt/speech.txt, see.jpg/lake.jpg, lied.mp3/song.mp3,
  notizen.txt/notes.txt, zimmer22.jpg/room22.jpg, party.jpg.
- Einheiten: 1 Byte = 8 Bit, 1 KB = 1000 Byte, 1 MB = 1000 KB, 1 GB = 1000 MB. „1024“ ist kein Denkfehler: eigene
  Meldung „Manche Geräte rechnen mit 1024. In dieser App rechnen wir mit 1000: 2 GB = 2000 MB.“ Kein Terabyte.
- Produktnamen nie: „Cloud-Speicher“, „Dateimanager“, nicht Marken.
- Vermeiden: „Verzeichnis“ (nur Ordner), „Datei speichern“ ohne Ort.

## Exercise patterns

- **Ordner wählen zum Wiederfinden** (`ordner-und-dateien`): `generated` `wiederfinden`, `pick: 1` aus
  `data/suchen.yaml` (Felder `was`, `ordner`, `falsch1`, `falsch2`, `grund1`, `grund2`), `choice` aus den drei
  Ordnern; je falscher Ordner sein Grund. Eindeutig: genau ein Ordner passt.
- **Dateimanager ablegen** (`ordner-und-dateien`): Komponente `Dateimanager`, `mode: ablegen`, Aufgaben aus
  `data/ablegen.yaml` (Felder `datei`, `ordner` als Liste passender Ordner-ids, `art`). Prüft die Eigenschaft
  „passender Ordner“. Meldungen: noch in Downloads; ausgeschnitten, nicht eingefügt; falscher Ordner mit `art`.
- **Dateimanager öffnen** (`dateipfad`): `mode: oeffnen`, Aufgaben aus `data/oeffnen.yaml` (Feld `ziel`, id einer
  Datei aus `mias-tablet`); eigene Meldung für die gleichnamige Datei in einem anderen Ordner.
- **Zählen im Baum** (`ordner-und-dateien`): `number` `ordner-loeschen`, Fehler 0 („nur der Ordner“), 1, 4.
- **Richtig oder falsch mit Grund**: `true-false` gegen einen typischen Fehler (`umbenennen`).
- **Was gehört dazu**: `multiple-choice` mit `info` je Option (`im-ordner`).
- **Pfad ordnen** (`dateipfad`): `generated` `pfad-ordnen`, `pick: 1` aus `data/pfade.yaml` (Felder `wurzel`, `o1`,
  `o2`, `name`, nur Dateien zwei Ordner tief), `compare: order`; Fehler: umgekehrt, Ordner vertauscht.
- **Ordner ablesen** (`dateipfad`): `generated` `ordner-ablesen`, gleiche Daten, `choice` aus fünf Ordnern; Fehler: der
  erste statt des letzten Ordners.
- **Umrechnen und teilen** (`speicherorte`): `number` `gb-in-mb` (2000, eigene Meldung für 2048) und `generated`
  `wie-viele-passen` aus `data/medien.yaml` (Felder `art`, `mb`) mit `g` aus 8, 16, 32, 64 GB; Fehler: nicht
  umgerechnet, mal statt geteilt, 1024 (als andere Zählweise).
- **Lage → Ort** (`speicherorte`): `generated` `welcher-ort` aus `data/lagen.yaml` (Felder `lage`, `ort`, `falsch1`,
  `falsch2`, `grund1`, `grund2`); jede Lage nennt, was entscheidet (Internet, wer, wo); genau ein Ort passt.
- **Ort → Risiko** (`speicherorte`): `matching` `risiko` mit einem Ablenker.
- Pfade stehen fett im Text (kein `code`-Block, nicht übersetzbar).

## Figures

- `src/images/mia-sucht.svg` (S. 1): Mia vor ihrem Tablet voller loser Datei-Symbole (Text: weißes Blatt mit Zeilen;
  Foto: Himmel, Sonne, grüner Hügel; Musik: lila Note). Hintergrund #f4efe2, Boden #c9a77a, unten 44 px frei.
- Anzeige-Komponente `Ordnerbaum` (`src/components/Ordnerbaum.vue`, Prop `stand`): Stil des Baums aus #491
  (`baum-zimmer.svg`): Wurzel oben, hellblau #e8f0fb, fett; Knoten abgerundet (rx 8), Rand #333 2 px; Ordner mit
  gelbem Ordner-Zeichen #f2c14e; Dateien gestrichelt (5 3), Name und Endung in zwei Zeilen, alle Dateien in der
  untersten Reihe; Kästen am Rand werden in die Zeichnung gerückt (Test gegen Überlappung); weißer Hintergrund, unten
  44 px frei. Namen kommen aus den Daten je Sprache, nie als Text in einer SVG-Datei. `nojs` beschreibt den Baum.
- Übungskomponente `Dateimanager`: Pfadleiste, Liste des offenen Ordners (Ordner gelb, Datei gestrichelt wie im
  Baum), Knöpfe 44 px, Farben nur aus den Variablen der Seite.
- `src/images/speicherorte.svg` (S. 3, `labelled-figure` mit 3 Markern): Mias Tablet, USB-Stick, Wolke mit Pfeil zu
  einem Haus voller Rechner; auf jedem Ort derselbe kleine Baum (Wurzel hellblau, Blätter gestrichelt) auf hellem
  Feld. Unten 44 px frei.
- Kopiert mit Herkunft: `glaeserner-computer.svg` (#490, Festspeicher = oranges Kästchen #e07b24), `baum-zimmer.svg`
  (#491). Nichts daran ändern.
- Alle eigenen Bilder: `source: eigene Zeichnung`, `licence: CC-BY-4.0`. Keine Screenshots fremder Software.

## Sources

- Fakten zu Speicherorten nur aus dem BSI (Cloud braucht Internet, Daten beim Anbieter; Mobilgeräte gehen leicht
  verloren), Seiten unter
  <https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cloud-Computing-Sicherheitstipps/>
  und <https://www.bsi.bund.de/dok/6598916>.
- Pfadtrenner: Microsoft Learn <https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file>; POSIX.1-2024
  <https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap03.html> (3.254).
- Dateigrößen (Foto ~4 MB, Lied ~4 MB, Video ~100 MB je Minute, Text ~20 KB) und Speichergrößen (Tablet 64 GB, Stick
  32 GB, Cloud 15 GB) sind gerundete Beispiele ohne Primärquelle; der Text sagt „ungefähr“.
- Kapitel 2: nur belegen, was das BSI sagt (Passwörter dok/6596574, Datensicherung dok/6599060, dok/6598916,
  Schadprogramme dok/6596284, dok/6596868, dok/6599600, Updates dok/504184, Virenschutz dok/504492, dok/504502). Das
  BSI nennt keine 3-2-1-Regel; die eigene Regel heißt „an zwei Orten, einer davon nicht zu Hause“.

## Adding a chapter or round

1. Plan im Inkrement (`npx --no -- lernapps plan new <name>`), Branch `increment/7-8`.
2. Ordner `src/schuetzen/` mit `chapter.yaml`, in `src/app.yaml` an `chapters` anhängen.
3. Zuerst `das-brauchst-du.yaml` mit `recap: [informatik/informatiksysteme-im-alltag, informatik/hardware-und-software]`,
   dann je Baustein eine Seite in der Reihenfolge der Karte, `competencies: [<id>]`.
4. Abschnitte wie oben; `Ordnerbaum` mit einem neuen Stand (Datensätze mit `von: 4`); Geschichte als Nachrichten
   zwischen Mia und Selin (7-8).
5. Übungen aus den Mustern oben; neue Datendateien in `src/data/`; Komponenten nur, wo kein Block passt.
6. `npx --no -- lernapps check`, Commit, Vorschau-PR.

## Rules learned from mistakes

- Ordner heißen „alles, was zusammengehört“ (Thema oder Art), nie nur „nach der Art der Datei“: Schule ist ein Thema,
  Fotos und Musik sind Arten; der Lerncheck fand den Widerspruch. Keine Wiederfinden-Aufgabe, die zwei Ordner zulässt
  (Lied vom Schulfest) oder den Ordnernamen nennt (Foto → Fotos).
- Kein „Merke“, das eine spätere Übung wörtlich beantwortet; Löschen und Umbenennen lernen die Kinder aus dem Baum und
  der Rückmeldung.
- Was eine Übung fragt, zeigt die Seite vorher (Ordner im Ordner steht im Baum, nicht nur in einer Definition).
- Der Dateimanager gibt vor dem ersten Schritt keine Antwort (Test der Runtime: „Prüfen“ ohne Antwort fragt nach
  einer); für die Wurzel meldet er eigens „lose auf dem Tablet“.

- Namen im Ordnerbaum höchstens 8 Zeichen: Die Skizze bei 360 px hatte bei 7 Blättern überlappende Namen.
- Dateien immer in der untersten Reihe des Ordnerbaums: In Stand 2 stieß party.jpg neben dem Ordner Mathe an, und
  Musik ragte über den rechten Rand.
- Kein `code`-Block und kein `…` in Texten für Pfade (nicht übersetzbar, Build lehnt ab): Pfade fett im Text.
