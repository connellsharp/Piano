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

    const askForTriad = (triad: Triad) => {
        h2.innerText = triad.name;
        setCorrectNotes(triad.notes);
    };

    var correctCount = 0;
    onCorrectNotes(() => {
        correctCount++;

        h2.innerText = "Well done!";
        h2.classList.add("correct");

        setTimeout(() => {
            h2.classList.remove("correct");
            askForTriad(scale.randomTriad());
        }, 500);
    });
    askForTriad(scale.triads[0]);

    WebMidi.enable()
    .then(() => {
        const inputs = WebMidi.inputs;

        if (inputs.length === 0) {
        console.log("No MIDI input devices detected.");
        } else {
        inputs.forEach((input: Input) => {
            console.log(`Listening to MIDI device: ${input.name}`);

            const addNoteListener = (eventName: "noteon" | "noteoff", on: boolean) => {
                input.addListener(eventName, (event) => {
                    var note = (event.note.name + (event.note.accidental ?? "")) as Note;
                    setNotePressed(note, "all", on);
                });
            };

            addNoteListener("noteon", true);
            addNoteListener("noteoff", false);
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