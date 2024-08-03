import { Mode } from "./music-theory";

const popularChordProgressions: { [m in Mode]: number[][] } = {
    ionian: [
        [ 1, 5, 6, 4 ],
        [ 1, 6, 4, 5 ],
        [ 1, 4, 2, 5 ],
        [ 1, 3, 4, 5 ],
    ],
    dorian: [
        [ 1, 7, 3, 4 ],
        [ 1, 3, 4, 4 ],
        [ 1, 2, 3, 2 ],
        [ 1, 5, 4, 1 ],
    ],
    phrygian: [
        [ 1, 2, 1, 7 ],
        [ 1, 2, 3, 2 ],
        [ 1, 3, 7, 1 ],
        [ 1, 4, 3, 2 ],
    ],
    lydian: [
        [ 1, 1, 2, 5 ],
        [ 1, 2, 3, 2 ],
        [ 1, 2, 7, 3 ],
        [ 1, 5, 3, 2 ]
    ],
    mixolydian: [
        [ 1, 7, 4, 1 ],
        [ 1, 5, 4, 1 ],
        [ 1, 7, 2, 1 ],
        [ 1, 2, 5, 1 ],
    ],
    aeolian: [
        [ 1, 4, 5, 1 ],
        [ 1, 7, 6, 5 ],
        [ 1, 5, 6, 7 ],
        [ 1, 3, 7, 4 ],
    ],
    locrian: [
        [ 1, 2, 3, 2 ],
        [ 1, 2, 3, 4 ],
    ],
}

const randomChord = () => Math.floor(Math.random() * 7) + 1;

const generateChordProgression = (mode: Mode) => {
    if(Math.random() > 0.25) {
        var popular = popularChordProgressions[mode];
        return popular[Math.floor(Math.random() * popular.length)];
    } else {
        return [ 1, randomChord(), randomChord(), randomChord() ];
    }
}

export { generateChordProgression}