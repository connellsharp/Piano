import { Note, simplifiedNotes, Mode, modes, modeIntervals, getInterval, createScale, getTriadName, getTriadsInKey, triadRomanNumerals, shift, shiftBrightness, modesByBrightness } from "./music-theory";
import { getOptimalRepresentation } from "./optimal-representation";
import { generateChordProgression } from "./chord-progressions";

const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];
const toTitleCase = (str: string) => str[0].toUpperCase() + str.slice(1);

type Triad = { name: string, numeral: string, notes: Note[], type: string | number[] };

const createScaleData = (note: Note, mode: Mode) => {
    const selectedKeyWithSharps = createScale(note, modeIntervals[modes.indexOf(mode)]);
    const selectedKey = getOptimalRepresentation(selectedKeyWithSharps);
    const triadsInSelectedKey = getTriadsInKey(selectedKey);
    
    const triads = triadsInSelectedKey.map(triad => {
        const triadIntervals = triad.map(note => getInterval(triad[0], note));
        const triadName = getTriadName(triadIntervals);
        const triadRomanNumeral = triadRomanNumerals[triadName || ""](triadsInSelectedKey.indexOf(triad));

        return {
            name: triad[0] + " " + triadName,
            numeral: triadRomanNumeral,
            notes: triad,
            type: triadName || triadIntervals
        } as Triad;
    });

    return {
        name: selectedKey[0] + " " + toTitleCase(mode),
        notes: selectedKey,
        triads: triads,
        generateChordProgression: () => generateChordProgression(mode)
    };
}

const startGame = () => {
    let currentNote = randomFromArray(simplifiedNotes);
    let currentMode = randomFromArray(modes);
    debugger;

    return {
        getScale: () => createScaleData(currentNote, currentMode),
        moveFifth: (steps: number) => {
            currentNote = shift(currentNote, steps * 7);
        },
        moveBrightness: (steps: number) => {
            const currentBrightness = modesByBrightness.indexOf(currentMode);
            const newBrightness = currentBrightness + steps;
            
            currentMode = modesByBrightness[(7 + newBrightness) % 7];
            currentNote = shift(currentNote, Math.floor(newBrightness / 7));
        }
    }
};

export { startGame, Triad };