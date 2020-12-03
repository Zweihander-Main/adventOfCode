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

const stringContains = (orig: string, ...strings: Array<string>) => {
	for (let i = 0, len = strings.length; i < len; i++) {
		if (orig.indexOf(strings[i]) !== -1) {
			return true;
		}
	}
	return false;
};

const stringHasRepeatLetters = (s: string, spaceBetween = 0) => {
	let sLen = s.length;
	let i = 1 + spaceBetween;
	while (i < sLen) {
		if (s.charAt(i) === s.charAt(i - (1 + spaceBetween))) {
			return true;
		}
		i++;
	}
	return false;
};

const isNiceStringPart1 = (s: string): boolean => {
	// 3 vowels
	const re = /[aeiou]/g;
	if ((s.match(re) || []).length < 3) {
		return false;
	}
	// Appears twice in a row
	if (!stringHasRepeatLetters(s)) {
		return false;
	}
	// Does not contain
	if (stringContains(s, 'ab', 'cd', 'pq', 'xy')) {
		return false;
	}
	// is nice
	return true;
};

const stringHasTwoLettersWithoutOverlapping = (s: string): boolean => {
	let sLen = s.length - 1;
	let i = 1;
	while (i < sLen) {
		const check = s.charAt(i - 1) + s.charAt(i);
		const nextIndex = s.indexOf(check, i + 1);
		if (nextIndex !== -1) {
			return true;
		}
		i++;
	}
	return false;
};

const isNiceStringPart2 = (s: string): boolean => {
	// no overlapping
	if (!stringHasTwoLettersWithoutOverlapping(s)) {
		return false;
	}
	// one letter one between
	if (!stringHasRepeatLetters(s, 1)) {
		return false;
	}
	// is nice
	return true;
};

let niceStringsPart1 = 0;
let niceStringsPart2 = 0;
for (let i = 0; i < len; i++) {
	if (isNiceStringPart1(inputArray[i])) {
		niceStringsPart1++;
	}
	if (isNiceStringPart2(inputArray[i])) {
		niceStringsPart2++;
	}
}

console.log({ niceStringsPart1, niceStringsPart2 });
console.log(
	isNiceStringPart2('qjhvhtzxzqqjkmpb'),
	isNiceStringPart2('xxyxx'),
	isNiceStringPart2('uurcxstgmygtbstg'),
	isNiceStringPart2('ieodomkazucvgmuy')
);
