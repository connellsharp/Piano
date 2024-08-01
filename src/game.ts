import { simplifiedNotes, modes, modeIntervals, getInterval, createScale, triadIntervals, triadNames, getTriadsInKey, triadRomanNumerals } from "./music-theory";
import { getOptimalRepresentation } from "./optimal-representation";

const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

const randomScale = () => {
    const selectedNote = randomFromArray(simplifiedNotes);
    const selectedMode = randomFromArray(modes);
    const selectedKeyWithSharps = createScale(selectedNote, modeIntervals[modes.indexOf(selectedMode)]);
    const selectedKey = getOptimalRepresentation(selectedKeyWithSharps);
    const triadsInSelectedKey = getTriadsInKey(selectedKey);
    
    const triads = triadsInSelectedKey.map(triad => {
        const triadIntervals = triad.map(note => getInterval(triad[0], note));
        const triadName = triadNames.find(triadName => triadIntervals.every((interval, index) => interval === triadIntervals[index]));
        const triadRomanNumeral = triadRomanNumerals[triadName || ""](triadsInSelectedKey.indexOf(triad));

        return {
            name: triad[0] + " " + triadName,
            numeral: triadRomanNumeral,
            notes: triad,
            type: triadName || triadIntervals
        }
    })

    return {
        name: selectedKey[0] + " " + selectedMode,
        notes: selectedKey,
        triads: triads,
        randomTriad: () => randomFromArray(triads),
    };
}

export { randomScale };