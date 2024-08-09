import * as piano from "./virtual-piano";
import { setupMidiListener } from "./midi";
import { startGame } from "./game";

(() => {
    if(!piano.createPiano()) {
        // I dunno why this loads twice, so just ignore the second time
        return;
    }

    const scaleElement = document.getElementById("scale-name") as HTMLElement;
    const chordElements = document.getElementsByClassName("chord");

    const highlightPosition = (position: number) => {
        for(let i = 0; i < chordElements.length; i++) {
            if(i === position) {
                chordElements[i].classList.add("active");
            } else {
                chordElements[i].classList.remove("active");
            }
        }
    };

    var game = startGame();

    const loadScale = () => {
        var scale = game.getScale();
        scaleElement.innerText = scale.name;

        var progression : number[] = [];

        const newProgression = () => {
            progression = scale.generateChordProgression();

            for(let i = 0; i < progression.length; i++) {
                var triad = scale.triads[progression[i] - 1];
                chordElements[i].innerHTML = '<div class="name">' + triad.name + '</div>' + '<div class="numeral">' + triad.numeral + '</div>';
            }
        };

        const askForTriad = (position: number, createNewOnHit: boolean) => {
            var triad = scale.triads[progression[position] - 1];

            piano.setHighlightNoteColors("in-next-chord", triad.notes);
            piano.onNotesHit(triad.notes, () => {
                highlightPosition(position);
                piano.setHighlightNoteColors("in-chord", triad.notes);

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

        piano.setHighlightNoteColors("in-scale", scale.notes);
        piano.setHighlightNoteColors("in-chord", []);
        newProgression();
        highlightPosition(-1);
        askForTriad(0, false);
    };

    loadScale();

    document.getElementById("up-fifth")?.addEventListener("click", () => {
        game.moveFifth(1);
        loadScale();
    });

    document.getElementById("down-fifth")?.addEventListener("click", () => {
        game.moveFifth(-1);
        loadScale();
    });

    document.getElementById("up-mode")?.addEventListener("click", () => {
        game.moveBrightness(1);
        loadScale();
    });

    document.getElementById("down-mode")?.addEventListener("click", () => {
        game.moveBrightness(-1);
        loadScale();
    });

    setupMidiListener(piano.setNotePressed);
})();