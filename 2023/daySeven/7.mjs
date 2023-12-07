import fs from "fs";

const contents = fs
    .readFileSync("./input.txt", {
        encoding: "utf8",
        flag: "r",
    })
    .split("\n");

let strongestToWeakest = [
    "fiveOfAKind",
    "fourOfAKind",
    "fullHouse",
    "threeOfAKind",
    "twoPair",
    "onePair",
    "highCard",
];

//pro tip: don't do this.
let weakestToStrongest = strongestToWeakest.reverse();

let classifiedCards = {
    highCard: [],
    onePair: [],
    twoPair: [],
    threeOfAKind: [],
    fullHouse: [],
    fourOfAKind: [],
    fiveOfAKind: [],
};

const hands = contents.map((line) => line.split(" ")[0]);
const numbers = contents.map((line) => parseInt(line.split(" ")[1]));
let occ = null;
for (let line of contents) {
    line = line.split(" ")[0];
    // uniqueElements = [...new Set(line.split(""))];
    // console.log("🚀 ~ file: 7.mjs:36 ~ uniqueElements :", uniqueElements);
    occ = {};
    for (let char of line) {
        if (!Object.keys(occ).includes(char)) {
            occ[char] = 0;
        }
        ++occ[char];
    }
    classifyCard(line, occ);
}

function classifyCard(card, occ) {
    const numKeys = Object.keys(occ).length;
    const max = Math.max(...Object.values(occ));
    const min = Math.min(...Object.values(occ));
    switch (numKeys) {
        case 5:
            classifiedCards["highCard"].push(card);
            break;
        case 4:
            classifiedCards["onePair"].push(card);
            break;
        case 3:
            if (max === 3) {
                if (min === 1) {
                    classifiedCards["threeOfAKind"].push(card);
                }
            } else if (max === 2) {
                classifiedCards["twoPair"].push(card);
            }
            break;
        case 2:
            if (max === 4) {
                classifiedCards["fourOfAKind"].push(card);
            } else if (max === 3) {
                classifiedCards["fullHouse"].push(card);
            }
            break;
        case 1:
            classifiedCards["fiveOfAKind"].push(card);
            break;
    }
}

// console.log("things", classifiedCards);

let customSortArray = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
];

let aIndex = null;
let bIndex = null;

//We don't have to worry about the lengths because they're all 5 units long (for p1 atleast).
function customSort(a, b) {
    if (a === b) return 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        aIndex = customSortArray.indexOf(a[i]);
        bIndex = customSortArray.indexOf(b[i]);

        if (aIndex === bIndex) continue;

        if (aIndex < bIndex) {
            return 1;
        }
        return -1;
    }
}

let result = 0;
let currRank = 1;
let length = null;
console.log("hands:", hands);
for (const category of weakestToStrongest) {
    console.log("🚀 ~ file: 7.mjs:86 ~ result :", result);
    if (classifiedCards[category] && classifiedCards[category].length > 0) {
        length = classifiedCards[category].length;
        if (length === 1) {
            result +=
                currRank *
                numbers[hands.indexOf(classifiedCards[category].join(""))];
            ++currRank;
        } else {
            //check the rank.
            classifiedCards[category].sort(customSort).forEach((card) => {
                console.log("currRank:", currRank, card);
                result += currRank * numbers[hands.indexOf(card)];
                ++currRank;
            });
        }
    }
}

console.log("result:", result);

console.log(
    "this",
    ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"].sort(
        customSort
    )
);
