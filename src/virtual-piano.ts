import { Note, notesWithSharps } from "./music-theory";

function createPiano() {
    const pianoDiv = document.getElementById("piano");

    if (!pianoDiv || pianoDiv.hasChildNodes()) {
        return;
    }

    for (let i = 3; i <= 19; i++) {
        var key = notesWithSharps[i % 12].replace("#", "sharp");
        var octave = Math.floor(i / 12);

        const keyDiv = document.createElement("div");
        keyDiv.classList.add(`key-${key}${octave}`);
        keyDiv.classList.add("key", key.length === 1 ? "white-key" : "black-key");
        keyDiv.id = `key-${key}${octave}`;
        pianoDiv.appendChild(keyDiv);
    }
}

function highlightKey(note: Note, octave: number, on: boolean) {
    const noteName = note.replace("#", "sharp");
    const keyId = `key-${noteName}${octave}`;
    const keyElement = document.getElementById(keyId);

    if (keyElement) {
        if (on) {
            keyElement.classList.add("active");
        } else {
            keyElement.classList.remove("active");
        }
    }
}

export { createPiano, highlightKey };