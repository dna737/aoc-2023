import fs from "fs";

const contents = fs
    .readFileSync("./input", {
        encoding: "utf8",
        flag: "r",
    })
    .split("\n");

const instructions = contents[0].split("");
let parents = [];
let children = [];
let currChildren = null;
//storing the parents and children:
for (const line of contents) {
    if (line.includes("=")) {
        parents.push(line.split("=")[0].trim());
        parents.push("");
        currChildren = line.split("=")[1].trim();
        children.push(
            currChildren.slice(
                currChildren.indexOf("(") + 1,
                currChildren.indexOf(",")
            )
        );
        children.push(
            currChildren.slice(
                currChildren.indexOf(" ") + 1,
                currChildren.indexOf(")")
            )
        );
    } else {
        continue;
    }
}

let moves = 0;
let flag = false;
let currParent = "AAA";
while (!flag) {
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i] === "L") {
            currParent = children[parents.indexOf(currParent)];
        } else {
            currParent = children[parents.indexOf(currParent) + 1];
        }
        ++moves;
        if (currParent === "ZZZ") {
            console.log("done:", moves);
            flag = true;
            break;
        }
    }
}
console.log(children);
