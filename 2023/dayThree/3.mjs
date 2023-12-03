import fs from "fs";
const contents = fs.readFileSync("./simpleInput.txt", {
    encoding: "utf8",
    flag: "r",
});

const symbols = ["*", "$", "#", "+"];
let result = 0;

let lineIndex = 0;
for (const line of contents.split("\n")) {
    result += extractDigits(line, contents, lineIndex);
    lineIndex++;
}
console.log("result:", result);

function extractDigits(line, contents, lineIndex) {
    const numberOccurrences = [...line.matchAll(/\d+/g)];
    let currResult = 0;
    for (const occ of numberOccurrences) {
        let number = occ[0];
        let currIndex = occ.index;

        //check if it's right above:
        if (lineIndex > 0) {
            console.log(contents.split("\n")[lineIndex - 1][currIndex]);
        }

        //check if the symbol is right below:
        if (lineIndex !== contents.split("\n").length - 1) {
            let currItem = contents.split("\n")[lineIndex + 1][currIndex];
            if (symbols.includes(currItem)) {
                currResult += parseInt(number);
            }
        }
    }
    return currResult;
}
