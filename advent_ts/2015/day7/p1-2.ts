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

const allWires: { [key: string]: Wire } = {};
class Wire {
	private signal: number | null;
	name: string;

	constructor(name: string, value: number | null = null) {
		this.name = name;
		this.signal = value;
		allWires[name] = this;
	}

	getSignal() {
		return this.signal;
	}

	get hasSignal() {
		return this.signal !== null;
	}

	setSignal(n: number) {
		this.signal = n;
	}

	reset() {
		this.signal = null;
	}
}

const isNum = (n: unknown): n is number => {
	return typeof n === 'number';
};

const operations: Array<Operation> = [];
class Operation {
	output: Wire;
	inputs: Array<Wire>;
	hasBeenExecuted: boolean;

	constructor(oWire: string, ...wires: Array<string>) {
		operations.push(this);
		this.hasBeenExecuted = false;
		[oWire, ...wires].forEach((wire) => {
			if (!allWires[wire]) {
				new Wire(wire);
			}
		});
		this.output = allWires[oWire];
		this.inputs = wires.map((s: string) => allWires[s]);
	}

	get canBeExecuted() {
		if (this.hasBeenExecuted) {
			return false;
		}
		const inputs = this.inputs;
		for (let i = 0, len = inputs.length; i < len; i++) {
			const wire = inputs[i];
			if (!wire.hasSignal) {
				return false;
			}
		}
		return true;
	}

	execute() {
		this.hasBeenExecuted = true;
	}

	reset() {
		this.hasBeenExecuted = false;
		[this.output, ...this.inputs].forEach((wire) => {
			wire.reset();
		});
	}
}

class NotOp extends Operation {
	constructor(wire: string, oWire: string) {
		super(oWire, wire);
	}
	execute() {
		const input = this.inputs[0].getSignal();
		if (isNum(input)) {
			this.output.setSignal(~input);
			this.hasBeenExecuted = true;
		}
	}
}
class RShiftOp extends Operation {
	value: number;
	constructor(wire: string, oWire: string, val: number) {
		super(oWire, wire);
		this.value = val;
	}
	execute() {
		const input = this.inputs[0].getSignal();
		if (isNum(input)) {
			this.output.setSignal(input >> this.value);
			this.hasBeenExecuted = true;
		}
	}
}
class LShiftOp extends Operation {
	value: number;
	constructor(wire: string, oWire: string, val: number) {
		super(oWire, wire);
		this.value = val;
	}
	execute() {
		const input = this.inputs[0].getSignal();
		if (isNum(input)) {
			this.output.setSignal(input << this.value);
			this.hasBeenExecuted = true;
		}
	}
}
class OrOp extends Operation {
	constructor(aWire: string, bWire: string, oWire: string) {
		super(oWire, aWire, bWire);
	}
	execute() {
		const inputA = this.inputs[0].getSignal();
		const inputB = this.inputs[1].getSignal();
		if (isNum(inputA) && isNum(inputB)) {
			this.output.setSignal(inputA | inputB);
			this.hasBeenExecuted = true;
		}
	}
}
class AndOp extends Operation {
	value: number | null;
	constructor(aWire: string | number, bWire: string, oWire: string) {
		if (typeof aWire === 'number') {
			super(oWire, bWire);
			this.value = aWire;
		} else {
			super(oWire, aWire, bWire);
			this.value = null;
		}
	}
	execute() {
		const inputA = this.inputs[0].getSignal();
		const inputB =
			typeof this.value !== 'number'
				? this.inputs[1].getSignal()
				: this.value;
		if (isNum(inputA) && isNum(inputB)) {
			this.output.setSignal(inputA & inputB);
			this.hasBeenExecuted = true;
		}
	}
}
class SendOp extends Operation {
	constructor(wire: string, oWire: string) {
		super(oWire, wire);
	}

	execute() {
		const input = this.inputs[0].getSignal();
		if (isNum(input)) {
			this.output.setSignal(input);
			this.hasBeenExecuted = true;
		}
	}
}
class InputOp extends Operation {
	value: number;
	constructor(oWire: string, val: number) {
		super(oWire);
		this.value = val;
	}

	execute() {
		if (!this.output.hasSignal) {
			this.output.setSignal(this.value);
		}
		this.hasBeenExecuted = true;
	}
}

for (let i = 0; i < len; i++) {
	const [input, output] = inputArray[i].split(' -> ');
	const inputSplit = input.split(' ');
	const gate = inputSplit.find(
		(ins) => isNaN(parseInt(ins, 10)) && ins === ins.toUpperCase()
	);
	switch (gate) {
		case 'NOT':
			new NotOp(inputSplit[1], output);
			break;
		case 'RSHIFT':
			new RShiftOp(inputSplit[0], output, parseInt(inputSplit[2], 10));
			break;
		case 'LSHIFT':
			new LShiftOp(inputSplit[0], output, parseInt(inputSplit[2], 10));
			break;
		case 'OR':
			new OrOp(inputSplit[0], inputSplit[2], output);
			break;
		case 'AND':
			const possNum = parseInt(inputSplit[0], 10);
			if (isNaN(possNum)) {
				new AndOp(inputSplit[0], inputSplit[2], output);
			} else {
				new AndOp(possNum, inputSplit[2], output);
			}
			break;
		default:
			const signal = parseInt(inputSplit[0], 10);
			if (isNaN(signal)) {
				new SendOp(inputSplit[0], output);
			} else {
				new InputOp(output, signal);
			}
			break;
	}
}

const runCircuit = (): number => {
	let opsExecuted = 0;
	let i = 0;
	while (opsExecuted < operations.length) {
		if (operations[i].canBeExecuted) {
			operations[i].execute();
			opsExecuted++;
		}

		i++;
		if (i === operations.length) {
			i = 0;
		}
	}
	return allWires['a'].getSignal() || 0;
};

const p1Value = runCircuit();

const reset = () => {
	for (let i = 0, len = operations.length; i < len; i++) {
		operations[i].reset();
	}
};

reset();
allWires['b'].setSignal(p1Value);

const p2Value = runCircuit();

console.log('Part 1: ');
console.log(p1Value);
console.log('Part 2: ');
console.log(p2Value);
