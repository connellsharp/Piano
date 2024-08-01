import { notesWithSharps, modes, modeIntervals, getInterval, createScale, triadIntervals, triadNames, getTriadsInKey, triadRomanNumerals } from "./music-theory";
import { getOptimalRepresentation } from "./optimal-representation";

const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

const selectedNote = randomFromArray(notesWithSharps);
const selectedMode = randomFromArray(modes);
const selectedKeyWithSharps = createScale(selectedNote, modeIntervals[modes.indexOf(selectedMode)]);
const selectedKey = getOptimalRepresentation(selectedKeyWithSharps);

console.log("Key:", selectedKey[0], selectedMode);
console.log("Notes:", selectedKey);
console.log("Triads:");

const triadsInSelectedKey = getTriadsInKey(selectedKey);

for(var i = 0; i < 7; i++) {
    const selectedTriad = triadsInSelectedKey[i];
    const selectedTriadIntervals = selectedTriad.map(note => getInterval(selectedTriad[0], note));
    const selectedTriadName = triadNames.find(triad => triadIntervals[triad].every((interval, index) => interval === selectedTriadIntervals[index]));
    const selectedTriadRomanNumeral = triadRomanNumerals[selectedTriadName || ""](i);

    console.log(
        i + 1,
        selectedTriadRomanNumeral.padEnd(4),
        selectedTriad[0].padEnd(2), 
        selectedTriadName || selectedTriadIntervals
    );
}