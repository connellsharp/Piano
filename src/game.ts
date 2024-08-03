import { Note, simplifiedNotes, modes, modeIntervals, getInterval, createScale, getTriadName, getTriadsInKey, triadRomanNumerals } from "./music-theory";
import { getOptimalRepresentation } from "./optimal-representation";
import { generateChordProgression } from "./chord-progressions";

const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

type Triad = { name: string, numeral: string, notes: Note[], type: string | number[] };

const randomScale = () => {
    const selectedNote = randomFromArray(simplifiedNotes);
    const selectedMode = randomFromArray(modes);
    const selectedKeyWithSharps = createScale(selectedNote, modeIntervals[modes.indexOf(selectedMode)]);
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

    var progression = generateChordProgression(selectedMode);
    let position = 0;

    return {
        name: selectedKey[0] + " " + selectedMode,
        notes: selectedKey,
        triads: triads,
        nextTriad: () => {
            var triad = triads[progression[position] - 1];

            position++;
            if(position >= progression.length) {
                progression = generateChordProgression(selectedMode);
                position = 0;
            }

            return triad;
        }
    };
}

export { randomScale, Triad };