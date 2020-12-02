import fs from 'fs';

const inputArray = fs
	.readFileSync('./2020/day2/input.txt')
	.toString()
	.split('\n');

let len = inputArray.length - 1; //newline at end

let validPasswordsPart1 = 0;
let validPasswordsPart2 = 0;
for (let i = 0; i < len; i++) {
	const [policy, letterText, password] = inputArray[i].split(' ');
	const [min, max] = policy.split('-').map((val) => parseInt(val, 10));
	const letter = letterText.charAt(0);
	let numOccurrences = 0;
	for (let c = 0, stringLength = password.length; c < stringLength; c++) {
		if (password[c] === letter) {
			numOccurrences++;
		}
	}
	if (numOccurrences >= min && numOccurrences <= max) {
		validPasswordsPart1++;
	}
	if (
		+(password.charAt(min - 1) === letter) ^
		+(password.charAt(min - 1) === letter)
	) {
		validPasswordsPart2++;
	}
}
console.log('Part 1: ');
console.log(validPasswordsPart1);
console.log('Part 2: ');
console.log(validPasswordsPart2);
