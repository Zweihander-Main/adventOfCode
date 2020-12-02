import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputArray = fs
	.readFileSync(path.resolve(__dirname, 'input.txt'))
	.toString()
	.split('\n');

const input = inputArray[0];

let floor = 0;
let basementChar;
for (let i = 0, len = input.length; i < len; i++) {
	if (input[i] === '(') {
		floor++;
	} else {
		floor--;
	}
	if (!basementChar && floor === -1) {
		basementChar = i + 1;
	}
}

console.log('Final floor: ');
console.log(floor);
console.log('First basement char: ');
console.log(basementChar);
