import fs from 'fs';

const inputArray = fs
	.readFileSync('./2020/day2/input.txt')
	.toString()
	.split('\n');

let len = inputArray.length - 1; //newline at end

let validPasswordsPolicy1 = 0;
let validPasswordsPolicy2 = 0;
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
		validPasswordsPolicy1++;
	}
	// Unary conversion to bits, then bitwise XOR
	if (
		+(password.charAt(min - 1) === letter) ^
		+(password.charAt(min - 1) === letter)
	) {
		validPasswordsPolicy2++;
	}
}

console.log('Policy 1: ');
console.log(validPasswordsPolicy1);
console.log('Policy 2: ');
console.log(validPasswordsPolicy2);
