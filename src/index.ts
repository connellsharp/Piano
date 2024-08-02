import * as piano from "./virtual-piano";
import { setupMidiListener } from "./midi";
import { randomScale, Triad } from "./game";

(function() {
    if(!piano.createPiano()) {
        // I dunno why this loads twice, so just ignore the second time
        return;
    }

    const scaleElement = document.getElementsByTagName("h1")[0];
    const currentChordElement = document.getElementsByTagName("h2")[0];
    const nextChordElement = document.getElementsByTagName("h3")[0];

    const scale = randomScale();
    scaleElement.innerText = scale.name;

    const askForTriad = (triad: Triad) => {
        nextChordElement.innerText = triad.name;

        piano.onNotesHit(triad.notes, () => {
            currentChordElement.innerText = triad.name;
            piano.setHighlightNoteColors(triad.notes, scale.notes);

            askForTriad(scale.randomTriad());
        });
    };

    piano.setHighlightNoteColors([], scale.notes);
    askForTriad(scale.triads[0]);

    setupMidiListener(piano.setNotePressed);
})();