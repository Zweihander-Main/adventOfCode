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

const bags: { [key: string]: Bag } = {};

class Bag {
	name: string;
	mustContain: Array<[number, Bag]>;
	isContainedBy: Array<Bag>;

	constructor(name: string) {
		this.name = name;
		this.mustContain = [];
		this.isContainedBy = [];
		bags[name] = this;
	}

	setMustContain(quantity: number, name: string) {
		let bag = bags[name];
		if (!bag) {
			bag = new Bag(name);
		}
		this.mustContain.push([quantity, bag]);
		bag.setIsContainedBy(this);
	}

	setIsContainedBy(bag: Bag) {
		this.isContainedBy.push(bag);
	}
}

const parseRule = (s: string): void => {
	const [ruleBag, rules] = s
		.replace(/bags ?/g, '')
		.replace(/bag ?/g, '')
		.split(' contain ');
	if (!bags[ruleBag]) {
		new Bag(ruleBag);
	}
	const rulesArr = rules.replace(/\./g, '').split(', ');
	for (let i = 0, len = rulesArr.length; i < len; i++) {
		const rule = rulesArr[i].trim();
		if (rule !== 'no other') {
			const quantity = parseInt(rule.substr(0, 1), 10);
			const bag = rule.substring(1).trim();
			bags[ruleBag].setMustContain(quantity, bag);
		}
	}
};

for (let i = 0; i < len; i++) {
	parseRule(inputArray[i]);
}

const shinyGoldContainedBy = new Set<Bag>();
const recurseBagsContainedBy = (bag: Bag) => {
	const isContainedBy = bag.isContainedBy;
	let i = 0;
	while (i < isContainedBy.length) {
		const toRecurse = isContainedBy[i];
		shinyGoldContainedBy.add(toRecurse);
		recurseBagsContainedBy(toRecurse);
		i++;
	}
};

recurseBagsContainedBy(bags['shiny gold']);

let totalContain = 0;
const recurseBagsTotal = (bag: Bag, containedNum = 1) => {
	const contains = bag.mustContain;
	let i = 0;
	while (i < contains.length) {
		const toRecurse = contains[i];
		const [quantity, bag] = toRecurse;
		const numContained = quantity * containedNum;
		totalContain += numContained;
		recurseBagsTotal(bag, numContained);
		i++;
	}
};

recurseBagsTotal(bags['shiny gold']);

console.log('Part 1: ');
console.log(shinyGoldContainedBy.size);
console.log('Part 2: ');
console.log(totalContain);
