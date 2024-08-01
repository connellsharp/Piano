import { randomScale } from "./game";

var selected = randomScale();

console.log("Key:", selected.name);
console.log("Notes:", selected.notes);
console.log("Triads:");

for(var i = 0; i < 7; i++) {
    const selectedTriad = selected.triads[i];
    console.log(
        selectedTriad.name.padEnd(4),
        selectedTriad.notes[0].padEnd(2), 
        selectedTriad.type
    );
}