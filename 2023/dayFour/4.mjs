import fs from "fs";
const contents = fs.readFileSync("./input.txt", {
    encoding: "utf8",
    flag: "r",
});

const linesArr = contents.split("\n");

let result = 0,
    currLine = null,
    a = "",
    b = "",
    aArr = [],
    bArr = [],
    currRes = null,
    currArr = null;

for (const line of linesArr) {
    currLine = line.split(":")[1];
    a = currLine.split("|")[0];
    b = currLine.split("|")[1];

    aArr = a
        .trim()
        .split(" ")
        .map((x) => x.trim())
        .filter((a) => a);
    bArr = b
        .trim()
        .split(" ")
        .map((x) => x.trim())
        .filter((a) => a);

    console.log("Arrays:", aArr, bArr);

    currArr = aArr.filter((aE) => bArr.includes(aE));
    currRes = currArr.length - 1;
    if (currRes >= 0) {
        result += Math.pow(2, currRes);
        // console.log("🚀 ~ file: 4.mjs:39 ~ currRes:", currRes);
    }
    console.log("🚀 ~ file: 4.mjs:31 ~ result :", result);
}
