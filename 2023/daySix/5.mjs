import fs from "fs";

const contents = fs.readFileSync("./initInput.txt", {
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

let newTimes = parseInt(times.join(""));
let newDistances = parseInt(distances.join(""));

let holdButton = null;
let indivCount = null;
for (let i = 0; i < times.length; i++) {
    indivCount = 0;
    for (let j = 0; j < times[i]; j++) {
        holdButton = j; //hold the button for j seconds.
        if (holdButton * (times[i] - holdButton) > distances[i]) {
            //beat the record. Store the count.
            ++indivCount;
        }
    }
    if (indivCount > 0) {
        results.push(indivCount);
    }
}

console.log(
    "p1:",
    results.reduce((acc, x) => acc * x, 1)
);

results = [];
indivCount = 0;
for (let j = 0; j < newTimes; j++) {
    holdButton = j; //hold the button for j seconds.
    if (holdButton * (newTimes - holdButton) > newDistances) {
        //beat the record. Store the count.
        // console.log("hi");
        ++indivCount;
    }
    if (indivCount > 0) {
        results.push(indivCount);
    }
}

const data = results
    .reduce((acc, x) => BigInt(acc) * BigInt(x), BigInt(1))
    .toString();

fs.writeFileSync("./d5p2.txt", data, {
    encoding: "utf8",
    flag: "w",
});
