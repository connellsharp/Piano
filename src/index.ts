import { createPiano, setNotePressed, setCorrectNotes, onCorrectNotes } from "./virtual-piano";
import { setupMidiListener } from "./midi";
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

    setupMidiListener(setNotePressed);
});