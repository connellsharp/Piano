import { WebMidi, Input } from "webmidi";
import { createPiano, highlightKey } from "./virtual-piano";
import { Note, notes, notesWithSharps } from "./music-theory";
import { randomScale } from "./game";

createPiano();

var scale = randomScale();

document.getElementsByTagName("h1")[0].innerText = scale.name;

const simplified = scale.notes.map(note => notesWithSharps[notes[note]]);
for(var i = 0; i < notesWithSharps.length; i++) {
    const note = notesWithSharps[i];
    const correct = simplified.includes(note);
    highlightKey(note, "all", correct ? "correct" : "wrong", true);
}

WebMidi.enable()
  .then(() => {
    const inputs = WebMidi.inputs;

    if (inputs.length === 0) {
      console.log("No MIDI input devices detected.");
    } else {
      inputs.forEach((input: Input) => {
        console.log(`Listening to MIDI device: ${input.name}`);

        input.addListener("noteon", (event) => {
            highlightKey(event.note.name as Note, event.note.octave, "active", true);
        });

        input.addListener("noteoff", (event) => {
            highlightKey(event.note.name as Note, event.note.octave, "active", false);
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
    highlightKey(key as Note, "all", "active", true);
  });

  addEventListener("keyup", (event) => {
    const key = noteKeyMap[event.key];
    if(key === undefined) return;
    highlightKey(key as Note, "all", "active", false);
  });