import { Note, notes, notesWithSharps } from "./music-theory";

function createPiano() {
    const pianoDiv = document.getElementById("piano");

    if (!pianoDiv || pianoDiv.hasChildNodes()) {
        var keys = document.getElementsByClassName("key");
        for (let i = 0; i < keys.length; i++) {
            keys[i].classList.remove("active", "correct", "wrong");
        }
        return;
    }

    for (let i = 3; i <= 19; i++) {
        var key = notesWithSharps[i % 12].replace("#", "sharp");
        var octave = Math.floor(i / 12);

        const keyDiv = document.createElement("div");
        keyDiv.classList.add('key', `key-${key}`);
        keyDiv.classList.add(key.length === 1 ? "white-key" : "black-key");
        keyDiv.id = `key-${key}${octave}`;
        pianoDiv.appendChild(keyDiv);
    }
}

function getKeyElements(note: Note, octave: number | "all") {
    const noteName = notesWithSharps[notes[note]].replace("#", "sharp");

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

export { createPiano, highlightKey };