import fs from 'fs';

const LOOKING_FOR = 2020;
const inputArray = fs
	.readFileSync('./2020/day1/input.txt')
	.toString()
	.split('\n');

for (let init = 0, len = inputArray.length; init < len - 1; init++) {
	const initVal = parseInt(inputArray[init], 10);
	for (let search = init + 1; search < len; search++) {
		const searchVal = parseInt(inputArray[search], 10);
		if (initVal + searchVal === LOOKING_FOR) {
			console.log('Part 1: ');
			console.log({ initVal, searchVal });
			console.log('Multiplied: ', initVal * searchVal);
			break;
		}
	}
}

console.log('=============================');

for (let init = 0, len = inputArray.length; init < len - 2; init++) {
	const initVal = parseInt(inputArray[init], 10);
	for (let search = init + 1; search < len - 1; search++) {
		const searchVal = parseInt(inputArray[search], 10);
		for (let final = search + 1; final < len; final++) {
			const finalVal = parseInt(inputArray[final], 10);
			if (initVal + searchVal + finalVal === LOOKING_FOR) {
				console.log('Part 2: ');
				console.log({ initVal, searchVal, finalVal });
				console.log('Multiplied: ', initVal * searchVal * finalVal);
				break;
			}
		}
	}
}
