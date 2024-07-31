type Note = "A" | "A#" | "B" | "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#";
const notes: Note[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];

const shift = (note: Note, degree: number) => notes[(notes.indexOf(note) + degree) % notes.length];
const createScale = (root: Note, intervals: number[]) => intervals.map(interval => shift(root, interval));
const scales = notes.map(note => createScale(note, majorScaleIntervals));

const rotate = (intervals: number[], degree: number) => intervals.map(interval => (12 + interval - intervals[degree]) % 12).sort((a, b) => a - b);

type Mode = "ionian" | "dorian" | "phrygian" | "lydian" | "mixolydian" | "aeolian" | "locrian";
const modes: Mode[] = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"];

const modeIntervals = modes.map((_, index) => rotate(majorScaleIntervals, index));

const triadIntervals = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  //augmented: [0, 4, 8],
};
type TriadName = keyof typeof triadIntervals;
const triadNames = Object.keys(triadIntervals) as TriadName[];

const getTriad = (root: Note, triad: TriadName) => triadIntervals[triad].map(interval => shift(root, interval));

const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

const selectedNote = randomFromArray(notes);
const selectedMode = randomFromArray(modes);
const notesInSelectedKey = createScale(selectedNote, modeIntervals[modes.indexOf(selectedMode)]);
const triadsInSelectedKey = [0, 1, 2, 3, 4, 5, 6, 7].map(i => [ notesInSelectedKey[i], notesInSelectedKey[(i + 2) % 7], notesInSelectedKey[(i + 4) % 7] ]);

console.log("We're in the key of", selectedNote, selectedMode);
console.log("Notes:", notesInSelectedKey);

for(var i = 0; i < 7; i++) {
  const selectedTriad = triadsInSelectedKey[i];
  const getInterval = (root: Note, note: Note) => (12 + notes.indexOf(note) - notes.indexOf(root)) % 12;
  const selectedTriadIntervals = selectedTriad.map(note => getInterval(selectedTriad[0], note));
  const selectedTriadName = triadNames.find(triad => triadIntervals[triad].every((interval, index) => interval === selectedTriadIntervals[index]));

  //console.log("Triad", i, ":", selectedTriad);  
  console.log(i + 1, selectedTriad[0], selectedTriadName);
}