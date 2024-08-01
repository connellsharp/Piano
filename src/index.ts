import { WebMidi, Input } from "webmidi";
import { createPiano, highlightKey } from "./virtual-piano";
import { Note } from "./music-theory";
import { randomScale } from "./game";

createPiano();

var scale = randomScale();

document.getElementsByTagName("h1")[0].innerText = scale.name;

for(var i = 0; i < scale.notes.length; i++) {
    const note = scale.notes[i];
    highlightKey(note, "all", true);
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
            highlightKey(event.note.name as Note, event.note.octave, true);
        });

        input.addListener("noteoff", (event) => {
            highlightKey(event.note.name as Note, event.note.octave, false);
        });
      });
    }
  })
  .catch((err) => console.error("Could not enable WebMidi:", err));
