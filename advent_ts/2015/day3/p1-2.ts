import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputArray = fs
	.readFileSync(path.resolve(__dirname, 'input.txt'))
	.toString()
	.split('\n');

const input = inputArray[0]; // newline

type HouseMap = { [key: string]: boolean };
type LocCoord = [number, number];

const singleHousesHit: HouseMap = { '0,0': true };
const doubleHousesHit: HouseMap = { '0,0': true };
const singleSantaLastLoc: LocCoord = [0, 0];
const doubleSantaLastLoc: LocCoord = [0, 0];
const doubleRoboLastLoc: LocCoord = [0, 0];
let turn: boolean = true;

const modifyCoord = (inputDir: string, x: number, y: number) => {
	switch (inputDir) {
		case '^':
			y++;
			break;

		case '>':
			x++;
			break;

		case 'v':
			y--;
			break;

		case '<':
			x--;
			break;
	}
	return [x, y];
};

const setNewDelivery = (housesHit: HouseMap, x: number, y: number) => {
	housesHit[`${x},${y}`] = true;
};

const setLastLoc = (lastLoc: LocCoord, x: number, y: number) => {
	lastLoc[0] = x;
	lastLoc[1] = y;
};

for (let i = 0, len = input.length; i < len; i++) {
	const inputDir = input[i];
	let [sx, sy] = modifyCoord(inputDir, ...singleSantaLastLoc);
	const doubleLastLoc = turn ? doubleSantaLastLoc : doubleRoboLastLoc;
	let [dx, dy] = modifyCoord(inputDir, ...doubleLastLoc);
	setNewDelivery(singleHousesHit, sx, sy);
	setNewDelivery(doubleHousesHit, dx, dy);
	setLastLoc(singleSantaLastLoc, sx, sy);
	setLastLoc(doubleLastLoc, dx, dy);
	turn = turn ? false : true;
}

console.log('Single delivery: ');
console.log(Object.keys(singleHousesHit).length);
console.log('Double delivery: ');
console.log(Object.keys(doubleHousesHit).length);
