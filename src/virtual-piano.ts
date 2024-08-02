import { Note, simplifiedNotes, simplify } from "./music-theory";

function createPiano() {
    const pianoDiv = document.getElementById("piano");

    if (!pianoDiv || pianoDiv.hasChildNodes()) {
        return false;
    }

    for (let i = 3; i <= 19; i++) {
        var key = simplifiedNotes[i % 12].replace("#", "sharp");
        var octave = Math.floor(i / 12);

        const keyDiv = document.createElement("div");
        keyDiv.classList.add('key', `key-${key}`);
        keyDiv.classList.add(key.length === 1 ? "white-key" : "black-key");
        keyDiv.id = `key-${key}${octave}`;
        pianoDiv.appendChild(keyDiv);
    }

    return true;
}

function getKeyElements(note: Note, octave: number | "all") {
    const noteName = simplify(note).replace("#", "sharp");

    if(octave === "all") {
        return document.getElementsByClassName(`key-${noteName}`);
    } else {
        return [ document.getElementById(`key-${noteName}${octave}`) ];
    }
}

function highlightKey(note: Note, octave: number | "all", className: "active" | "wrong" | "correct", on: boolean) {
    const keyElements = getKeyElements(note, octave);

    for (let i = 0; i < keyElements.length; i++)
    {
        const keyElement = keyElements[i];
        if (keyElement) {
            if (on) {
                keyElement.classList.add(className);
            } else {
                keyElement.classList.remove(className);
            }
        }
    }
}

var onCorrectCallback: () => void = () => {};
var correctNotes = new Set<Note>();
var pressedNotes = new Set<Note>();
var calledCorrect = false;

const onCorrectNotes = (callback: () => void) => {
    onCorrectCallback = callback;
};

const setCorrectNotes = (notes: Note[]) => {
    const simplified = notes.map(note => simplify(note));

    correctNotes = new Set(simplified);
    calledCorrect = false;

    for(var i = 0; i < simplifiedNotes.length; i++) {
        const note = simplifiedNotes[i];
        const correct = simplified.includes(note);
        highlightKey(note, "all", "correct", correct);
        highlightKey(note, "all", "wrong", !correct);
    }
}

const setNotePressed = (note: Note, octave: number | "all", pressed: boolean) => {
    highlightKey(note, octave, "active", pressed);

    if(pressed) {
        pressedNotes.add(simplify(note));
    } else {
        pressedNotes.delete(simplify(note));
    }
    
    if(calledCorrect === false
        && pressedNotes.size === correctNotes.size
        && Array.from(pressedNotes).every(note => correctNotes.has(note)))
    {
        calledCorrect = true;
        onCorrectCallback();
    }
};

export { createPiano, setNotePressed, setCorrectNotes, onCorrectNotes };