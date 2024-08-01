import { notesWithSharps, modes, modeIntervals, getInterval, createScale, triadIntervals, triadNames, getTriadsInKey, triadRomanNumerals } from "./music-theory";
import { getOptimalRepresentation } from "./optimal-representation";

const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

const randomScale = () => {
    const selectedNote = randomFromArray(notesWithSharps);
    const selectedMode = randomFromArray(modes);
    const selectedKeyWithSharps = createScale(selectedNote, modeIntervals[modes.indexOf(selectedMode)]);
    const selectedKey = getOptimalRepresentation(selectedKeyWithSharps);
    const triadsInSelectedKey = getTriadsInKey(selectedKey);

    return {
        name: selectedKey[0] + " " + selectedMode,
        notes: selectedKey,
        triads: triadsInSelectedKey.map(triad => {
            const triadIntervals = triad.map(note => getInterval(triad[0], note));
            const triadName = triadNames.find(triad => triadIntervals.every((interval, index) => interval === triadIntervals[index]));
            const triadRomanNumeral = triadRomanNumerals[triadName || ""](triadsInSelectedKey.indexOf(triad));

            return {
                name: triadRomanNumeral + " " + triad[0],
                notes: triad,
                type: triadName || triadIntervals
            }
        })
    };
}

export { randomScale };