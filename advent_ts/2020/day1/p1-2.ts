import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputArray = fs
	.readFileSync(path.resolve(__dirname, 'input.txt'))
	.toString()
	.split('\n');

const LOOKING_FOR = 2020;

const searchArray = inputArray;
const searchLength = inputArray.length - 1; // Newline at the end

const recursiveSearch = (
	numProducts: number,
	starting = 0,
	valueArray: Array<number> = []
): boolean => {
	for (let i = starting; i < searchLength - (numProducts - 1); i++) {
		const newValArray = valueArray.concat([parseInt(searchArray[i], 10)]);
		if (numProducts === 1) {
			const product = newValArray.reduce((prev, curr) => prev + curr, 0);
			if (product === LOOKING_FOR) {
				console.log(newValArray.reduce((prev, curr) => prev * curr, 1));
				return true;
			}
		} else if (
			recursiveSearch(numProducts - 1, starting + 1, newValArray)
		) {
			return true;
		}
	}
	return false;
};

console.log('Part 1: ');
recursiveSearch(2);
console.log('Part 2: ');
recursiveSearch(3);
