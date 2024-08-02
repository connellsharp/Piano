import * as piano from "./virtual-piano";
import { setupMidiListener } from "./midi";
import { randomScale, Triad } from "./game";

(function() {
    if(!piano.createPiano()) {
        // I dunno why this loads twice, so just ignore the second time
        return;
    }

    const scaleElement = document.getElementById("scale") as HTMLElement;
    const currentChordElement = document.getElementById("current") as HTMLElement;
    const nextChordElement = document.getElementById("next") as HTMLElement;
    const prevChordElement = document.getElementById("prev") as HTMLElement;

    const scale = randomScale();
    scaleElement.innerText = scale.name;

    const askForTriad = (triad: Triad) => {
        nextChordElement.innerText = triad.name;

        piano.onNotesHit(triad.notes, () => {
            prevChordElement.innerText = currentChordElement.innerText;
            currentChordElement.innerText = triad.name;
            piano.setHighlightNoteColors(triad.notes, scale.notes);

            askForTriad(scale.randomTriad());
        });
    };

    piano.setHighlightNoteColors([], scale.notes);
    askForTriad(scale.triads[0]);

    setupMidiListener(piano.setNotePressed);
})();