var notes = {
  "A": 0,
  "A#": 1,
  "Bb": 1,
  "B": 2,
  "B#": 3,
  "Cb": 2,
  "C": 3,
  "C#": 4,
  "Db": 4,
  "D": 5,
  "D#": 6,
  "Eb": 6,
  "E": 7,
  "E#": 8,
  "Fb": 7,
  "F": 8,
  "F#": 9,
  "Gb": 9,
  "G": 10,
  "G#": 11,
  "Ab": 11,
}

type Note = keyof typeof notes;

const notesWithSharps: Note[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];

const shift = (note: Note, degree: number) => notesWithSharps[(notes[note] + degree) % 12];
const createScale = (root: Note, intervals: number[]) => intervals.map(interval => shift(root, interval));
const scales = notesWithSharps.map(note => createScale(note, majorScaleIntervals));

const rotate = (intervals: number[], degree: number) => intervals.map(interval => (12 + interval - intervals[degree]) % 12).sort((a, b) => a - b);

type Mode = "ionian" | "dorian" | "phrygian" | "lydian" | "mixolydian" | "aeolian" | "locrian";
const modes: Mode[] = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"];

const modeIntervals = modes.map((_, index) => rotate(majorScaleIntervals, index));

const getInterval = (root: Note, note: Note) => (12 + notes[note] - notes[root]) % 12;

const triadIntervals = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  //augmented: [0, 4, 8],
};
type TriadName = keyof typeof triadIntervals;
const triadNames = Object.keys(triadIntervals) as TriadName[];

const getTriad = (root: Note, triad: TriadName) => triadIntervals[triad].map(interval => shift(root, interval));

const getTriadsInKey = (key: Note[]) => [0, 1, 2, 3, 4, 5, 6, 7].map(i => [ key[i], key[(i + 2) % 7], key[(i + 4) % 7] ])

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
const triadRomanNumerals = {
    "major": (i: number) => romanNumerals[i].toUpperCase(),
    "minor": (i: number) => romanNumerals[i].toLowerCase(),
    "diminished": (i: number) => romanNumerals[i].toLowerCase() + "°",
    "": (_: number) => "unknown",
}

export { type Note, notes, notesWithSharps, scales, modes, modeIntervals, getInterval, createScale, triadIntervals, triadNames, getTriad, getTriadsInKey, triadRomanNumerals };