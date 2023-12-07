import fs from "fs";

const contents = fs.readFileSync("./input.txt", {
    encoding: "utf8",
    flag: "r",
});

const times = contents
    .split("\n")[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => Number.isInteger(parseInt(x)))
    .map((x) => parseInt(x));

const distances = contents
    .split("\n")[1]
    .split(":")[1]
    .split(" ")
    .filter((x) => Number.isInteger(parseInt(x)))
    .map((x) => parseInt(x));

let results = [];

let holdButton = null;
let indivCount = null;
for (let i = 0; i < times.length; i++) {
    indivCount = 0;
    for (let j = 0; j < times[i]; j++) {
        console.log("sth:");
        holdButton = j; //hold the button for j seconds.
        console.log("hold:", holdButton);
        if (holdButton * (times[i] - holdButton) > distances[i]) {
            //beat the record. Store the count.
            ++indivCount;
        }
    }
    if (indivCount > 0) {
        results.push(indivCount);
    }
}
console.log("results:", results);

console.log(results.reduce((acc, x) => acc * x, 1));
