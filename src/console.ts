import { startGame } from "./game";

var game = startGame();
var scale = game.getScale();

console.log("Key:", scale.name);
console.log("Notes:", scale.notes);
console.log("Triads:");

for(var i = 0; i < 7; i++) {
    const selectedTriad = scale.triads[i];
    console.log(
        selectedTriad.name.padEnd(4),
        selectedTriad.notes[0].padEnd(2), 
        selectedTriad.type
    );
}