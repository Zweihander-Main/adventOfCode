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

const howManyUniq = (s: string): number => {
	const sArr = s.replace(/ /g, '').split('');
	const uniqSArr = [...new Set(sArr)];
	return uniqSArr.join('').length;
};

type LetterObject = {
	[key: string]: number;
};

const howManyAllYes = (s: string): number => {
	const personsArray = s.split(' ');
	const lettersObject = personsArray.reduce(
		(allLetters, currLetters): LetterObject => {
			const lettersArr = currLetters.split('');
			lettersArr.forEach((letter) => {
				allLetters[letter] = allLetters[letter]
					? allLetters[letter] + 1
					: 1;
			});
			return allLetters;
		},
		{} as LetterObject
	);
	const allYes = Object.values(lettersObject).filter(
		(val) => val === personsArray.length - 1
	);
	return allYes.length;
};

let sumUniq = 0;
let sumAll = 0;
let currentGroup = '';
for (let i = 0; i < len; i++) {
	const currLine = inputArray[i];
	if (currLine !== '') {
		currentGroup += `${currLine} `;
	} else {
		sumUniq += howManyUniq(currentGroup);
		sumAll += howManyAllYes(currentGroup);
		currentGroup = '';
	}
}
sumUniq += howManyUniq(currentGroup);
sumAll += howManyAllYes(currentGroup);

console.log('Part 1: ');
console.log(sumUniq);
console.log('Part 2: ');
console.log(sumAll);
