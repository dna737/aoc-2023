import fs from "fs";

const contents = fs
    .readFileSync("./input", {
        encoding: "utf8",
        flag: "r",
    })
    .split("\n");

let megaArray = [];
let currArray = [];
let prevArray = [];
let flag = false;
let result = 0;
let result2 = 0;
let result2Total = 0;

for (const line of contents) {
    megaArray = [];
    flag = false;
    currArray = line.split(" ").map((x) => parseInt(x));
    megaArray.push(currArray);
    while (!flag) {
        if (
            currArray.length > 0 &&
            Array.from(new Set(currArray)).length === 1
        ) {
            flag = true;
            break;
        }

        prevArray = currArray;
        currArray = [];
        for (let i = 0; i < prevArray.length - 1; i++) {
            currArray.push(prevArray[i + 1] - prevArray[i]);
        }
        megaArray.push(currArray);
    }

    megaArray.forEach((x) => {
        result += x[x.length - 1];
    });

    result2 = megaArray[megaArray.length - 1][0];
    console.log("last:", result2);
    for (let j = megaArray.length - 2; j >= 0; --j) {
        console.log(
            "🚀 ~ file: 9.mjs:50 ~  megaArray[j][1] :",
            megaArray[j][0]
        );
        result2 = megaArray[j][0] - result2;
    }

    result2Total += result2;
}

// console.log("result:", result);
console.log("result2:", result2Total);
