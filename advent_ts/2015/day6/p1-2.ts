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

type Coord = {
	x: number;
	y: number;
};

const coordStringToCoords = (s: string): Coord => {
	const [x, y] = s.split(',').map((val) => parseInt(val, 10));
	return { x, y };
};

const decipherInstruction = (s: string): [string, Coord, Coord] => {
	const sArr = s.split(' ');
	if (sArr[1].startsWith('o')) {
		return [
			sArr[1],
			coordStringToCoords(sArr[2]),
			coordStringToCoords(sArr[4]),
		];
	} else {
		return [
			sArr[0],
			coordStringToCoords(sArr[1]),
			coordStringToCoords(sArr[3]),
		];
	}
};

const gridLights: Array<Array<number>> = [];
const gridBrightness: Array<Array<number>> = [];
for (let i = 0; i < 1000; i++) {
	gridLights[i] = [];
	gridBrightness[i] = [];
	for (let j = 0; j < 1000; j++) {
		gridLights[i][j] = 0;
		gridBrightness[i][j] = 0;
	}
}

const markCells = (from: Coord, to: Coord, instruction: string) => {
	const { x: x1, y: y1 } = from;
	const { x: x2, y: y2 } = to;
	for (let i = y1; i <= y2; i++) {
		for (let j = x1; j <= x2; j++) {
			switch (instruction) {
				case 'on':
					gridLights[i][j] = 1;
					gridBrightness[i][j] += 1;
					break;
				case 'off':
					gridLights[i][j] = 0;
					gridBrightness[i][j] =
						gridBrightness[i][j] > 0 ? gridBrightness[i][j] - 1 : 0;
					break;
				case 'toggle':
					gridLights[i][j] = gridLights[i][j] === 0 ? 1 : 0;
					gridBrightness[i][j] += 2;
					break;
			}
		}
	}
};

for (let i = 0; i < len; i++) {
	const [instruction, coord1, coord2] = decipherInstruction(inputArray[i]);
	markCells(coord1, coord2, instruction);
}

let totalLightsP1 = 0;
let totalBrightness = 0;
for (let i = 0, len = gridLights.length; i < len; i++) {
	for (let j = 0, len2 = gridLights[i].length; j < len2; j++) {
		if (gridLights[i][j] > 0) {
			totalLightsP1++;
		}
		totalBrightness += gridBrightness[i][j];
	}
}

console.log('Part 1: ');
console.log(totalLightsP1);
console.log('Part 2: ');
console.log(totalBrightness);
