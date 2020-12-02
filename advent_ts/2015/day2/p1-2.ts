import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputArray = fs
	.readFileSync(path.resolve(__dirname, 'input.txt'))
	.toString()
	.split('\n');

const len = inputArray.length - 1; // newline

let totalSqFt = 0;
let ribbon = 0;
for (let i = 0; i < len; i++) {
	const dimensions = inputArray[i].split('x').map((val) => parseInt(val, 10));
	const [l, w, h] = dimensions;
	totalSqFt += 2 * l * w + 2 * w * h + 2 * h * l;
	dimensions.sort((a, b) => a - b);
	totalSqFt += dimensions[0] * dimensions[1];
	ribbon += dimensions[0] + dimensions[0] + dimensions[1] + dimensions[1];
	ribbon += l * w * h;
}

console.log('Wrapping paper: ');
console.log(totalSqFt);
console.log('Ribbon: ');
console.log(ribbon);
