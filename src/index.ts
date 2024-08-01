import { WebMidi, Input, NoteMessageEvent } from "webmidi";

function createPiano() {
    const pianoDiv = document.getElementById("piano");

    if (!pianoDiv || pianoDiv.hasChildNodes()) {
        return;
    }

    const keys = ["C", "Csharp", "D", "Dsharp", "E", "F", "Fsharp", "G", "Gsharp", "A", "Asharp", "B"];

    for (let i = 0; i <= 16; i++) {
        var key = keys[i % 12];
        var octave = Math.floor(i / 12);

        const keyDiv = document.createElement("div");
        keyDiv.classList.add(`key-${key}${octave}`);
        keyDiv.classList.add("key", key.length === 1 ? "white-key" : "black-key");
        keyDiv.id = `key-${key}${octave}`;
        pianoDiv.appendChild(keyDiv);
    }
}

const noteToKeyMap: { [key: string]: string } = {
  "C": "C", "C#": "Csharp", "D": "D", "D#": "Dsharp", "E": "E",
  "F": "F", "F#": "Fsharp", "G": "G", "G#": "Gsharp", "A": "A",
  "A#": "Asharp", "B": "B"
};

function highlightKey(note: string, octave: number, on: boolean) {
  const keyId = `key-${noteToKeyMap[note]}${octave}`;
  const keyElement = document.getElementById(keyId);

  if (keyElement) {
    if (on) {
      keyElement.classList.add("active");
    } else {
      keyElement.classList.remove("active");
    }
  }
}

function onMidiMessage(event: NoteMessageEvent) {
  const { note, type } = event;

  if (type === "noteon") {
    highlightKey(note.name, note.octave, true);
  } else if (type === "noteoff") {
    highlightKey(note.name, note.octave, false);
  }
}

WebMidi.enable()
  .then(() => {
    createPiano();

    const inputs = WebMidi.inputs;

    if (inputs.length === 0) {
      console.log("No MIDI input devices detected.");
    } else {
      inputs.forEach((input: Input) => {
        console.log(`Listening to MIDI device: ${input.name}`);
        input.addListener("noteon", onMidiMessage);
        input.addListener("noteoff", onMidiMessage);
      });
    }
  })
  .catch((err) => console.error("Could not enable WebMidi:", err));
