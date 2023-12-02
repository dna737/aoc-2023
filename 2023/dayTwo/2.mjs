import { open } from "node:fs/promises";

const file = await open("./input.txt");
for await (const line of file.readLines()) {
    //call the primary function here.
}
