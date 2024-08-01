import { WebMidi, Input } from "webmidi";
import { createPiano, setNotePressed, setCorrectNotes, onCorrectNotes } from "./virtual-piano";
import { Note } from "./music-theory";
import { randomScale } from "./game";

createPiano();

var scale = randomScale();
document.getElementsByTagName("h1")[0].innerText = scale.name;

const askForNote = () => {
    var nextNote = scale.notes[correctCount];
    document.getElementsByTagName("h2")[0].innerText = nextNote;
    setCorrectNotes([nextNote]);
};

const askForTriad = () => {
    var nextTriad = scale.randomTriad();
    document.getElementsByTagName("h2")[0].innerText = nextTriad.name;
    setCorrectNotes(nextTriad.notes);
};

var correctCount = 0;
onCorrectNotes(() => {
    correctCount++;

    if(correctCount < scale.notes.length) {
        askForNote();
    } else {
        onCorrectNotes(askForTriad);
    }
});
setCorrectNotes([scale.notes[0]]);
askForNote();

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