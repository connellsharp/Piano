import { type Note } from "./music-theory";

const flatMap = new Map<Note, Note>([
    ["A♯", "B♭"],
    ["C♯", "D♭"],
    ["D♯", "E♭"],
    ["F♯", "G♭"],
    ["G♯", "A♭"],
  ]);
  
const getDuplicateLetters = (representation: Note[]) => {
    const letters = representation.map(note => note[0]);
    return letters.filter((letter, index) => letters.indexOf(letter) !== index);
}

const getOptimalRepresentation = (keySignature: Note[]) => {
    var sharpRepresentation = keySignature;
    var flatRepresentation = keySignature.map(note => flatMap.get(note) || note);
  
    const sharpDuplicateLetters = getDuplicateLetters(sharpRepresentation);
    if(sharpDuplicateLetters.length == 0)
        return sharpRepresentation;

    const flatDuplicateLetters = getDuplicateLetters(flatRepresentation);
    if(flatDuplicateLetters.length == 0)
        return flatRepresentation;
    
    // now we need to try E#, B#, Cb, Fb
    
    if(sharpDuplicateLetters.includes("F") && !sharpRepresentation.includes("E"))
        sharpRepresentation = sharpRepresentation.map(note => note === "F" ? "E♯" : note);
    
    if(sharpDuplicateLetters.includes("C") && !sharpRepresentation.includes("B"))
        sharpRepresentation = sharpRepresentation.map(note => note === "C" ? "B♯" : note);

    if(getDuplicateLetters(sharpRepresentation).length == 0)
        return sharpRepresentation;
    
    if(flatDuplicateLetters.includes("E") && !flatRepresentation.includes("F"))
        flatRepresentation = flatRepresentation.map(note => note === "E" ? "F♭" : note);

    if(flatDuplicateLetters.includes("B") && !flatRepresentation.includes("C"))
        flatRepresentation = flatRepresentation.map(note => note === "B" ? "C♭" : note);

    if(getDuplicateLetters(flatRepresentation).length == 0)
        return flatRepresentation;

    // shouldn't happen for real keys but here we are

    if(sharpRepresentation.length < flatRepresentation.length)
        return sharpRepresentation;

    return flatRepresentation;
}

  export { getOptimalRepresentation };