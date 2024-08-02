import { Note, simplifiedNotes, simplify } from "./music-theory";

function createPiano() {
    const pianoDiv = document.getElementById("piano");

    if (!pianoDiv || pianoDiv.hasChildNodes()) {
        return false;
    }

    for (let i = 3; i <= 26; i++) {
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

function highlightKey(note: Note, octave: number | "all", className: string, on: boolean) {
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

const pressedNotes = new Set<Note>();

var onPressedNotesChanged = (pressedNotes: Set<Note>) => { };

const onNotesHit = (notes: Note[], callback: () => void) => {
    var notesSet = new Set(notes.map(note => simplify(note)));
    onPressedNotesChanged = (pressedNotes) => {
        if(pressedNotes.size === notesSet.size
            && Array.from(pressedNotes).every(note => notesSet.has(note)))
        {
            onPressedNotesChanged = (_) => { };
            callback();
        }
    };
}

const setHighlightNoteColors = (chord: Note[], scale: Note[]) => {
    const simplifiedChord = chord.map(note => simplify(note));
    const simplifiedScale = scale.map(note => simplify(note));

    for(var i = 0; i < simplifiedNotes.length; i++) {
        const note = simplifiedNotes[i];
        highlightKey(note, "all", "in-chord", simplifiedChord.includes(note));
        highlightKey(note, "all", "in-scale", simplifiedScale.includes(note));
    }
}

const setNotePressed = (note: Note, octave: number | "all", pressed: boolean) => {
    highlightKey(note, octave, "active", pressed);

    if(pressed) {
        pressedNotes.add(simplify(note));
    } else {
        pressedNotes.delete(simplify(note));
    }

    onPressedNotesChanged(pressedNotes);
};

export { createPiano, setNotePressed, setHighlightNoteColors, onNotesHit };