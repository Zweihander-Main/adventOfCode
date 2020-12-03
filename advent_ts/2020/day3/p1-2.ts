import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputArray = fs
	.readFileSync(path.resolve(__dirname, 'input.txt'))
	.toString()
	.split('\n');

const len = inputArray.length - 1; //newline at end
const width = inputArray[0].length;

const descendSlope = (x: number, y: number) => {
	let currentX = 0;
	let currentY = 0;
	let treesEncountered = 0;
	while (currentY < len - y) {
		currentX += x;
		if (currentX >= width) {
			currentX = currentX - width;
		}
		currentY += y;
		if (inputArray[currentY][currentX] === '#') {
			treesEncountered++;
		}
	}
	return treesEncountered;
};

const a = descendSlope(1, 1);
const b = descendSlope(3, 1);
const c = descendSlope(5, 1);
const d = descendSlope(7, 1);
const e = descendSlope(1, 2);
console.log('Part 1: ');
console.log(b);
console.log('Part 2: ');
console.log(a * b * c * d * e);
