import { WebMidi, Input } from "webmidi";
import { createPiano, setNotePressed, setCorrectNotes, onCorrectNotes } from "./virtual-piano";
import { Note } from "./music-theory";
import { randomScale, Triad } from "./game";

(function() {
    if(!createPiano()) {
        // I dunno why this loads twice, so just ignore the second time
        return;
    }

    const h1 = document.getElementsByTagName("h1")[0];
    const h2 = document.getElementsByTagName("h2")[0];

    const scale = randomScale();
    h1.innerText = scale.name;

    const askForNote = (note: Note) => {
        h2.innerText = note;
        setCorrectNotes([note]);
    };

    const askForTriad = (triad: Triad) => {
        h2.innerText = triad.name;
        setCorrectNotes(triad.notes);
    };

    const upAndDown = [0, 1, 2, 3, 4, 5, 6, 0, 6, 5, 4, 3, 2, 1, 0];

    const askForNext = () => {
        h2.classList.remove("correct");

        if(correctCount < upAndDown.length) {
            askForNote(scale.notes[upAndDown[correctCount]]);
        } else if(correctCount === upAndDown.length) {
            askForTriad(scale.triads[0]);
        } else {
            askForTriad(scale.randomTriad());
        }
    };

    var correctCount = 0;
    onCorrectNotes(() => {
        correctCount++;

        h2.innerText = "Well done!";
        h2.classList.add("correct");

        setTimeout(() => {
            askForNext();
        }, 500);
    });
    askForNext();

    WebMidi.enable()
    .then(() => {
        const inputs = WebMidi.inputs;

        if (inputs.length === 0) {
        console.log("No MIDI input devices detected.");
        } else {
        inputs.forEach((input: Input) => {
            console.log(`Listening to MIDI device: ${input.name}`);

            input.addListener("noteon", (event) => {
                setNotePressed(event.note.name as Note, event.note.octave, true);
            });

            input.addListener("noteoff", (event) => {
                setNotePressed(event.note.name as Note, event.note.octave, false);
            });
        });
        }
    })
    .catch((err) => console.error("Could not enable WebMidi:", err));

    const noteKeyMap: { [key: string]: Note } = {
        "z": "C",
        "s": "C#",
        "x": "D",
        "d": "D#",
        "c": "E",
        "v": "F",
        "g": "F#",
        "b": "G",
        "h": "G#",
        "n": "A",
        "j": "A#",
        "m": "B",
    };

    addEventListener("keydown", (event) => {
        const key = noteKeyMap[event.key];
        if(key === undefined) return;
        setNotePressed(key as Note, "all", true);
    });

    addEventListener("keyup", (event) => {
        const key = noteKeyMap[event.key];
        if(key === undefined) return;
        setNotePressed(key as Note, "all", false);
    });
})();