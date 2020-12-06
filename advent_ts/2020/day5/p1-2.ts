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

type Pass = {
	row: number;
	column: number;
	id: number;
};
const passes: Array<Pass> = [];
for (let i = 0; i < len; i++) {
	const sRow = inputArray[i].substring(0, 7);
	const sColumn = inputArray[i].substring(7);
	const row = parseInt(sRow.replace(/F/g, '0').replace(/B/g, '1'), 2);
	const column = parseInt(sColumn.replace(/L/g, '0').replace(/R/g, '1'), 2);
	const id = row * 8 + column;
	passes.push({ row, column, id });
}

passes.sort((a, b) => {
	return b.id - a.id;
});

console.log('Part 1: ');
console.log(passes[0].id);

let mySeatId = -1;
let i = 0;
while (i < len - 2 && mySeatId === -1) {
	const checkPass = passes[i].id;
	const prePass = passes[i + 1].id;
	if (checkPass - 1 !== prePass) {
		mySeatId = checkPass - 1;
	}
	i++;
}

console.log('Part 2: ');
console.log(mySeatId);
