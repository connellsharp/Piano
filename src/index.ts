import * as piano from "./virtual-piano";
import { setupMidiListener } from "./midi";
import { randomScale } from "./game";

(function() {
    if(!piano.createPiano()) {
        // I dunno why this loads twice, so just ignore the second time
        return;
    }

    const scaleElement = document.getElementById("scale") as HTMLElement;
    const chordElements = document.getElementsByClassName("chord");

    const scale = randomScale();
    scaleElement.innerText = scale.name;

    var progression : number[] = [];

    const newProgression = () => {
        progression = scale.generateChordProgression();

        for(let i = 0; i < progression.length; i++) {
            var triad = scale.triads[progression[i] - 1];
            chordElements[i].innerHTML = '<div class="name">' + triad.name + '</div>' + '<div class="numeral">' + triad.numeral + '</div>';
        }
    };

    const highlightPosition = (position: number) => {
        for(let i = 0; i < progression.length; i++) {
            if(i === position) {
                chordElements[i].classList.add("active");
            } else {
                chordElements[i].classList.remove("active");
            }
        }
    };

    const askForTriad = (position: number, createNewOnHit: boolean) => {
        var triad = scale.triads[progression[position] - 1];

        piano.onNotesHit(triad.notes, () => {
            highlightPosition(position);
            piano.setHighlightNoteColors(triad.notes, scale.notes);

            if(createNewOnHit) {
                newProgression();
            }

            if(position === progression.length-1) {
                askForTriad(0, true);
            } else {
                askForTriad(position + 1, false);
            }
        });
    };

    piano.setHighlightNoteColors([], scale.notes);
    newProgression();
    askForTriad(0, false);

    setupMidiListener(piano.setNotePressed);
})();