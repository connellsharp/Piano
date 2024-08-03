import { WebMidi, Input } from "webmidi";
import { Note } from "./music-theory";

const setupMidiListener = (onNotePressed: (note: Note, octave: number | "all", pressed: boolean) => void) => {
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
                        var note = (event.note.name + (event.note.accidental ?? "").replace('#', '♯')) as Note;
                        onNotePressed(note, "all", on);
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
        "s": "C♯",
        "x": "D",
        "d": "D♯",
        "c": "E",
        "v": "F",
        "g": "F♯",
        "b": "G",
        "h": "G♯",
        "n": "A",
        "j": "A♯",
        "m": "B",
    };

    addEventListener("keydown", (event) => {
        const key = noteKeyMap[event.key];
        if(key === undefined) return;
        onNotePressed(key as Note, "all", true);
    });

    addEventListener("keyup", (event) => {
        const key = noteKeyMap[event.key];
        if(key === undefined) return;
        onNotePressed(key as Note, "all", false);
    });
};

export { setupMidiListener };